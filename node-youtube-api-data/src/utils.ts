import { OAuth2Client } from 'google-auth-library';
import { google } from 'googleapis';

type ChannelInfo = {
  id: string;
  subscriberCount: number;
  viewCount: number;
  videoCount: number;
  playlistId: string | null;
};

type VideoFromPlaylistInfo = {
  id: string;
  videoId: string;
};

type VideoResult = {
  items: VideoFromPlaylistInfo[];
  nextPageToken: string | null | undefined;
};

type Video = {
  id: string;
  title: string;
  description: string;
  publishedAt: string;
  duration: string;
  thumbnail: {
    url: string;
    width: number;
    height: number;
  } | null;
  kind: string;
  privacyStatus: string;
  statsViewable: boolean;
  viewCount: number;
  likeCount: number;
  commentCount: number;
};

const chunk = (videos: string[], count: number): string[][] => {
  const chunks: string[][] = [];
  let i = 0;
  const n = videos.length;

  while (i < n) {
    chunks.push(videos.slice(i, (i += count)));
  }

  return chunks;
};

export const retrieveChannelInfo = (oauth2Client: OAuth2Client, channelId: string): Promise<ChannelInfo> => {
  const service = google.youtube('v3');

  return new Promise((resolve, reject) => {
    service.channels.list(
      {
        auth: oauth2Client,
        id: [channelId],
        part: ['contentDetails', 'statistics'],
      },
      (error, response) => {
        if (error) {
          return reject({ error, message: 'The API returned an error: ' });
        }

        if (!response) {
          return reject({ message: 'Response has no content!' });
        }

        const channels = response.data.items ?? [];

        if (channels.length === 0) {
          return reject({ message: 'No channel found.' });
        }

        const [channel] = channels;

        resolve({
          id: channel.id ?? '',
          playlistId: channel.contentDetails?.relatedPlaylists?.uploads ?? null,
          subscriberCount: +(channel.statistics?.subscriberCount ?? 0),
          videoCount: +(channel.statistics?.videoCount ?? 0),
          viewCount: +(channel.statistics?.viewCount ?? 0),
        });
      },
    );
  });
};

const retrievePlaylistVideos = (oauth2Client: OAuth2Client, playlistId: string, nextPageToken: string | null | undefined): Promise<VideoResult> => {
  const service = google.youtube('v3');

  return new Promise((resolve, reject) => {
    service.playlistItems.list(
      {
        auth: oauth2Client,
        maxResults: 50,
        pageToken: nextPageToken ?? undefined,
        part: ['contentDetails'],
        playlistId,
        fields: 'items(id,contentDetails(videoId))',
      },
      (error, response) => {
        if (error) {
          return reject({ error, message: 'The API returned an error: ' });
        }

        if (!response) {
          return reject({ message: 'Response has no content!' });
        }

        const videos = response.data.items ?? [];

        if (videos.length === 0) {
          return reject({ message: 'No video from the playlist found.' });
        }

        console.log('videos', videos);

        const formattedVideos = videos.map((video): VideoFromPlaylistInfo => {
          return {
            id: video.id ?? '',
            videoId: video.contentDetails?.videoId ?? '',
          };
        });

        resolve({
          items: formattedVideos,
          nextPageToken: response.data.nextPageToken,
        });
      },
    );
  });
};

export const recursivelyRetrievePlaylistVideos = async (
  oauth2Client: OAuth2Client,
  playlistId: string,
  nextPageToken: string | null | undefined,
): Promise<VideoFromPlaylistInfo[]> => {
  const videosList: VideoFromPlaylistInfo[] = [];
  let token: string | undefined | null = nextPageToken;

  do {
    const result = await retrievePlaylistVideos(oauth2Client, playlistId, token);

    videosList.push(...result.items);

    token = result.nextPageToken ?? null;
  } while (token !== null);

  return videosList;
};

const retrieveVideosWithMetadata = (oauth2Client: OAuth2Client, videoIds: string[]): Promise<Video[]> => {
  const service = google.youtube('v3');

  return new Promise((resolve, reject) => {
    service.videos.list(
      {
        auth: oauth2Client,
        id: videoIds,
        part: ['snippet', 'contentDetails', 'status', 'statistics'],
      },
      (error, response) => {
        if (error) {
          return reject({ error, message: 'The API returned an error: ' });
        }

        if (!response) {
          return reject({ message: 'Response has no content!' });
        }

        const videos = response.data.items ?? [];

        if (videos.length === 0) {
          return reject({ message: 'No video found.' });
        }

        const formattedVideos = videos.map((video): Video => {
          const thumbnail = video.snippet?.thumbnails?.high;

          return {
            commentCount: +(video.statistics?.commentCount ?? 0),
            description: video.snippet?.description ?? '',
            duration: video.contentDetails?.duration ?? '',
            id: video.id ?? '',
            kind: video.kind ?? '',
            likeCount: +(video.statistics?.likeCount ?? 0),
            privacyStatus: video.status?.privacyStatus ?? '',
            publishedAt: video.snippet?.publishedAt ?? '',
            statsViewable: video.status?.publicStatsViewable ?? false,
            thumbnail: {
              url: thumbnail?.url ?? '',
              width: thumbnail?.width ?? 0,
              height: thumbnail?.height ?? 0,
            },
            title: video.snippet?.title ?? '',
            viewCount: +(video.statistics?.viewCount ?? ''),
          };
        });

        resolve(formattedVideos);
      },
    );
  });
};

export const retrieveAllVideosWithMetadata = async (oauth2Client: OAuth2Client, videoIds: string[]): Promise<Video[]> => {
  const videosList: Video[] = [];

  const videoIdChunks = chunk(videoIds, 50);

  for (const videoIds of videoIdChunks) {
    const result = await retrieveVideosWithMetadata(oauth2Client, videoIds);

    videosList.push(...result);
  }

  return videosList;
};

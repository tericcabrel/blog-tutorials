import { google } from 'googleapis';
import { Credentials, OAuth2Client } from 'google-auth-library';
import { configDotenv } from 'dotenv';

configDotenv();

type ChannelInfo = {
  id: string;
  subscriberCount: number;
  viewCount: number;
  videoCount: number;
  playlistId: string | null;
};

const { CLIENT_EXPIRATION_DATE, CLIENT_REFRESH_TOKEN, CLIENT_TOKEN, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URI } = process.env;

const { OAuth2 } = google.auth;
const SCOPE = 'https://www.googleapis.com/auth/youtube.readonly';
const YOUTUBE_CHANNEL_ID = 'UC2KfmYEM4KCuA1ZurravgYw';

const oauth2Client = new OAuth2(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URI);

if (!CLIENT_EXPIRATION_DATE) {
  throw new Error('The token expiration date is required');
}

const credentials: Credentials = {
  access_token: CLIENT_TOKEN,
  expiry_date: +CLIENT_EXPIRATION_DATE, // The plus sign in front cast the string type to a number
  refresh_token: CLIENT_REFRESH_TOKEN,
  scope: SCOPE,
  token_type: 'Bearer',
};

oauth2Client.credentials = credentials;

const service = google.youtube('v3');

const retrieveChannelInfo = (oauth2Client: OAuth2Client, channelName: string): Promise<ChannelInfo> => {
  return new Promise((resolve, reject) => {
    service.channels.list(
      {
        auth: oauth2Client,
        id: [channelName],
        part: ['snippet', 'contentDetails', 'statistics'],
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

(async () => {
  try {
    console.log(`Retrieve information about the channel ${YOUTUBE_CHANNEL_ID}`);

    const channel = await retrieveChannelInfo(oauth2Client, YOUTUBE_CHANNEL_ID);

    console.log('channel information has been successfully retrieved!');

    console.log(channel);
  } catch (error) {
    console.error(error);
  }
})();

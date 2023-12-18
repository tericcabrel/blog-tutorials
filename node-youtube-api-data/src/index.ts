import fs from 'fs';
import { configDotenv } from 'dotenv';
import { google } from 'googleapis';
import { Credentials } from 'google-auth-library';
import { recursivelyRetrievePlaylistVideos, retrieveAllVideosWithMetadata, retrieveChannelInfo } from './utils';

configDotenv();

const { CLIENT_EXPIRATION_DATE, CLIENT_REFRESH_TOKEN, CLIENT_TOKEN, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, YOUTUBE_CHANNEL_ID } = process.env;

const { OAuth2 } = google.auth;
const SCOPE = 'https://www.googleapis.com/auth/youtube.readonly';

const oauth2Client = new OAuth2(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET);

if (!CLIENT_EXPIRATION_DATE) {
  throw new Error('The token expiration date is required');
}

if (!YOUTUBE_CHANNEL_ID) {
  throw new Error('The YouTube channel ID is required');
}

const credentials: Credentials = {
  access_token: CLIENT_TOKEN,
  expiry_date: +CLIENT_EXPIRATION_DATE, // The plus sign in front cast the string type to a number
  refresh_token: CLIENT_REFRESH_TOKEN,
  scope: SCOPE,
  token_type: 'Bearer',
};

oauth2Client.credentials = credentials;

const main = async () => {
  try {
    const channel = await retrieveChannelInfo(oauth2Client, YOUTUBE_CHANNEL_ID);

    console.log(channel);

    if (!channel.playlistId) {
      console.error('The channel has no playlist');
      process.exit(1);
    }

    console.log(`Retrieve videos in the playlist: ${channel.playlistId}`);

    const videos = await recursivelyRetrievePlaylistVideos(oauth2Client, channel.playlistId, undefined);

    console.log(`Successfully retrieved ${videos.length} videos!`);

    const videoIds = videos.map((video) => video.videoId);

    /*console.log('Retrieve videos with metadata...');

    const videosWithData = await retrieveAllVideosWithMetadata(oauth2Client, videoIds);

    console.log(`Successfully retrieved metadata of ${videosWithData.length} videos!`);

    const filePath = `./src/videos.json`;
    const content = JSON.stringify({ items: videosWithData }, null, 2);

    fs.writeFileSync(filePath, content, { encoding: 'utf-8' });

    console.log('Successfully exported the videos in the file');*/
  } catch (error) {
    console.error(error);
  }
};

void main();

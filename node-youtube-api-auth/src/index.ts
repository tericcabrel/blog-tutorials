import readline from 'readline';

import { configDotenv } from 'dotenv';
import { Credentials, OAuth2Client } from 'google-auth-library';
import { google } from 'googleapis';

configDotenv();

const { GOOGLE_CLIENT_ID } = process.env;
const { GOOGLE_CLIENT_SECRET } = process.env;
const { AUTH_REDIRECT_URI } = process.env;

const { OAuth2 } = google.auth;
const SCOPES = ['https://www.googleapis.com/auth/youtube.readonly'];

const oauth2Client = new OAuth2(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, AUTH_REDIRECT_URI);

const askAuthorizationCode = (): Promise<string> => {
  const console = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    console.question('Enter the code from that page here: ', (code) => {
      console.close();

      resolve(code);
    });
  });
};

const generateAccessToken = (oauth2Client: OAuth2Client, authorizationCode: string): Promise<Credentials> => {
  return new Promise((resolve, reject) => {
    oauth2Client.getToken(authorizationCode, (err, token) => {
      if (err) {
        return reject({ err, message: 'Error while trying to retrieve access token' });
      }

      if (!token) {
        return reject({ message: 'The token is not defined!' });
      }

      resolve(token);
    });
  });
};

const authorize = async () => {
  const authURL = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });

  console.log('Authorize this app by visiting this url: ', authURL);

  const authorizationCode = await askAuthorizationCode();

  const accessToken = await generateAccessToken(oauth2Client, authorizationCode);

  console.log('The authentication generated successfully!');
  console.log(accessToken);
};

void authorize();

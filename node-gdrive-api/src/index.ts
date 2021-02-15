import dotenv from 'dotenv';
import * as path from 'path';
import * as fs from 'fs';

import { GoogleDriveService } from './googleDriveService';

dotenv.config();

const driveClientId = process.env.GOOGLE_DRIVE_CLIENT_ID || '';
const driveClientSecret = process.env.GOOGLE_DRIVE_CLIENT_SECRET || '';
const driveRedirectUri = process.env.GOOGLE_DRIVE_REDIRECT_URI || '';
const driveRefreshToken = process.env.GOOGLE_DRIVE_REFRESH_TOKEN || '';

(async () => {
  const googleDriveService = new GoogleDriveService(driveClientId, driveClientSecret, driveRedirectUri, driveRefreshToken);

  const finalPath = path.resolve(__dirname, '../public/spacex-uj3hvdfQujI-unsplash.jpg');
  const folderName = 'Picture';

  if (!fs.existsSync(finalPath)) {
    throw new Error('File not found!');
  }

  let folder = await googleDriveService.searchFolder(folderName).catch((error) => {
    console.error(error);
    return null;
  });

  if (!folder) {
    folder = await googleDriveService.createFolder(folderName);
  }

  await googleDriveService.saveFile('SpaceX', finalPath, 'image/jpg', folder.id).catch((error) => {
    console.error(error);
  });

  console.info('File uploaded successfully!');
})();

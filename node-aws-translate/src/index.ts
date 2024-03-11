import * as path from 'path';
import * as fs from 'fs';
import { TranslateClient, TranslateTextCommand } from '@aws-sdk/client-translate';

const SOURCE_LANGUAGE = 'fr';

const TARGET_LANGUAGES = ['en', 'es', 'de'];

const FRENCH_FILE_PATH = path.resolve(__dirname, '../data/locale-fr.json');
const OUTPUT_FOLDER_PATH = path.resolve(__dirname, '../data');

const translateClient = new TranslateClient([
  {
    region: 'eu-west-3',
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  },
]);

(async () => {
  const fileContent = fs.readFileSync(FRENCH_FILE_PATH, { encoding: 'utf-8' });

  const data = JSON.parse(fileContent) as Record<string, string>;

  const keys = Object.keys(data);

  for (const language of TARGET_LANGUAGES) {
    console.log(`Translating texts from ${SOURCE_LANGUAGE.toUpperCase()} to ${language.toUpperCase()}`);
    const records = {};

    for (const key of keys) {
      const command = new TranslateTextCommand({
        SourceLanguageCode: SOURCE_LANGUAGE,
        Text: data[key],
        TargetLanguageCode: language,
        Settings: {
          Brevity: 'ON',
          Formality: 'FORMAL',
          Profanity: 'MASK',
        },
      });

      const result = await translateClient.send(command);

      records[key] = result.TranslatedText;
    }

    const fileContent = JSON.stringify(records, null, 2);

    console.log('Exporting the translated texts into a JSON file');

    fs.writeFileSync(`${OUTPUT_FOLDER_PATH}/locale-${language}.json`, fileContent, { encoding: 'utf-8' });
  }
})();

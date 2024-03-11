import { TranslateClient, TranslateTextCommand } from '@aws-sdk/client-translate';

const translateClient = new TranslateClient([
  {
    region: 'eu-west-3',
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  },
]);

const command = new TranslateTextCommand({
  SourceLanguageCode: 'en',
  Text: "I'm going to the hospital",
  TargetLanguageCode: 'fr',
});

(async () => {
  const result = await translateClient.send(command);

  console.log('Translation result: ', result.TranslatedText);
})();

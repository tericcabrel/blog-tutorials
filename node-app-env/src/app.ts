import { EnvironmentVariables, validateEnvironmentVariables } from '../env';

validateEnvironmentVariables();

type SupportedLanguages = EnvironmentVariables['COUNTRY'];

const country = process.env.COUNTRY;
const serverPort = process.env.PORT;

const messages: Record<SupportedLanguages, string> = {
    FR: 'Bonjour le monde!',
    EN: 'Hello world!',
    ES: 'Hola, mundo!',
    DE: 'Hallo Welt!',
}

console.log(`TypeScript application started on the port ${serverPort}`);

const result = messages[country];

console.log(result);

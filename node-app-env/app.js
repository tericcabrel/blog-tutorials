const country = process.env.COUNTRY;
const serverPort = process.env.PORT;

const messages = {
    FR: "Bonjour le monde!",
    EN: "Hello world!",
    ES: "Hola, mundo!",
    DE: "Hallo Welt!",
}

console.log(`Application started on the port ${serverPort}`);

const result = messages[country];

console.log(result);

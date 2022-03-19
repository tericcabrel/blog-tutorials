import * as path from 'path';
const csvWriter = require('csv-writer');

type Country = {
  name: string;
  countryCode: string;
  capital: string;
  phoneIndicator: number;
};

const countries: Country[] = [
  { name: 'Cameroon', capital: 'Yaounde', countryCode: 'CM', phoneIndicator: 237 },
  { name: 'France', capital: 'Paris', countryCode: 'FR', phoneIndicator: 33 },
  { name: 'United States', capital: 'Washington, D.C.', countryCode: 'US', phoneIndicator: 1 },
  { name: 'India', capital: 'New Delhi', countryCode: 'IN', phoneIndicator: 91 },
  { name: 'Brazil', capital: 'Brasília', countryCode: 'BR', phoneIndicator: 55 },
  { name: 'Japan', capital: 'Tokyo', countryCode: 'JP', phoneIndicator: 81 },
  { name: 'Australia', capital: 'Canberra', countryCode: 'AUS', phoneIndicator: 61 },
  { name: 'Nigeria', capital: 'Abuja', countryCode: 'NG', phoneIndicator: 234 },
  { name: 'Germany', capital: 'Berlin', countryCode: 'DE', phoneIndicator: 49 },
];

const writer = csvWriter.createObjectCsvWriter({
  path: path.resolve(__dirname, 'countries.csv'),
  header: [
    { id: 'name', title: 'Name' },
    { id: 'countryCode', title: 'Country Code' },
    { id: 'capital', title: 'Capital' },
    { id: 'phoneIndicator', title: 'International Direct Dialling' },
  ],
});

writer.writeRecords(countries).then(() => {
  console.log('Done!');
});

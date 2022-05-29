import Excel from 'exceljs';
import path from 'path';

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

const exportCountriesFile = async () => {
  const workbook = new Excel.Workbook();
  const worksheet = workbook.addWorksheet('Countries List');

  worksheet.columns = [
    { key: 'name', header: 'Name' },
    { key: 'countryCode', header: 'Country Code' },
    { key: 'capital', header: 'Capital' },
    { key: 'phoneIndicator', header: 'International Direct Dialling' },
  ];

  worksheet.columns.forEach((sheetColumn) => {
    sheetColumn.font = {
      size: 12,
    };
    sheetColumn.width = 30;
  });

  worksheet.getRow(1).font = {
    bold: true,
    size: 13,
  };

  countries.forEach((item) => {
    worksheet.addRow(item);
  });

  const exportPath = path.resolve(__dirname, 'countries.xlsx');

  await workbook.xlsx.writeFile(exportPath);
};

exportCountriesFile();

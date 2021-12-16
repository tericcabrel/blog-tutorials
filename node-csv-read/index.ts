import * as fs from "fs";
import * as path from "path";
import { parse } from 'csv-parse';

type WorldCity = {
  name: string;
  country: string;
  subCountry: string;
  geoNameId: number;
};

(() => {
  const csvFilePath = path.resolve(__dirname, 'files/world-cities_csv.csv');

  const headers = ['name', 'country', 'subCountry', 'geoNameId'];

  const fileContent = fs.readFileSync(csvFilePath, { encoding: 'utf-8' });
  // const finalContent = removeEmptyLines(originalContent, headers.length);

  parse(fileContent, {
    delimiter: ',',
    columns: headers,
    // skipLines: 1,
    // separator: ';',
    // strict: true,
    // mapValues: ({ header, value }) => transformValue(header, value),
  }, (error, result: WorldCity[]) => {
    if (error) {
      console.error(error);
    }

    console.log("Result", result);
  });
})();
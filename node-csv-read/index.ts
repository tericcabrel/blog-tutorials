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

  parse(fileContent, {
    delimiter: ',',
    columns: headers,
    fromLine: 2,
    cast: (columnValue, context) => {
      if (context.column === 'geoNameId') {
        return parseInt(columnValue, 10);
      }

      return columnValue;
    },
    on_record: (line, context) => {
      if (line.country !== 'France') {
        return;
      }

      return line;
    },
  }, (error, result: WorldCity[]) => {
    if (error) {
      console.error(error);
    }

    console.log("Result", result);
  });
})();
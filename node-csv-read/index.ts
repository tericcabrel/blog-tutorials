import * as fs from "fs";
import * as path from "path";
import neatCsv from 'neat-csv';

type WorldCity = {
  name: string;
  country: string;
  subCountry: string;
  geoNameId: number;
};

const readFile = async (filePath: string): Promise<WorldCity[]> => {
  const headers = ['name', 'country', 'subCountry', 'geoNameId'];

  const fileContent = fs.readFileSync(filePath, { encoding: 'utf-8' });
  // const finalContent = removeEmptyLines(originalContent, headers.length);

  return (await neatCsv(fileContent, {
    headers,
    skipLines: 1,
    separator: ';',
    strict: true,
    // mapValues: ({ header, value }) => transformValue(header, value),
  })) as WorldCity[];
};


(async () => {
  const csvFilePath = path.resolve(__dirname, 'files/world-cities_csv.csv');

  const result = await readFile(csvFilePath);

  console.log(result);
})();
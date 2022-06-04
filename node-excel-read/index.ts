import * as path from 'path';
import Excel from 'exceljs';

const filePath = path.resolve(__dirname, 'olympic-hockey-player.xlsx');

type Team = 'M' | 'W';
type Country = 'Canada' | 'USA';
type Position = 'Goalie' | 'Defence' | 'Forward';

type Player = {
  id: number;
  team: Team;
  country: Country;
  firstName: string;
  lastName: string;
  weight: number;
  height: number;
  dob: string; // (YYY-MM-DD)
  hometown: string;
  province: string;
  position: Position;
  age: number;
  heightFt: number;
  htln: number;
  bmi: number;
};

const getCellValue = (row:  Excel.Row, cellIndex: number) => {
  const cell = row.getCell(cellIndex);

  // console.log(cell.value);

  return cell.value ? cell.value.toString() : '';
};

const main = async () => {
  const workbook = new Excel.Workbook();
  const content = await workbook.xlsx.readFile(filePath);

  const worksheet = content.worksheets[1];
  const rowStartIndex = 4;
  const numberOfRows = worksheet.rowCount - 3;

  const rows = worksheet.getRows(rowStartIndex, numberOfRows) ?? [];

  const players = rows.map((row): Player => {
    return {
      // @ts-ignore
      id: getCellValue(row,1),
      // @ts-ignore
      team: getCellValue(row, 2),
      // @ts-ignore
      country: getCellValue(row, 3),
      firstName: getCellValue(row, 4),
      lastName: getCellValue(row, 5),
      // @ts-ignore
      weight: getCellValue(row, 6),
      height: +getCellValue(row, 7),
      dob: getCellValue(row, 8), // (YYY-MM-DD)
      hometown: getCellValue(row, 9),
      province: getCellValue(row, 10),
      // @ts-ignore
      position: getCellValue(row, 11),
      age: +getCellValue(row, 12),
      heightFt: +getCellValue(row, 13),
      htln: +getCellValue(row, 14),
      bmi: +getCellValue(row, 15),
    }
  });

  console.log(players);
};

main().then();
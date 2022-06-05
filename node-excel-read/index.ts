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
  dateOfBirth: string; // (YYY-MM-DD)
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

  console.log(cell.value);

  return cell.value ? cell.value.toString() : '';
};

const getCellFormulaValue = (row:  Excel.Row, cellIndex: number) => {
  const value = row.getCell(cellIndex).value as Excel.CellFormulaValue;

  return value.result ? value.result.toString() : '';
};

const transformTeam = (value: string): Team => {
  return value === 'Men' ? 'M' : 'W';
};

const transformHeight = (value: string): number => {
  return +value.replace("'", ".");
};

const transformDateOfBirth = (value: string) => {
  const date = new Date(value);

  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
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
      id: +getCellValue(row,1),
      team: transformTeam(getCellValue(row, 2)),
      country: getCellValue(row, 3) as Country,
      firstName: getCellValue(row, 4),
      lastName: getCellValue(row, 5),
      weight: +getCellValue(row, 6),
      height: transformHeight(getCellValue(row, 7)),
      dateOfBirth: transformDateOfBirth(getCellValue(row, 8)), // (YYY-MM-DD)
      hometown: getCellValue(row, 9),
      province: getCellValue(row, 10),
      position: getCellValue(row, 11) as Position,
      age: +getCellFormulaValue(row, 12),
      heightFt: +getCellFormulaValue(row, 13),
      htln: +getCellFormulaValue(row, 14),
      bmi: +getCellFormulaValue(row, 15),
    }
  });

  console.log(players);
};

main().then();
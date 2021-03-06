import Papa from 'papaparse';
import ShortUUID from 'short-uuid';

export default class FileData {
  constructor(files) {
    this.raw = files
    this.fileNames = files.workbooks;
    this.dataSets = [];
    this.sheets = files.sheets;
    this.isSingle = files.sheets.length === 1;
    this.parse();
  }

  parse() {
    this.sheets.forEach(sheet => {
      this.dataSets.push({
         id: ShortUUID.uuid(),
         name: sheet.name,
         data1: Papa.parse(sheet[this.fileNames[0]]),
         data2: Papa.parse(sheet[this.fileNames[1]])
      })
    })
  }
}

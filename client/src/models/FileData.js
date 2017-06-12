import Papa from 'papaparse';

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
         name: sheet.name,
         data1: Papa.parse(sheet[this.fileNames[0]]),
         data2: Papa.parse(sheet[this.fileNames[1]])
      })
    })
  }
}


// {
//   workbooks: [@wb1.original_filename, @wb2.original_filename],
//   sheets: [
//     {
//       name: ,
//       [@wb1.original_filename]: ...,
//       [@wb2.original_filename]: ...
//     }
//   ]
// }

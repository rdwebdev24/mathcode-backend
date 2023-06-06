const excelToJson = require('convert-excel-to-json');
 
const result = excelToJson({
    sourceFile: './test1.ods'
});

console.log(result);
console.log("loaded dummy");

async function runExcel2Yaml() {
  await Excel.run(async (context) => {
    let sheet = context.workbook.worksheets.getActiveWorksheet();
    //let sheet = context.workbook.worksheets.getItem(sheetname);
    let range = sheet.getRange(ConfigJsonCell).load();
    await context.sync();

    let dst = await getSheet(context, sheet, JSON.parse(range.values[0][0]));
    document.getElementById("textareaYaml").value = jsyaml.dump(dst);
  });
}

async function runYaml2Excel() {
  await Excel.run(async (context) => {
    let sheet = context.workbook.worksheets.getActiveWorksheet();

    let obj = jsyaml.load(document.getElementById("textareaYaml").value);
    const sheet = context.workbook.worksheets.getItem(SheetName);

    sheet.getRange(InputCell.A).values = obj.A;
    sheet.getRange(InputCell.B).values = obj.B;
    sheet.getRange(InputCell.C).values = obj.C;

    await context.sync();

    //const sheet = context.workbook.worksheets.getItem(SheetName);
    //let hoge = sheet.getRange(InputCell).load();
    //sheet.getRange("A3").values = [["=TotalAmount"]];
  });
}

async function getSheet(context, worksheet, obj) {
  const sheet = worksheet;
  let range = {};
  let dst = {};

  Object.keys(obj).forEach((key) => {
    range[key] = sheet.getRange(obj[key]).load();
  });

  await context.sync();

  Object.keys(obj).forEach((key) => {
    dst[key] = range[key].values[0][0];
  });

  return dst;
}


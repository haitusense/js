console.log("loaded dummy 0.01");

function loadScript(id) {
  // Add element
  let parent = document.getElementById(id);
  let element = document.createElement("button");
  element.innerText = "Dummy Button";
  element.className = "ms-Button";
  element.onclick = function () {
    element.innerText += " クリックされました!";
  };
  parent.appendChild(element);

  // load form CDN
  $.getScript("https://cdnjs.cloudflare.com/ajax/libs/mermaid/8.0.0/mermaid.min.js", () => {
    console.log("loaded mermaid");
    let config = {
      startOnLoad: true,
      theme: "forest",
      flowchart: {
        useMaxWidth: false,
        htmlLabels: true
      }
    };
    mermaid.initialize(config);
    mermaid.init(undefined, document.querySelectorAll(".language-mermaid"));
  });
  $.getScript("https://cdnjs.cloudflare.com/ajax/libs/js-yaml/4.0.0/js-yaml.min.js", () => {
    console.log("loaded js-yaml");
  });
}


async function runExcel2Yaml() {
  let table = await ExcelTable2Json();
  let map = await excel2MapText("B21:BW84");
  //let dst = jsyaml.dump(Object.assign(table, "Map : |\r\n" + map));
  let dst = jsyaml.dump(table) + "\r\nMap : |\r\n" + map;
  document.getElementById("textareaYaml").value = ;
}

async function ExcelTable2Json() {
  let dst = {}; 
  await Excel.run(async (context) => {
    let sheet = context.workbook.worksheets.getActiveWorksheet();
    //let sheet = context.workbook.worksheets.getItem(sheetname);
    let range = sheet.getRange(ConfigJsonCell).load();
    await context.sync();
    dst = await getSheet(context, sheet, JSON.parse(range.values[0][0]));
  });
  return dst;
}

async function excel2MapText(address) {
  let dst = "";
  await Excel.run(async (context) => {
    let sheet = context.workbook.worksheets.getActiveWorksheet();
    let range = sheet.getRange(address).load();

    await context.sync();

    let row = range.values.reduce((acc, cur) => acc.concat("\r\n  ", cur));
    dst = row.reduce((acc, cur) => acc + String(cur === "" ? " " : cur));
  });
  return dst;
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

/*
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


*/

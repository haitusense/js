console.log("loaded mapconv 0.01");

const mapcnv = ()=>{};
const loadScript = null;

(()=>{
  function test() {
    console.log("test");
  };
  
  mapcnv.test = test;

  
  async function runExcel2Yaml() {
    let table = await excelTable2Json();
    let map = await excel2MapText("B21:BW84");
    //let dst = jsyaml.dump(Object.assign(table, "Map : |\r\n" + map));
    let dst = `
${jsyaml.dump(table)}
Map : |
${map}
`;
    $("#textareaYaml").value = dst;
  }

  async function excelTable2Json() {
    let dst = {}; 
    await Excel.run(async (context) => {
      let sheet = context.workbook.worksheets.getActiveWorksheet();
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

      let row = range.values.reduce(((acc, cur) => acc.concat(`\r\n  ${cur}`)), "  ");
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
  
  /** Default helper for invoking an action and handling errors. */
  async function tryCatch(callback) {
    try {
      await callback();
    } catch (error) {
      console.error(error);
    }
  }
  
  loadScript = ((targetId)=> {
    // Add element
    let template = `
      <button id="runExcel2Yaml" class="ms-Button">
        <span class="ms-Button-label">Excel -&gt; Yaml</span>
      </button>
      <button id="runYaml2Excel" class="ms-Button">
        <span class="ms-Button-label">Excel &lt;- Yaml</span>
      </button>
      <textarea id="textareaYaml">
      </textarea>
    `;

    //$(targetId).append(_.template(template, data));
    $(targetId).append(template);
    $("#runExcel2Yaml").click(() => tryCatch(runExcel2Yaml));
    $("#runYaml2Excel").click(() => tryCatch(runYaml2Excel));
    
    // load form CDN
    $.getScript("https://cdnjs.cloudflare.com/ajax/libs/js-yaml/4.0.0/js-yaml.min.js", () => {
      console.log("loaded js-yaml");
    });
  });
  
})();





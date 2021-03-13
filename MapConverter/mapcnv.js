let loadScript;

(() => {

  loadScript = (targetId) => {
    // Add element
    let template = `
      <button id="runExcel2Yaml" class="ms-Button">
        <span class="ms-Button-label">Excel -&gt; Yaml</span>
      </button>
      <button id="runYaml2Excel" class="ms-Button">
        <span class="ms-Button-label" disabled>Excel &lt;- Yaml</span>
      </button><br/>
      <textarea id="textareaYaml" cols="80" rows="30">
      </textarea>
    `;

    //$(targetId).append(_.template(template, data));
    $(targetId).append(template);
    $("#runExcel2Yaml").click(() => tryCatch(runExcel2Yaml));
    //$("#runYaml2Excel").click(() => tryCatch(runYaml2Excel));

    // load form CDN
    $.getScript("https://cdnjs.cloudflare.com/ajax/libs/js-yaml/4.0.0/js-yaml.min.js", () => {
      console.log("loaded js-yaml");
    });
  };

  /** logic */

  const runExcel2Yaml = async () => {
    await Excel.run(async (context) => {
      let sheet = context.workbook.worksheets.getActiveWorksheet();
      let range = sheet.getRange(ConfigCell).load();
      await context.sync();
      let json = JSON.parse(range.values[0][0])

      let table = await excelTable2Json(context, sheet, json.Table);
      let map = await excel2MapText(context, sheet, json.Map);

      // let dst = jsyaml.dump(Object.assign(table, "Map : |\r\n" + map));
      let dst = `
${jsyaml.dump(table)}
Map : |${map}
`;
      // console.log(dst);
      $("#textareaYaml").val(dst);
    });




  }

  const excelTable2Json = async(context, sheet, json) => {
    let range = {};
    let dst = {};

    Object.keys(json).forEach((key) => {
      range[key] = sheet.getRange(json[key]).load();
    });

    await context.sync();

    Object.keys(json).forEach((key) => {
      dst[key] = range[key].values[0][0];
    });

    return dst;
  }

  const excel2MapText = async (context, sheet, address) => {
    let dst = "";
    let range = sheet.getRange(address).load();

    await context.sync();

    dst = range.values.reduce((acc_row, cur_row) => {
      let hoge = cur_row.reduce((acc_col, cur_col) => acc_col + String(cur_col === "" ? " " : cur_col), "");
      return `${acc_row}\r\n  ${hoge}`;
    }, "");

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

  console.log("loaded mapcnv.js 0.01");
})();


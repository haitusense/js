console.log("loaded mapconv 0.014");


const mapconv =()=>{ };
const loadScript =()=>{ };

(()=>{
  function test() {
    console.log("test");
  };
  
  mapconv.test = test;

  /** Default helper for invoking an action and handling errors. */
  async function tryCatch(callback) {
    try {
      await callback();
    } catch (error) {
      console.error(error);
    }
  }
  
  loadScript = (targetId)=> {
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
  }
  
})();





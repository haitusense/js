console.log("loaded mapconv 0.013");


const mapconv =()=>{ };

(()=>{
  function test() {
    console.log("test");
  };
  
  mapconv.test = test;
})();

function loadScript(targetId) {
  // Add element
  let parent = $(targetId);
  
  let template = `
    <button id="runExcel2Yaml" class="ms-Button">
      <span class="ms-Button-label">Excel -&gt; Yaml</span>
    </button>
    <button id="runYaml2Excel" class="ms-Button">
      <span class="ms-Button-label">Excel &lt;- Yaml</span>
    </button>
  `;
//    '<textarea id="textareaYaml" row="10" col="3">',
//    '</textarea>',

  //$(targetId).append(_.template(template, data));
  $(targetId).append(template);

  // load form CDN
  $.getScript("https://cdnjs.cloudflare.com/ajax/libs/js-yaml/4.0.0/js-yaml.min.js", () => {
    console.log("loaded js-yaml");
  });
}



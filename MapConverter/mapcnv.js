console.log("loaded mapconv 0.011");


const mapconv =()=>{ };

(()=>{
  function test() {
    console.log("test");
  };
  
  mapconv.test = test;
})();

function loadScript(targetId) {
  // Add element
  let parent = document.getElementById(targetId);

  let element1 = document.createElement("button");
  element1.innerText = "Excel -> Yaml";
  // element1.idName = "runExcel2Yaml";  
  element1.className = "ms-Button";
  //element1.onclick = () => 
  
  let element2 = document.createElement("button");
  element2.innerText = "Excel <- Yaml";
  element2.className = "ms-Button";
  //element2.onclick = () => 
  
  parent.appendChild(element1);
  parent.appendChild(element2);
  
  // load form CDN
  $.getScript("https://cdnjs.cloudflare.com/ajax/libs/js-yaml/4.0.0/js-yaml.min.js", () => {
    console.log("loaded js-yaml");
  });
}



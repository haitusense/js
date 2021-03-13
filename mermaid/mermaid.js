const loadScript = null;

(() => {

  loadScript = (targetId) => {
    // Add element
    let element = `
    <body>
    <pre><code class="language-mermaid">
      graph LR
        A(Planed) --> B
        B[Process-1] --> C
        C[Process-2] --> D[Stop]
        C --> E[Done]
        style B fill:#f9f
    </code></pre>

    <div class="language-mermaid">
      gantt
	      title Progress Diagram
	      dateFormat  YYYY-MM-DD
	      section Lot-1
	        Process-1 : crit, a1, 2014-01-01, 60d
	        Process-2 :       a2, after a1  , 20d
	      section Lot-2
	        Process-1 :       b1, 2014-03-01, 60d
	        Process-2 :       b2, after b1, 20d
    </div>
    `;

    $(targetId).append(element);

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
  };

  /** Default helper for invoking an action and handling errors. */
  async function tryCatch(callback) {
    try {
      await callback();
    } catch (error) {
      console.error(error);
    }
  }

  console.log("loaded mermaid");
})();

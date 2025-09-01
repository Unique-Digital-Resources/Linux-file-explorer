class DirectoryBar extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
  
      // Create the component's DOM
      this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="/themes/default/directory-bar.css">
        <div class="directory-bar">
          <div class="dirct-move">
            <i class="mdi mdi-home"></i>
            <i class="mdi mdi-arrow-left"></i>
            <i class="mdi mdi-arrow-right"></i>
            <i class="mdi mdi-arrow-up"></i>
            <i class="mdi mdi-refresh"></i>
          </div>
          <div class="dirct-path">
            <div class="breadcrumb-path">
              <span>Home</span>
              <span>Documents</span>
              <span>Projects</span>
            </div>
            <i class="mdi mdi-folder-plus clip-text" title="Copy folder path"></i>
          </div>
          <div class="search-box">
            <i class="mdi mdi-magnify"></i>
            <input type="text" placeholder="Search">
          </div>
        </div>
      `;
  
      // Set encapsulated layout styles and inherited properties
      const style = document.createElement('style');
      style.textContent = `
        :host {
          box-sizing: border-box;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        .directory-bar {
          display: flex;
          align-items: center;
          padding: 8px 12px;
          gap: 12px;
          height: 50px;
          width: 100%;
          box-sizing: border-box;
        }
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
      `;
      this.shadowRoot.appendChild(style);
    }
  }
  
  customElements.define('directory-bar', DirectoryBar);
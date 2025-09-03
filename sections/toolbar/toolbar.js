class Toolbar extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
  
      // Create the template with four tool groups
      this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="../../themes/default/toolbar.css">
        <div class="toolbar">
          <div class="tool-group new-group">
            <i class="mdi mdi-folder-plus" title="New Folder"></i>
            <i class="mdi mdi-file-plus" title="New File"></i>
            <i class="mdi mdi-share-variant" title="Share"></i>
          </div>
          <div class="tool-group edit-group">
            <i class="mdi mdi-content-copy" title="Copy"></i>
            <i class="mdi mdi-content-cut" title="Cut"></i>
            <i class="mdi mdi-content-paste" title="Paste"></i>
            <i class="mdi mdi-rename-box" title="Rename"></i>
          </div>
          <div class="tool-group select-group">
            <i class="mdi mdi-select-all" title="Select All"></i>
            <i class="mdi mdi-select-off" title="Deselect All"></i>
            <i class="mdi mdi-delete" title="Delete"></i>
            <i class="mdi mdi-information" title="Properties"></i>
          </div>
          <div class="tool-group view-group">
            <i class="mdi mdi-sort-alphabetical-ascending" title="Sort by Name (A-Z)"></i>
            <i class="mdi mdi-sort-alphabetical-descending" title="Sort by Name (Z-A)"></i>
            <i class="mdi mdi-view-grid" title="Grid View"></i>
            <i class="mdi mdi-view-list" title="List View"></i>
          </div>
        </div>
      `;
  
      // Apply encapsulated layout styles and inherited properties
      const style = document.createElement('style');
      style.textContent = `
        :host {
          box-sizing: border-box;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        * {
          box-sizing: inherit;
        }
        .toolbar {
          display: flex;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 16px;
          flex-wrap: wrap;
        }
      `;
      this.shadowRoot.appendChild(style);
    }
  }
  
  customElements.define('tool-bar', Toolbar);
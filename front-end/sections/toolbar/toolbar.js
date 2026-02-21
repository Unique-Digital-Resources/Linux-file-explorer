class Toolbar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

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
          <i class="mdi mdi-view-dashboard view-mode-btn" title="View Mode"></i>
          <i class="mdi mdi-sort-alphabetical-ascending" title="Sort by Name (A-Z)"></i>
          <i class="mdi mdi-sort-alphabetical-descending" title="Sort by Name (Z-A)"></i>
          
          <!-- Floating View Mode Menu -->
          <div class="view-mode-dropdown" hidden>
            <!-- Updated label and data-mode -->
            <div data-mode="masonry" class="mode-option">
              <i class="mdi mdi-view-grid-outline"></i> Masonry Gallery
            </div>
            <div data-mode="general" class="mode-option">
              <i class="mdi mdi-view-grid"></i> General Grid
            </div>
            <div data-mode="file-types" class="mode-option">
              <i class="mdi mdi-file-tree"></i> By File Types
            </div>
          </div>
        </div>
      </div>
    `;

    const style = document.createElement('style');
    style.textContent = `
      :host { box-sizing: border-box; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
      * { box-sizing: inherit; }
      .toolbar { display: flex; justify-content: space-between; gap: 12px; margin-bottom: 16px; flex-wrap: wrap; }
      .view-group { position: relative; }
      .view-mode-dropdown {
        position: absolute; top: 100%; right: 0; background: white;
        border: 1px solid #ccc; border-radius: 4px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        width: 180px; z-index: 100; margin-top: 5px; overflow: hidden;
      }
      .mode-option {
        padding: 10px 12px; cursor: pointer; display: flex; align-items: center; gap: 8px;
        font-size: 14px; color: #333;
      }
      .mode-option:hover { background-color: #f0f0f0; }
    `;
    this.shadowRoot.appendChild(style);

    const viewBtn = this.shadowRoot.querySelector('.view-mode-btn');
    const dropdown = this.shadowRoot.querySelector('.view-mode-dropdown');
    const options = this.shadowRoot.querySelectorAll('.mode-option');

    viewBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      dropdown.hidden = !dropdown.hidden;
    });

    document.addEventListener('click', () => {
      if (!dropdown.hidden) dropdown.hidden = true;
    });

    options.forEach(opt => {
      opt.addEventListener('click', (e) => {
        const mode = e.currentTarget.getAttribute('data-mode');
        window.dispatchEvent(new CustomEvent('change-view-mode', { detail: mode }));
        dropdown.hidden = true;
      });
    });
  }
}

customElements.define('tool-bar', Toolbar);
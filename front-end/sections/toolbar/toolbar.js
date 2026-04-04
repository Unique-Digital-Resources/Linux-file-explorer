class Toolbar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.currentPath = '/';

    window.addEventListener('path-changed', (e) => {
      this.currentPath = e.detail.path;
    });

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
          <i class="mdi mdi-sort sort-btn" title="Sort"></i>

          <!-- Sort Dropdown Menu -->
          <div class="sort-dropdown" hidden>
            <div data-sort="name" data-dir="asc" class="sort-option">
              <i class="mdi mdi-sort-alphabetical-ascending"></i> Name (A-Z)
            </div>
            <div data-sort="name" data-dir="desc" class="sort-option">
              <i class="mdi mdi-sort-alphabetical-descending"></i> Name (Z-A)
            </div>
            <div class="sort-divider"></div>
            <div data-sort="date" data-dir="desc" class="sort-option">
              <i class="mdi mdi-sort-clock-ascending"></i> Date (Newest)
            </div>
            <div data-sort="date" data-dir="asc" class="sort-option">
              <i class="mdi mdi-sort-clock-descending"></i> Date (Oldest)
            </div>
            <div class="sort-divider"></div>
            <div data-sort="size" data-dir="desc" class="sort-option">
              <i class="mdi mdi-sort-numeric-ascending"></i> Size (Largest)
            </div>
            <div data-sort="size" data-dir="asc" class="sort-option">
              <i class="mdi mdi-sort-numeric-descending"></i> Size (Smallest)
            </div>
            <div class="sort-divider"></div>
            <div data-sort="type" data-dir="asc" class="sort-option">
              <i class="mdi mdi-file-tree"></i> Type (A-Z)
            </div>
          </div>

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
      .tool-group i { cursor: pointer; }
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
      .sort-btn { cursor: pointer; }
      .sort-dropdown {
        position: absolute; top: 100%; right: 0; background: var(--card-bg, white);
        border: 1px solid var(--border-color, #ccc); border-radius: 4px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        width: 180px; z-index: 100; margin-top: 5px; overflow: hidden;
      }
      .sort-option {
        padding: 8px 12px; cursor: pointer; display: flex; align-items: center; gap: 8px;
        font-size: 13px; color: var(--text-color, #333);
      }
      .sort-option:hover { background: var(--hover-bg, #f0f0f0); }
      .sort-divider {
        height: 1px; background: var(--border-color, #eee); margin: 4px 0;
      }
    `;
    this.shadowRoot.appendChild(style);

    const viewBtn = this.shadowRoot.querySelector('.view-mode-btn');
    const dropdown = this.shadowRoot.querySelector('.view-mode-dropdown');
    const options = this.shadowRoot.querySelectorAll('.mode-option');

    const sortBtn = this.shadowRoot.querySelector('.sort-btn');
    const sortDropdown = this.shadowRoot.querySelector('.sort-dropdown');
    const sortOptions = this.shadowRoot.querySelectorAll('.sort-option');

    viewBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      dropdown.hidden = !dropdown.hidden;
      // Close sort dropdown if open
      sortDropdown.hidden = true;
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

    // New Group Tools
    this.shadowRoot.querySelector('.mdi-folder-plus').addEventListener('click', () => this.handleNewFolder());
    this.shadowRoot.querySelector('.mdi-file-plus').addEventListener('click', () => this.handleNewFile());
    this.shadowRoot.querySelector('.mdi-share-variant').addEventListener('click', () => this.handleShare());

    // Edit Group Tools
    this.shadowRoot.querySelector('.mdi-content-copy').addEventListener('click', () => this.handleCopy());
    this.shadowRoot.querySelector('.mdi-content-cut').addEventListener('click', () => this.handleCut());
    this.shadowRoot.querySelector('.mdi-content-paste').addEventListener('click', () => this.handlePaste());
    this.shadowRoot.querySelector('.mdi-rename-box').addEventListener('click', () => this.handleRename());

    // Select Group Tools
    this.shadowRoot.querySelector('.mdi-select-all').addEventListener('click', () => this.handleSelectAll());
    this.shadowRoot.querySelector('.mdi-select-off').addEventListener('click', () => this.handleDeselectAll());
    this.shadowRoot.querySelector('.mdi-delete').addEventListener('click', () => this.handleDelete());
    this.shadowRoot.querySelector('.mdi-information').addEventListener('click', () => this.handleProperties());

    sortBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      sortDropdown.hidden = !sortDropdown.hidden;
      // Close view dropdown if open
      dropdown.hidden = true;
    });

    sortOptions.forEach(opt => {
      opt.addEventListener('click', (e) => {
        const sortBy = e.currentTarget.getAttribute('data-sort');
        const sortDir = e.currentTarget.getAttribute('data-dir');
        window.AppState.setSort(sortBy, sortDir);
        sortDropdown.hidden = true;
      });
    });

    // Close sort dropdown when clicking outside
    document.addEventListener('click', () => {
      if (!sortDropdown.hidden) sortDropdown.hidden = true;
    });
  }

  handleNewFolder() {
    const name = prompt('Enter folder name:', 'New Folder');
    if (!name) return;
    const result = window.SimulationAPI.createFolder(this.currentPath, name);
    if (result.success) {
      window.dispatchEvent(new CustomEvent('refresh-contents'));
    } else {
      alert(result.error);
    }
  }

  handleNewFile() {
    const name = prompt('Enter file name:', 'New File.txt');
    if (!name) return;
    const result = window.SimulationAPI.createFile(this.currentPath, name);
    if (result.success) {
      window.dispatchEvent(new CustomEvent('refresh-contents'));
    } else {
      alert(result.error);
    }
  }

  handleShare() {
    if (!window.AppState.selectedItems.length) {
      alert('Please select items to share');
      return;
    }
    const paths = window.AppState.selectedItems.map(item => item.path);
    navigator.clipboard.writeText(paths.join('\n')).then(() => {
      console.log('Item paths copied to clipboard');
    }).catch(err => {
      console.error('Failed to copy to clipboard:', err);
    });
  }

  handleCopy() {
    if (!window.AppState.selectedItems.length) {
      alert('Please select items to copy');
      return;
    }
    window.AppState.copyToClipboard(window.AppState.selectedItems);
    console.log('Items copied to clipboard');
  }

  handleCut() {
    if (!window.AppState.selectedItems.length) {
      alert('Please select items to cut');
      return;
    }
    window.AppState.cutToClipboard(window.AppState.selectedItems);
  }

  handlePaste() {
    if (!window.AppState.hasClipboard()) {
      alert('Clipboard is empty');
      return;
    }
    const clipboard = window.AppState.clipboard;
    for (const item of clipboard.items) {
      if (clipboard.mode === 'copy') {
        window.SimulationAPI.copyItem(item.path, this.currentPath);
      } else if (clipboard.mode === 'cut') {
        window.SimulationAPI.moveItem(item.path, this.currentPath);
      }
    }
    if (clipboard.mode === 'cut') {
      window.AppState.clipboard.items = [];
      window.AppState.clipboard.mode = null;
    }
    window.dispatchEvent(new CustomEvent('refresh-contents'));
  }

  handleRename() {
    if (!window.AppState.selectedItems.length || window.AppState.selectedItems.length > 1) {
      alert('Please select a single item to rename');
      return;
    }
    const item = window.AppState.selectedItems[0];
    const newName = prompt('Enter new name:', item.name);
    if (!newName) return;
    const result = window.SimulationAPI.renameItem(item.path, newName);
    if (result.success) {
      window.dispatchEvent(new CustomEvent('refresh-contents'));
    } else {
      alert(result.error || 'Rename failed');
    }
  }

  handleSelectAll() {
    const result = window.SimulationAPI.getFolderContents(this.currentPath);
    if (result && result.items) {
      window.AppState.selectAll(result.items);
    }
  }

  handleDeselectAll() {
    window.AppState.deselectAll();
  }

  handleDelete() {
    if (!window.AppState.selectedItems.length) {
      alert('Please select items to delete');
      return;
    }
    const count = window.AppState.selectedItems.length;
    if (!confirm(`Delete ${count} item(s)?`)) return;
    for (const item of window.AppState.selectedItems) {
      window.SimulationAPI.deleteItem(item.path);
    }
    window.AppState.deselectAll();
    window.dispatchEvent(new CustomEvent('refresh-contents'));
  }

  handleProperties() {
    if (!window.AppState.selectedItems.length) {
      alert('Please select items to view properties');
      return;
    }
    window.dispatchEvent(new CustomEvent('show-properties', {
      detail: { items: [...window.AppState.selectedItems] }
    }));
  }
}

customElements.define('tool-bar', Toolbar);

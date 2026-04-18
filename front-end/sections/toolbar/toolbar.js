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

        <!-- ============================================
             NEW: Filter & Search Tool Group
             ============================================ -->
        <div class="tool-group filter-search-group" id="filterSearchGroup">

          <!-- ── Filter by Extension ── -->
          <div class="filter-wrapper" data-type="extension">
            <button class="filter-btn" type="button" id="extBtn">
              <i class="mdi mdi-file-document-outline"></i>
              <span class="btn-content" id="extBtnContent"></span>
              <span class="btn-clear" id="extClear"><i class="mdi mdi-close"></i></span>
            </button>
            <div class="filter-dropdown" id="extDropdown">
              <div class="dropdown-scroll" id="extList">
                <!-- Backend: populate with file extensions found in the current directory -->
              </div>
            </div>
          </div>

          <!-- ── Filter by Tag ── -->
          <div class="filter-wrapper" data-type="tag">
            <button class="filter-btn" type="button" id="tagBtn">
              <i class="mdi mdi-tag-outline"></i>
              <span class="btn-content" id="tagBtnContent"></span>
              <span class="btn-clear" id="tagClear"><i class="mdi mdi-close"></i></span>
            </button>
            <div class="filter-dropdown" id="tagDropdown">
              <div class="dd-search">
                <i class="mdi mdi-magnify"></i>
                <input type="text" placeholder="Search tags..." id="tagSearch">
              </div>
              <div class="dropdown-scroll" id="tagList">
                <!-- Backend: populate with all available tags -->
              </div>
              <div class="dd-footer">
                <button class="dd-footer-btn" type="button" id="clearTagsBtn" title="Clear selection">
                  <i class="mdi mdi-close-circle-outline"></i>
                </button>
                <!-- Backend: clear tag filter → refresh file list -->
              </div>
              <div class="dd-create">
                <input type="text" placeholder="New tag..." id="newTagName">
                <button class="create-btn" type="button" id="createTagBtn" title="Create tag">
                  <i class="mdi mdi-plus"></i>
                </button>
                <!-- Backend: POST /api/tags  { name } -->
              </div>
            </div>
          </div>

          <!-- ── Filter by Color ── -->
          <div class="filter-wrapper" data-type="color">
            <button class="filter-btn" type="button" id="colorBtn">
              <i class="mdi mdi-palette-outline"></i>
              <span class="btn-content" id="colorBtnContent"></span>
            </button>
            <div class="filter-dropdown" id="colorDropdown">
              <div class="dd-grid" id="colorGrid">
                <!-- Backend: populate with all available color labels -->
              </div>
              <div class="dd-create">
                <input type="color" id="newColorHex" value="#ff6b6b" title="Pick a color">
                <input type="text" placeholder="Color name..." id="newColorName">
                <button class="create-btn" type="button" id="createColorBtn" title="Add color">
                  <i class="mdi mdi-plus"></i>
                </button>
                <!-- Backend: POST /api/colors  { name, hex } -->
              </div>
            </div>
          </div>

          <!-- ── Search ── -->
          <div class="filter-wrapper search-wrapper" data-type="search">
            <button class="filter-btn search-toggle" type="button" id="searchToggle">
              <i class="mdi mdi-magnify"></i>
            </button>
            <div class="search-box" id="searchBox">
              <i class="mdi mdi-magnify"></i>
              <input type="text" placeholder="Search files..." id="searchInput">
              <button class="search-clear" type="button" id="searchClear">
                <i class="mdi mdi-close"></i>
              </button>
              <!-- Backend: debounce input → GET /api/search?q={query} -->
            </div>
          </div>

        </div><!-- /filter-search-group -->
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

      /* ===== FILTER & SEARCH TOOL GROUP (Isolated Styles) ===== */
      .filter-search-group {
        --fs-bg: #f8f9fa; --fs-text: #212529; --fs-card: #ffffff; --fs-border: #dee2e6;
        --fs-accent: #0d6efd; --fs-hover: #e9ecef; --fs-shadow: 0 2px 4px rgba(0,0,0,0.1);
        --fs-radius: 8px; --fs-dd-shadow: 0 6px 20px rgba(0,0,0,0.14);
        --fs-transition-fast: 0.15s ease; --fs-transition-med: 0.25s ease;
      }

      /* Reset .tool-group i inherited styles for icons within filter-search-group */
      .filter-search-group i {
        width: auto;
        height: auto;
        padding: 0;
        border-radius: 0;
        display: inline;
      }

      /* Prevent .tool-group i hover from affecting filter-search-group icons */
      .filter-search-group i:hover {
        background: transparent;
        color: inherit;
      }

      .filter-wrapper { position: relative; }

      .filter-btn {
        display: flex; align-items: center; gap: 5px;
        height: 32px; padding: 0 10px; min-width: 32px;
        border: none; background: transparent; border-radius: 6px;
        cursor: pointer; color: var(--fs-text);
        font-size: 13px; font-family: inherit;
        white-space: nowrap; justify-content: center; overflow: hidden;
        transition: background var(--fs-transition-fast), color var(--fs-transition-fast), min-width var(--fs-transition-med);
      }
      .filter-btn:hover { background: var(--fs-hover); }
      .filter-btn.pressed { background: var(--fs-hover); }
      .filter-btn.has-filter { background: #e7f0ff; color: var(--fs-accent); }
      .filter-btn .mdi { font-size: 18px; flex-shrink: 0; }

      .btn-content {
        display: flex; align-items: center; gap: 4px;
        overflow: hidden; min-width: 0;
      }
      .btn-label { overflow: hidden; text-overflow: ellipsis; }

      .btn-clear {
        display: none; align-items: center; justify-content: center;
        width: 18px; height: 18px; border: none; background: transparent;
        border-radius: 50%; cursor: pointer; color: #adb5bd;
        font-size: 14px; flex-shrink: 0; padding: 0;
        transition: background var(--fs-transition-fast), color var(--fs-transition-fast);
      }
      .btn-clear:hover { background: rgba(0,0,0,.08); color: var(--fs-text); }
      .has-filter .btn-clear { display: flex; }

      .mini-chip {
        display: inline-flex; align-items: center;
        height: 20px; padding: 0 6px; border-radius: 4px;
        font-size: 11px; font-weight: 600; line-height: 1; flex-shrink: 0;
        background: var(--fs-hover); color: var(--fs-text);
      }
      .mini-dot {
        width: 14px; height: 14px; border-radius: 50%; flex-shrink: 0;
        border: 2px solid rgba(255,255,255,.85);
        box-shadow: 0 0 0 1px rgba(0,0,0,.12);
        display: inline-flex; align-items: center; justify-content: center;
      }
      .mini-overflow {
        display: inline-flex; align-items: center; justify-content: center;
        height: 20px; padding: 0 5px; border-radius: 4px;
        background: var(--fs-hover); font-size: 11px; font-weight: 700;
        color: #868e96; flex-shrink: 0;
      }

      /* ===== DROPDOWN ===== */
      .filter-dropdown {
        position: absolute; top: calc(100% + 6px); left: 0;
        min-width: 220px; background: var(--fs-card);
        border: 1px solid var(--fs-border); border-radius: var(--fs-radius);
        box-shadow: var(--fs-dd-shadow); z-index: 1000;
        opacity: 0; transform: translateY(-6px) scale(.98);
        pointer-events: none;
        transition: opacity var(--fs-transition-fast), transform var(--fs-transition-fast);
      }
      .filter-dropdown.open {
        opacity: 1; transform: translateY(0) scale(1);
        pointer-events: auto;
      }

      .dropdown-scroll {
        max-height: 250px; overflow-y: auto; padding: 4px;
      }
      .dropdown-scroll::-webkit-scrollbar { width: 5px; }
      .dropdown-scroll::-webkit-scrollbar-track { background: transparent; }
      .dropdown-scroll::-webkit-scrollbar-thumb { background: #ced4da; border-radius: 3px; }

      .dd-item {
        display: flex; align-items: center; gap: 8px;
        padding: 7px 10px; border-radius: 6px; cursor: pointer;
        font-size: 13px; transition: background var(--fs-transition-fast);
        user-select: none;
      }
      .dd-item:hover { background: var(--fs-hover); }
      .dd-item.selected { background: #e7f0ff; color: var(--fs-accent); }
      .dd-item .check { width: 16px; flex-shrink: 0; text-align: center; font-size: 15px; }
      .dd-item .name { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; }
      .dd-item .count {
        font-size: 11px; font-weight: 600; color: #868e96;
        background: var(--fs-hover); padding: 1px 7px; border-radius: 10px;
        flex-shrink: 0;
      }
      .dd-item.selected .count { background: rgba(13,110,253,.12); color: var(--fs-accent); }

      .dd-check-item {
        display: flex; align-items: center; gap: 8px;
        padding: 7px 10px; border-radius: 6px; cursor: pointer;
        font-size: 13px; transition: background var(--fs-transition-fast);
        user-select: none;
      }
      .dd-check-item:hover { background: var(--fs-hover); }

      .cb {
        width: 16px; height: 16px; border: 1.5px solid #bbb;
        border-radius: 4px; display: flex; align-items: center;
        justify-content: center; flex-shrink: 0;
        font-size: 11px; color: white;
        transition: background var(--fs-transition-fast), border-color var(--fs-transition-fast);
      }
      .dd-check-item.checked .cb {
        background: var(--fs-accent); border-color: var(--fs-accent);
      }

      .dd-search {
        display: flex; align-items: center; gap: 6px;
        padding: 6px 10px; border-bottom: 1px solid var(--fs-border);
      }
      .dd-search .mdi { font-size: 15px; color: #adb5bd; flex-shrink: 0; }
      .dd-search input {
        flex: 1; border: none; outline: none; font-size: 13px;
        font-family: inherit; background: transparent; color: var(--fs-text);
      }

      .dd-footer {
        padding: 6px 8px; border-top: 1px solid var(--fs-border);
        display: flex; justify-content: flex-end;
      }
      .dd-footer-btn {
        display: flex; align-items: center; justify-content: center;
        width: 24px; height: 24px; border: none; background: transparent;
        border-radius: 50%; cursor: pointer; color: #adb5bd; font-size: 15px;
        transition: background var(--fs-transition-fast), color var(--fs-transition-fast);
      }
      .dd-footer-btn:hover { background: rgba(0,0,0,.06); color: var(--fs-text); }

      .dd-create {
        display: flex; align-items: center; gap: 4px;
        padding: 6px 8px; border-top: 1px solid var(--fs-border);
      }
      .dd-create input[type="text"] {
        flex: 1; min-width: 0;
        border: 1px solid var(--fs-border); border-radius: 5px;
        padding: 5px 8px; font-size: 12px; font-family: inherit;
        outline: none; transition: border-color var(--fs-transition-fast);
      }
      .dd-create input[type="text"]:focus { border-color: var(--fs-accent); }

      input[type="color"] {
        -webkit-appearance: none; appearance: none;
        border: 1px solid var(--fs-border); width: 28px; height: 28px;
        border-radius: 5px; cursor: pointer; padding: 2px;
        background: var(--fs-card); flex-shrink: 0;
      }
      input[type="color"]::-webkit-color-swatch-wrapper { padding: 1px; }
      input[type="color"]::-webkit-color-swatch { border: none; border-radius: 3px; }

      .create-btn {
        display: flex; align-items: center; justify-content: center;
        width: 28px; height: 28px;
        border: 1px solid var(--fs-border); background: var(--fs-card);
        border-radius: 5px; cursor: pointer; color: var(--fs-text);
        font-size: 16px; flex-shrink: 0;
        transition: background var(--fs-transition-fast), border-color var(--fs-transition-fast), color var(--fs-transition-fast);
      }
      .create-btn:hover {
        background: var(--fs-accent); border-color: var(--fs-accent); color: #fff;
      }

      .dd-sep { height: 1px; background: var(--fs-border); margin: 3px 8px; }

      .dd-empty {
        padding: 14px 10px; text-align: center; font-size: 13px; color: #adb5bd;
      }

      /* ===== COLOR GRID ===== */
      .dd-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, 32px);
        gap: 8px; padding: 12px; justify-content: center;
      }
      .color-swatch-grid {
        width: 32px; height: 32px; border-radius: 6px;
        cursor: pointer; border: 2px solid transparent;
        display: flex; align-items: center; justify-content: center;
        transition: border-color var(--fs-transition-fast), transform var(--fs-transition-fast);
      }
      .color-swatch-grid:hover {
        transform: scale(1.1);
        border-color: rgba(0,0,0,.15);
      }
      .color-swatch-grid.selected {
        border-color: var(--fs-text);
        box-shadow: 0 0 0 2px var(--fs-card);
      }
      .color-swatch-grid.none-color {
        border: 2px dashed var(--fs-border);
        background: transparent;
      }
      .color-swatch-grid.none-color i {
        color: #adb5bd; font-size: 20px;
      }

      /* ===== SEARCH ===== */
      .search-wrapper {
        position: relative; display: flex; align-items: center; overflow: hidden;
      }
      .search-toggle {
        width: 32px; padding: 0; justify-content: center;
        transition: width var(--fs-transition-med), opacity var(--fs-transition-fast), padding var(--fs-transition-med);
      }
      .search-toggle.hidden {
        width: 0; padding: 0; opacity: 0; pointer-events: none; overflow: hidden;
      }
      .search-box {
        display: flex; align-items: center; gap: 4px;
        height: 32px; overflow: hidden;
        max-width: 0; opacity: 0;
        transition: max-width var(--fs-transition-med), opacity var(--fs-transition-fast), padding var(--fs-transition-med);
        padding: 0;
      }
      .search-box.open {
        max-width: 200px; opacity: 1; padding: 0 6px;
      }
      .search-box .mdi { font-size: 15px; color: #adb5bd; flex-shrink: 0; }
      .search-box input {
        width: 100%; border: none; outline: none; font-size: 13px;
        font-family: inherit; background: transparent; color: var(--fs-text);
      }
      .search-clear {
        display: flex; align-items: center; justify-content: center;
        width: 20px; height: 20px; border: none; background: transparent;
        border-radius: 50%; cursor: pointer; color: #adb5bd; font-size: 14px;
        flex-shrink: 0; padding: 0;
        transition: background var(--fs-transition-fast), color var(--fs-transition-fast);
      }
      .search-clear:hover { background: var(--fs-hover); color: var(--fs-text); }

      /* ===== Focus-visible ===== */
      .filter-btn:focus-visible,
      .tool-btn:focus-visible,
      .create-btn:focus-visible,
      .search-clear:focus-visible,
      .dd-footer-btn:focus-visible {
        outline: 2px solid var(--fs-accent); outline-offset: -2px;
      }
      .filter-btn:hover { background: var(--fs-hover); }
      .filter-btn.pressed { background: var(--fs-hover); }
      .filter-btn.has-filter { background: #e7f0ff; color: var(--fs-accent); }
      .filter-btn .mdi { font-size: 18px; flex-shrink: 0; }

      .btn-content {
        display: flex; align-items: center; gap: 4px;
        overflow: hidden; min-width: 0;
      }
      .btn-label { overflow: hidden; text-overflow: ellipsis; }

      .btn-clear {
        display: none; align-items: center; justify-content: center;
        width: 18px; height: 18px; border: none; background: transparent;
        border-radius: 50%; cursor: pointer; color: #adb5bd;
        font-size: 14px; flex-shrink: 0; padding: 0;
        transition: background var(--fs-transition-fast), color var(--fs-transition-fast);
      }
      .btn-clear:hover { background: rgba(0,0,0,.08); color: var(--fs-text); }
      .has-filter .btn-clear { display: flex; }

      .mini-chip {
        display: inline-flex; align-items: center;
        height: 20px; padding: 0 6px; border-radius: 4px;
        font-size: 11px; font-weight: 600; line-height: 1; flex-shrink: 0;
        background: var(--fs-hover); color: var(--fs-text);
      }
      .mini-dot {
        width: 14px; height: 14px; border-radius: 50%; flex-shrink: 0;
        border: 2px solid rgba(255,255,255,.85);
        box-shadow: 0 0 0 1px rgba(0,0,0,.12);
        display: inline-flex; align-items: center; justify-content: center;
      }
      .mini-overflow {
        display: inline-flex; align-items: center; justify-content: center;
        height: 20px; padding: 0 5px; border-radius: 4px;
        background: var(--fs-hover); font-size: 11px; font-weight: 700;
        color: #868e96; flex-shrink: 0;
      }

      /* ===== DROPDOWN ===== */
      .filter-dropdown {
        position: absolute; top: calc(100% + 6px); left: 0;
        min-width: 220px; background: var(--fs-card);
        border: 1px solid var(--fs-border); border-radius: var(--fs-radius);
        box-shadow: var(--fs-dd-shadow); z-index: 1000;
        opacity: 0; transform: translateY(-6px) scale(.98);
        pointer-events: none;
        transition: opacity var(--fs-transition-fast), transform var(--fs-transition-fast);
      }
      .filter-dropdown.open {
        opacity: 1; transform: translateY(0) scale(1);
        pointer-events: auto;
      }

      .dropdown-scroll {
        max-height: 250px; overflow-y: auto; padding: 4px;
      }
      .dropdown-scroll::-webkit-scrollbar { width: 5px; }
      .dropdown-scroll::-webkit-scrollbar-track { background: transparent; }
      .dropdown-scroll::-webkit-scrollbar-thumb { background: #ced4da; border-radius: 3px; }

      .dd-item {
        display: flex; align-items: center; gap: 8px;
        padding: 7px 10px; border-radius: 6px; cursor: pointer;
        font-size: 13px; transition: background var(--fs-transition-fast);
        user-select: none;
      }
      .dd-item:hover { background: var(--fs-hover); }
      .dd-item.selected { background: #e7f0ff; color: var(--fs-accent); }
      .dd-item .check { width: 16px; flex-shrink: 0; text-align: center; font-size: 15px; }
      .dd-item .name { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; }
      .dd-item .count {
        font-size: 11px; font-weight: 600; color: #868e96;
        background: var(--fs-hover); padding: 1px 7px; border-radius: 10px;
        flex-shrink: 0;
      }
      .dd-item.selected .count { background: rgba(13,110,253,.12); color: var(--fs-accent); }

      .dd-check-item {
        display: flex; align-items: center; gap: 8px;
        padding: 7px 10px; border-radius: 6px; cursor: pointer;
        font-size: 13px; transition: background var(--fs-transition-fast);
        user-select: none;
      }
      .dd-check-item:hover { background: var(--fs-hover); }

      .cb {
        width: 16px; height: 16px; border: 1.5px solid #bbb;
        border-radius: 4px; display: flex; align-items: center;
        justify-content: center; flex-shrink: 0;
        font-size: 11px; color: white;
        transition: background var(--fs-transition-fast), border-color var(--fs-transition-fast);
      }
      .dd-check-item.checked .cb {
        background: var(--fs-accent); border-color: var(--fs-accent);
      }

      .dd-search {
        display: flex; align-items: center; gap: 6px;
        padding: 6px 10px; border-bottom: 1px solid var(--fs-border);
      }
      .dd-search .mdi { font-size: 15px; color: #adb5bd; flex-shrink: 0; }
      .dd-search input {
        flex: 1; border: none; outline: none; font-size: 13px;
        font-family: inherit; background: transparent; color: var(--fs-text);
      }

      .dd-footer {
        padding: 6px 8px; border-top: 1px solid var(--fs-border);
        display: flex; justify-content: flex-end;
      }
      .dd-footer-btn {
        display: flex; align-items: center; justify-content: center;
        width: 24px; height: 24px; border: none; background: transparent;
        border-radius: 50%; cursor: pointer; color: #adb5bd; font-size: 15px;
        transition: background var(--fs-transition-fast), color var(--fs-transition-fast);
      }
      .dd-footer-btn:hover { background: rgba(0,0,0,.06); color: var(--fs-text); }

      .dd-create {
        display: flex; align-items: center; gap: 4px;
        padding: 6px 8px; border-top: 1px solid var(--fs-border);
      }
      .dd-create input[type="text"] {
        flex: 1; min-width: 0;
        border: 1px solid var(--fs-border); border-radius: 5px;
        padding: 5px 8px; font-size: 12px; font-family: inherit;
        outline: none; transition: border-color var(--fs-transition-fast);
      }
      .dd-create input[type="text"]:focus { border-color: var(--fs-accent); }

      input[type="color"] {
        -webkit-appearance: none; appearance: none;
        border: 1px solid var(--fs-border); width: 28px; height: 28px;
        border-radius: 5px; cursor: pointer; padding: 2px;
        background: var(--fs-card); flex-shrink: 0;
      }
      input[type="color"]::-webkit-color-swatch-wrapper { padding: 1px; }
      input[type="color"]::-webkit-color-swatch { border: none; border-radius: 3px; }

      .create-btn {
        display: flex; align-items: center; justify-content: center;
        width: 28px; height: 28px;
        border: 1px solid var(--fs-border); background: var(--fs-card);
        border-radius: 5px; cursor: pointer; color: var(--fs-text);
        font-size: 16px; flex-shrink: 0;
        transition: background var(--fs-transition-fast), border-color var(--fs-transition-fast), color var(--fs-transition-fast);
      }
      .create-btn:hover {
        background: var(--fs-accent); border-color: var(--fs-accent); color: #fff;
      }

      .dd-sep { height: 1px; background: var(--fs-border); margin: 3px 8px; }

      .dd-empty {
        padding: 14px 10px; text-align: center; font-size: 13px; color: #adb5bd;
      }

      /* ===== COLOR GRID ===== */
      .dd-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, 32px);
        gap: 8px;
        padding: 12px;
        justify-content: center;
      }
      .color-swatch-grid {
        width: 32px; height: 32px; border-radius: 6px;
        cursor: pointer; border: 2px solid transparent;
        display: flex; align-items: center; justify-content: center;
        transition: border-color var(--fs-transition-fast), transform var(--fs-transition-fast);
      }
      .color-swatch-grid:hover {
        transform: scale(1.1);
        border-color: rgba(0,0,0,.15);
      }
      .color-swatch-grid.selected {
        border-color: var(--fs-text);
        box-shadow: 0 0 0 2px var(--fs-card);
      }
      .color-swatch-grid.none-color {
        border: 2px dashed var(--fs-border);
        background: transparent;
      }
      .color-swatch-grid.none-color i {
        color: #adb5bd; font-size: 20px;
      }

      /* ===== SEARCH ===== */
      .search-wrapper {
        position: relative; display: flex; align-items: center; overflow: hidden;
      }
      .search-toggle {
        width: 32px; padding: 0; justify-content: center;
        transition: width var(--fs-transition-med), opacity var(--fs-transition-fast), padding var(--fs-transition-med);
      }
      .search-toggle.hidden {
        width: 0; padding: 0; opacity: 0; pointer-events: none; overflow: hidden;
      }
      .search-box {
        display: flex; align-items: center; gap: 4px;
        height: 32px; overflow: hidden;
        max-width: 0; opacity: 0;
        transition: max-width var(--fs-transition-med), opacity var(--fs-transition-fast), padding var(--fs-transition-med);
        padding: 0;
      }
      .search-box.open {
        max-width: 200px; opacity: 1; padding: 0 6px;
      }
      .search-box .mdi { font-size: 15px; color: #adb5bd; flex-shrink: 0; }
      .search-box input {
        width: 100%; border: none; outline: none; font-size: 13px;
        font-family: inherit; background: transparent; color: var(--fs-text);
      }
      .search-clear {
        display: flex; align-items: center; justify-content: center;
        width: 20px; height: 20px; border: none; background: transparent;
        border-radius: 50%; cursor: pointer; color: #adb5bd; font-size: 14px;
        flex-shrink: 0; padding: 0;
        transition: background var(--fs-transition-fast), color var(--fs-transition-fast);
      }
      .search-clear:hover { background: var(--fs-hover); color: var(--fs-text); }

      /* ===== Focus-visible ===== */
      .filter-btn:focus-visible,
      .tool-btn:focus-visible,
      .create-btn:focus-visible,
      .search-clear:focus-visible,
      .dd-footer-btn:focus-visible {
        outline: 2px solid var(--fs-accent); outline-offset: -2px;
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

    /* ==========================================================
       FILTER & SEARCH GROUP — UI State & Mock Data
       ========================================================== */
    this.openDropdown = null;

    // Mock data — Backend: GET /api/extensions?path=<currentPath>
    this.mockExtensions = [
      { ext: '.py',   count: 12 },
      { ext: '.js',   count: 8  },
      { ext: '.html', count: 5  },
      { ext: '.css',  count: 3  },
      { ext: '.md',   count: 7  },
      { ext: '.json', count: 4  },
      { ext: '.txt',  count: 9  },
      { ext: '.sh',   count: 2  },
      { ext: '.png',  count: 6  },
      { ext: '.pdf',  count: 3  },
      { ext: '.zip',  count: 1  },
      { ext: '.mp3',  count: 4  }
    ];

    // Mock data — Backend: GET /api/tags
    this.mockTags = [
      { name: 'important' },
      { name: 'work'      },
      { name: 'personal'  },
      { name: 'archived'  },
      { name: 'draft'     },
      { name: 'shared'    },
      { name: 'reference' },
      { name: 'todo'      }
    ];

    // Mock data — Backend: GET /api/colors
    this.mockColors = [
      { name: 'None',   hex: 'none'   },
      { name: 'Red',    hex: '#ef4444' },
      { name: 'Blue',   hex: '#3b82f6' },
      { name: 'Green',  hex: '#22c55e' },
      { name: 'Yellow', hex: '#eab308' },
      { name: 'Orange', hex: '#f97316' },
      { name: 'Purple', hex: '#a855f7' },
      { name: 'Pink',   hex: '#ec4899' },
      { name: 'Cyan',   hex: '#06b6d4' }
    ];

    /* ==========================================================
       FILTER & SEARCH — DOM References
       ========================================================== */
    const $  = id => this.shadowRoot.getElementById(id);

    const extBtn       = $('extBtn');
    const extBtnContent= $('extBtnContent');
    const extClear     = $('extClear');
    const extDropdown  = $('extDropdown');
    const extList      = $('extList');

    const tagBtn       = $('tagBtn');
    const tagBtnContent= $('tagBtnContent');
    const tagClear     = $('tagClear');
    const tagDropdown  = $('tagDropdown');
    const tagList      = $('tagList');
    const tagSearch    = $('tagSearch');
    const clearTagsBtn = $('clearTagsBtn');
    const newTagName   = $('newTagName');
    const createTagBtn = $('createTagBtn');

    const colorBtn       = $('colorBtn');
    const colorBtnContent= $('colorBtnContent');
    const colorDropdown  = $('colorDropdown');
    const colorGrid      = $('colorGrid');
    const newColorHex    = $('newColorHex');
    const newColorName   = $('newColorName');
    const createColorBtn = $('createColorBtn');

    const searchToggle = $('searchToggle');
    const searchBox    = $('searchBox');
    const searchInput  = $('searchInput');
    const searchClear  = $('searchClear');

    const filterSearchGroup = $('filterSearchGroup');

    /* ==========================================================
       FILTER & SEARCH — Render: Extension dropdown
       ========================================================== */
    const renderExtList = () => {
      extList.innerHTML = '';

      const allEl = document.createElement('div');
      allEl.className = 'dd-item' + (!window.AppState.filters.extension ? ' selected' : '');
      allEl.innerHTML = `
        <span class="check">${!window.AppState.filters.extension ? '<i class="mdi mdi-check"></i>' : ''}</span>
        <span class="name">All extensions</span>
        <span class="count">${this.mockExtensions.reduce((s, e) => s + e.count, 0)}</span>`;
      allEl.addEventListener('click', () => {
        window.AppState.setFilter('extension', null);
      });
      extList.appendChild(allEl);

      const sep = document.createElement('div');
      sep.className = 'dd-sep';
      extList.appendChild(sep);

      this.mockExtensions.forEach(item => {
        const el = document.createElement('div');
        const sel = window.AppState.filters.extension === item.ext;
        el.className = 'dd-item' + (sel ? ' selected' : '');
        el.innerHTML = `
          <span class="check">${sel ? '<i class="mdi mdi-check"></i>' : ''}</span>
          <span class="name">${item.ext}</span>
          <span class="count">${item.count}</span>`;
        el.addEventListener('click', () => {
          window.AppState.setFilter('extension', sel ? null : item.ext);
        });
        extList.appendChild(el);
      });
    };

    /* ==========================================================
       FILTER & SEARCH — Render: Tag dropdown
       ========================================================== */
    const renderTagList = (filter = '') => {
      tagList.innerHTML = '';
      const lf = filter.toLowerCase();
      const filtered = this.mockTags.filter(t => t.name.toLowerCase().includes(lf));

      if (filtered.length === 0) {
        tagList.innerHTML = '<div class="dd-empty">No tags found</div>';
        return;
      }

      filtered.forEach(tag => {
        const checked = window.AppState.filters.tags.includes(tag.name);
        const el = document.createElement('div');
        el.className = 'dd-check-item' + (checked ? ' checked' : '');
        el.innerHTML = `
          <span class="cb">${checked ? '<i class="mdi mdi-check"></i>' : ''}</span>
          <span>${tag.name}</span>`;
        el.addEventListener('click', () => {
          this.toggleTag(tag.name);
        });
        tagList.appendChild(el);
      });
    };

    /* ==========================================================
       FILTER & SEARCH — Render: Color dropdown (Grid)
       ========================================================== */
    const renderColorGrid = () => {
      colorGrid.innerHTML = '';

      this.mockColors.forEach(c => {
        const isSelected = window.AppState.filters.colors.includes(c.hex);
        const el = document.createElement('div');
        el.className = 'color-swatch-grid' + (isSelected ? ' selected' : '');
        el.title = c.name;

        if (c.hex === 'none') {
          el.classList.add('none-color');
          el.innerHTML = '<i class="mdi mdi-cancel"></i>';
        } else {
          el.style.background = c.hex;
        }

        el.addEventListener('click', () => {
          this.toggleColor(c.hex);
        });
        colorGrid.appendChild(el);
      });
    };

    /* ==========================================================
       FILTER & SEARCH — Button Display Updates
       ========================================================== */
    this.updateExtBtn = () => {
      const selectedExt = window.AppState.filters.extension;
      if (selectedExt) {
        extBtn.classList.add('has-filter');
        extBtnContent.innerHTML = `<span class="btn-label">${selectedExt}</span>`;
      } else {
        extBtn.classList.remove('has-filter');
        extBtnContent.innerHTML = '';
      }
    };

    this.updateTagBtn = () => {
      const selectedTags = window.AppState.filters.tags;
      if (selectedTags.length > 0) {
        tagBtn.classList.add('has-filter');
        const maxShow = 2;
        const shown = selectedTags.slice(0, maxShow);
        const rest = selectedTags.length - maxShow;
        let html = '';
        shown.forEach(name => {
          html += `<span class="mini-chip">${name}</span>`;
        });
        if (rest > 0) html += `<span class="mini-overflow">+${rest}</span>`;
        tagBtnContent.innerHTML = html;
      } else {
        tagBtn.classList.remove('has-filter');
        tagBtnContent.innerHTML = '';
      }
    };

    this.updateColorBtn = () => {
      const selectedColors = window.AppState.filters.colors;
      if (selectedColors.length > 0) {
        colorBtn.classList.add('has-filter');
        const maxShow = 3;
        const shown = selectedColors.slice(0, maxShow);
        const rest = selectedColors.length - maxShow;
        let html = '';
        shown.forEach(hex => {
          if (hex === 'none') {
            html += `<span class="mini-dot" style="background:transparent;border:2px dashed var(--fs-border);"><i class="mdi mdi-cancel" style="font-size:10px;color:#adb5bd;"></i></span>`;
          } else {
            html += `<span class="mini-dot" style="background:${hex}"></span>`;
          }
        });
        if (rest > 0) html += `<span class="mini-overflow">+${rest}</span>`;
        colorBtnContent.innerHTML = html;
      } else {
        colorBtn.classList.remove('has-filter');
        colorBtnContent.innerHTML = '';
      }
    };

    this.updateFilterSummary = () => {
      const f = window.AppState.filters;
      const parts = [];
      if (f.extension) parts.push(`ext:${f.extension}`);
      if (f.tags.length) parts.push(`tags:${f.tags.join(',')}`);
      if (f.colors.length) parts.push(`colors:${f.colors.join(',')}`);
      if (f.search) parts.push(`q:${f.search}`);
      console.log('[Filter Summary]', parts.join(' '));
    };

    /* ==========================================================
       FILTER & SEARCH — Toggle Helpers
       ========================================================== */
    this.toggleTag = (name) => {
      const current = window.AppState.filters.tags;
      const idx = current.indexOf(name);
      const newTags = idx >= 0 ? current.filter(t => t !== name) : [...current, name];
      window.AppState.setFilters({ tags: newTags });
    };

    this.toggleColor = (hex) => {
      const current = window.AppState.filters.colors;
      const idx = current.indexOf(hex);
      let newColors;
      if (hex === 'none') {
        newColors = idx >= 0 ? [] : ['none'];
      } else {
        const withoutNone = current.filter(c => c !== 'none');
        if (idx >= 0) {
          newColors = withoutNone.filter(c => c !== hex);
        } else {
          newColors = [...withoutNone, hex];
        }
      }
      window.AppState.setFilters({ colors: newColors });
    };

    /* ==========================================================
       FILTER & SEARCH — Dropdown Open / Close
       ========================================================== */
    const openDropdown = (type) => {
      if (this.openDropdown === type) { closeDropdown(); return; }
      closeDropdown();
      this.openDropdown = type;

      const map = {
        extension: { dropdown: extDropdown,   btn: extBtn   },
        tag:       { dropdown: tagDropdown,   btn: tagBtn   },
        color:     { dropdown: colorDropdown, btn: colorBtn }
      };
      const { dropdown, btn } = map[type];
      dropdown.classList.add('open');
      btn.classList.add('pressed');

      if (type === 'tag') setTimeout(() => tagSearch.focus(), 60);
    };

    const closeDropdown = () => {
      if (!this.openDropdown) return;
      [extDropdown, tagDropdown, colorDropdown].forEach(d => d.classList.remove('open'));
      [extBtn, tagBtn, colorBtn].forEach(b => b.classList.remove('pressed'));
      this.openDropdown = null;
    };

    /* ==========================================================
       FILTER & SEARCH — Event Listeners
       ========================================================== */
    extBtn.addEventListener('click', (e) => {
      if (e.target.closest('.btn-clear')) return;
      openDropdown('extension');
    });

    tagBtn.addEventListener('click', (e) => {
      if (e.target.closest('.btn-clear')) return;
      openDropdown('tag');
    });

    colorBtn.addEventListener('click', () => openDropdown('color'));

    extClear.addEventListener('click', (e) => {
      e.stopPropagation();
      window.AppState.setFilter('extension', null);
    });

    tagClear.addEventListener('click', (e) => {
      e.stopPropagation();
      window.AppState.setFilters({ tags: [] });
    });

    tagSearch.addEventListener('input', () => renderTagList(tagSearch.value));

    clearTagsBtn.addEventListener('click', () => {
      window.AppState.setFilters({ tags: [] });
    });

    createTagBtn.addEventListener('click', () => {
      const name  = newTagName.value.trim();
      if (!name) return;
      // Backend: POST /api/tags  { name }
      this.mockTags.push({ name });
      newTagName.value = '';
      renderTagList(tagSearch.value);
    });
    newTagName.addEventListener('keydown', e => { if (e.key === 'Enter') createTagBtn.click(); });

    createColorBtn.addEventListener('click', () => {
      const name = newColorName.value.trim();
      const hex  = newColorHex.value;
      if (!name) return;
      // Backend: POST /api/colors  { name, hex }
      this.mockColors.push({ name, hex });
      newColorName.value = '';
      renderColorGrid();
    });
    newColorName.addEventListener('keydown', e => { if (e.key === 'Enter') createColorBtn.click(); });

    searchToggle.addEventListener('click', () => {
      searchToggle.classList.add('hidden');
      searchBox.classList.add('open');
      setTimeout(() => searchInput.focus(), 80);
    });

    searchInput.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        searchInput.value = '';
        window.AppState.setFilter('search', '');
        this.closeSearch();
      }
      if (e.key === 'Enter') {
        window.AppState.setFilter('search', searchInput.value.trim());
      }
    });

    let searchTimer;
    searchInput.addEventListener('input', () => {
      clearTimeout(searchTimer);
      searchTimer = setTimeout(() => {
        window.AppState.setFilter('search', searchInput.value.trim());
      }, 300);
    });

    searchClear.addEventListener('click', () => {
      searchInput.value = '';
      window.AppState.setFilter('search', '');
      searchInput.focus();
    });

    searchInput.addEventListener('blur', () => {
      if (!searchInput.value) this.closeSearch();
    });

    this.closeSearch = () => {
      searchBox.classList.remove('open');
      searchToggle.classList.remove('hidden');
    };

    document.addEventListener('click', (e) => {
      // Use composedPath to check if click originated outside filter-search-group
      const path = e.composedPath();
      if (!path.includes(filterSearchGroup)) {
        closeDropdown();
      }
    });

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeDropdown();
    });

    /* ==========================================================
       FILTER & SEARCH — Init
       ========================================================== */
    renderExtList();
    renderTagList();
    renderColorGrid();
    // Set initial button states
    this.updateExtBtn();
    this.updateTagBtn();
    this.updateColorBtn();
    // Ensure search box is closed initially
    this.closeSearch();

    // Listen for global filter changes to synchronize UI
    window.addEventListener('filter-changed', () => {
      this.updateExtBtn();
      this.updateTagBtn();
      this.updateColorBtn();
      // Sync search input value (box state managed by specific handlers)
      searchInput.value = window.AppState.filters.search || '';
      // Refresh dropdown lists if open
      if (!extDropdown.hidden) renderExtList();
      if (!tagDropdown.hidden) renderTagList(tagSearch.value);
      if (!colorDropdown.hidden) renderColorGrid();
    });

    // Listen for active tab changes to synchronize UI with tab-specific filters
    window.addEventListener('active-tab-changed', () => {
      this.updateExtBtn();
      this.updateTagBtn();
      this.updateColorBtn();
      searchInput.value = window.AppState.filters.search || '';
      if (!extDropdown.hidden) renderExtList();
      if (!tagDropdown.hidden) renderTagList(tagSearch.value);
      if (!colorDropdown.hidden) renderColorGrid();
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
    const filters = window.AppState ? window.AppState.filters : {};
    const result = window.SimulationAPI.getFolderContents(this.currentPath, filters);
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

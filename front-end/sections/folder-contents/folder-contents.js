import './file-card.js';

class FolderContents extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.currentMode = 'general';
    this.container = document.createElement('div');
    this.container.setAttribute('class', 'folder-contents');
    this.currentPath = '/';
    this.files = [];
    
    // Settings state
    this.gridGap = 16;
    this.fontSize = 13;
    this.iconSize = 16;
    this.appScale = 100;
    
    // Online image cache for consistent picsum images
    this.imageCache = {};

    this.styleEl = document.createElement('style');
    this.linkEl = document.createElement('link');
    this.linkEl.setAttribute('rel', 'stylesheet');
    this.linkEl.setAttribute('href', '../../themes/default/folder-contents.css');

    window.addEventListener('change-view-mode', (e) => {
      this.currentMode = e.detail;
      this.render();
    });

    window.addEventListener('zoom-level-changed', (e) => {
      this.zoomLevel = e.detail;
      this.render();
    });

    // Listen for grid gap changes
    window.addEventListener('grid-gap-changed', (e) => {
      this.gridGap = e.detail;
      this.render();
    });

    // Listen for font size changes
    window.addEventListener('font-size-changed', (e) => {
      this.fontSize = e.detail;
      this.render();
    });

    // Listen for icon size changes
    window.addEventListener('icon-size-changed', (e) => {
      this.iconSize = e.detail;
      this.render();
    });

    // Listen for app scale changes
    window.addEventListener('app-scale-changed', (e) => {
      this.appScale = e.detail;
      this.render();
    });

    // Listen for navigation events
    window.addEventListener('navigate-to-path', (e) => {
      this.loadFolder(e.detail.path);
    });

    // Listen for selection changes
    window.addEventListener('selection-changed', () => {
      this.updateCardSelections();
    });

    // Listen for sort changes
    window.addEventListener('sort-changed', (e) => {
      this.applySorting();
      this.render();
    });

    // Listen for filter changes
    window.addEventListener('filter-changed', () => {
      this.loadFolder(this.currentPath);
    });

    // Listen for content refresh
    window.addEventListener('refresh-contents', () => {
      this.loadFolder(this.currentPath);
    });

    // Initial load
    this.loadFolder('/');
  }

  getOnlineImageUrl(filename, width = 400, height = 400) {
    const seed = filename.replace(/[^a-zA-Z0-9]/g, '');
    if (!this.imageCache[filename]) {
      this.imageCache[filename] = `https://picsum.photos/seed/${seed}/${width}/${height}`;
    }
    return this.imageCache[filename];
  }

  loadFolder(path) {
    if (!window.SimulationAPI) {
      console.error('SimulationAPI not found');
      return;
    }

    this.currentPath = path;
    if (window.AppState) {
      window.AppState.deselectAll();
    }
    const filters = window.AppState ? window.AppState.filters : {};
    const result = SimulationAPI.getFolderContents(path, filters);
    
    if (result.error) {
      console.error('Error loading folder:', result.error);
      this.files = [];
    } else {
      this.files = result.items.map(item => {
        if (item.type === 'image') {
          return {
            ...item,
            url: this.getOnlineImageUrl(item.name, item.w || 400, item.h || 400)
          };
        }
        return item;
      });
      this.applySorting();
    }

    // Update directory bar
    window.dispatchEvent(new CustomEvent('path-changed', {
      detail: { path: path, name: result.name || path, itemCount: this.files.length }
    }));

    this.render();
  }

  connectedCallback() {
    this.render();
    this.shadowRoot.append(this.styleEl, this.linkEl, this.container);
  }

  createCard(file, extraClasses = '') {
    const card = document.createElement('file-card');
    card.setAttribute('name', file.name);
    card.setAttribute('icon', file.icon);
    card.setAttribute('data-path', file.path);
    card.setAttribute('data-type', file.type);
    if (file.url) card.setAttribute('thumbnail', file.url);
    if (file.w) card.setAttribute('data-w', file.w);
    if (file.h) card.setAttribute('data-h', file.h);
    if (extraClasses) card.classList.add(...extraClasses.split(' '));
    
    // Selection state
    if (window.AppState && window.AppState.isSelected(file.path)) {
      card.setAttribute('selected', '');
    }
    
    // Single click: select item
    card.addEventListener('click', (e) => {
      if (e.ctrlKey || e.metaKey) {
        // Ctrl/Cmd+Click: toggle selection
        if (window.AppState) {
          window.AppState.toggleSelection(file);
          this.updateCardSelections();
        }
      } else if (e.shiftKey && window.AppState && window.AppState.selectedItems.length > 0) {
        // Shift+Click: range selection
        this.handleRangeSelect(file);
      } else {
        // Normal click: select only this item (no navigation)
        if (window.AppState) {
          window.AppState.deselectAll();
          window.AppState.selectItem(file);
          this.updateCardSelections();
        }
      }
    });

    // Double click: navigate into folder or open file
    card.addEventListener('dblclick', (e) => {
      e.stopPropagation();
      if (file.type === 'folder') {
        window.dispatchEvent(new CustomEvent('navigate-to-path', {
          detail: { path: file.path }
        }));
      }
    });
    
    return card;
  }

  handleRangeSelect(targetFile) {
    if (!window.AppState) return;
    const startPath = window.AppState.selectedItems[window.AppState.selectedItems.length - 1]?.path;
    if (!startPath) {
      window.AppState.selectItem(targetFile);
      this.updateCardSelections();
      return;
    }
    
    const startIndex = this.files.findIndex(f => f.path === startPath);
    const endIndex = this.files.findIndex(f => f.path === targetFile.path);
    if (startIndex === -1 || endIndex === -1) return;
    
    const from = Math.min(startIndex, endIndex);
    const to = Math.max(startIndex, endIndex);
    
    window.AppState.deselectAll();
    for (let i = from; i <= to; i++) {
      window.AppState.selectItem(this.files[i]);
    }
    this.updateCardSelections();
  }

  updateCardSelections() {
    const cards = this.container.querySelectorAll('file-card');
    cards.forEach(card => {
      const path = card.getAttribute('data-path');
      if (window.AppState && window.AppState.isSelected(path)) {
        card.setAttribute('selected', '');
      } else {
        card.removeAttribute('selected');
      }
    });
  }

  applySorting() {
    if (!window.AppState) return;
    const by = window.AppState.currentSort;
    const dir = window.AppState.sortDirection === 'asc' ? 1 : -1;
    
    this.files.sort((a, b) => {
      // Always keep folders first
      if (a.type === 'folder' && b.type !== 'folder') return -1;
      if (a.type !== 'folder' && b.type === 'folder') return 1;
      
      switch (by) {
        case 'name':
          return dir * a.name.localeCompare(b.name);
        case 'date':
          const dateA = a.modified ? new Date(a.modified).getTime() : 0;
          const dateB = b.modified ? new Date(b.modified).getTime() : 0;
          return dir * (dateA - dateB);
        case 'size':
          return dir * ((a.size || 0) - (b.size || 0));
        case 'type':
          return dir * a.type.localeCompare(b.type);
        default:
          return dir * a.name.localeCompare(b.name);
      }
    });
  }

  render() {
    this.container.innerHTML = '';
    let css = '';

    // Calculate zoom level (default 100%)
    const zoomLevel = this.zoomLevel || 100;
    const baseCardSize = 100;
    const cardSize = Math.round(baseCardSize * (zoomLevel / 100));
    const minCardSize = 50;
    const maxCardSize = 150;
    const clampedCardSize = Math.max(minCardSize, Math.min(maxCardSize, cardSize));

    // Apply app scale to all sizes
    const scale = this.appScale / 100;
    const scaledGridGap = Math.round(this.gridGap * scale);
    const scaledFontSize = Math.round(this.fontSize * scale);
    const scaledIconSize = Math.round(this.iconSize * scale);

    const hostStyle = `
      :host {
        display: block;
        height: 100%;
        overflow: hidden;
      }
    `;

    if (this.currentMode === 'masonry') {
      // --- MASONRY MODE ---
      const masonryMinWidth = Math.round(250 * (zoomLevel / 100) * scale);
      const masonryRowHeight = Math.round(200 * (zoomLevel / 100) * scale);
      css = `
        ${hostStyle}
        .folder-contents {
          display: grid; grid-gap: ${scaledGridGap}px;
          grid-template-columns: repeat(auto-fit, minmax(${masonryMinWidth}px, 1fr));
          grid-auto-rows: ${masonryRowHeight}px; grid-auto-flow: dense;
          overflow-y: auto; padding: ${Math.round(5 * scale)}px; height: 100%;
        }
        .wide { grid-column: span 2; } .tall { grid-row: span 2; } .big { grid-column: span 2; grid-row: span 2; }
        file-card { width: 100% !important; height: 100% !important; border-radius: ${Math.round(5 * scale)}px; padding: 0 !important; border: none !important; }
        file-card .name, file-card .thumbnail-wrapper { display: none !important; }
        .file-card.is-visual { background-size: cover !important; background-position: center !important; }
      `;
      
      const visualFiles = this.files.filter(f => f.type === 'image' || f.type === 'video');
      visualFiles.forEach(file => {
        const ratio = file.w / file.h;
        let extraClass = '';
        if (ratio > 1.5) extraClass = 'wide';
        else if (ratio < 0.75) extraClass = 'tall';
        this.container.appendChild(this.createCard(file, extraClass));
      });

    } else if (this.currentMode === 'file-types') {
      // --- FILE TYPES MODE ---
      const visualsMinWidth = Math.round(180 * (zoomLevel / 100) * scale);
      const visualsRowHeight = Math.round(180 * (zoomLevel / 100) * scale);
      css = `
        ${hostStyle}
        .folder-contents {
          display: flex; flex-direction: column; gap: ${Math.round(24 * scale)}px;
          overflow-y: auto; padding: ${Math.round(16 * scale)}px; height: 100%;
        }
        .type-group { display: flex; flex-direction: column; gap: ${Math.round(12 * scale)}px; flex-shrink: 0; }
        .group-header {
          font-size: ${Math.round(14 * scale)}px; font-weight: 700; text-transform: uppercase;
          color: var(--text-color); padding-bottom: ${Math.round(4 * scale)}px; border-bottom: 1px solid var(--border-color);
        }

        /* 1. Visual Media Grid (Masonry) */
        .visuals-grid {
          display: grid;
          grid-gap: ${scaledGridGap}px;
          grid-template-columns: repeat(auto-fit, minmax(${visualsMinWidth}px, 1fr));
          grid-auto-rows: ${visualsRowHeight}px;
          grid-auto-flow: dense;
          padding: ${Math.round(5 * scale)}px;
        }
        .visuals-grid .wide { grid-column: span 2; }
        .visuals-grid .tall { grid-row: span 2; }
        .visuals-grid file-card {
          width: 100% !important; height: 100% !important; padding: 0 !important;
          border: none !important; border-radius: ${Math.round(5 * scale)}px;
        }
        .visuals-grid file-card .name, .visuals-grid file-card .thumbnail-wrapper { display: none !important; }
        .visuals-grid .file-card.is-visual { background-size: cover !important; background-position: center !important; }

        /* 2. Documents Grid (Standard) */
        .documents-grid {
          display: grid; grid-template-columns: repeat(auto-fill, minmax(${clampedCardSize}px, 1fr)); gap: ${scaledGridGap}px;
        }
        .documents-grid file-card {
          width: ${clampedCardSize}px !important; height: ${clampedCardSize}px !important; aspect-ratio: 1;
        }
      `;

      const visualFiles = this.files.filter(f => f.type === 'image' || f.type === 'video');
      const generalFiles = this.files.filter(f => f.type !== 'image' && f.type !== 'video');

      const visualsGroup = document.createElement('div');
      visualsGroup.className = 'type-group';
      visualsGroup.innerHTML = `<div class="group-header">Visual Media</div>`;
      const vGrid = document.createElement('div');
      vGrid.className = 'visuals-grid';
      
      visualFiles.forEach(file => {
        const ratio = file.w / file.h;
        let extraClass = '';
        if (ratio > 1.5) extraClass = 'wide';
        else if (ratio < 0.75) extraClass = 'tall';
        vGrid.appendChild(this.createCard(file, extraClass));
      });
      visualsGroup.appendChild(vGrid);

      const generalGroup = document.createElement('div');
      generalGroup.className = 'type-group';
      generalGroup.innerHTML = `<div class="group-header">Documents & Others</div>`;
      const gGrid = document.createElement('div');
      gGrid.className = 'documents-grid';
      generalFiles.forEach(f => gGrid.appendChild(this.createCard(f)));
      generalGroup.appendChild(gGrid);

      this.container.appendChild(visualsGroup);
      this.container.appendChild(generalGroup);

    } else {
      // --- GENERAL MODE ---
      css = `
        ${hostStyle}
        .folder-contents {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(${clampedCardSize}px, 1fr));
          grid-auto-rows: ${clampedCardSize}px;
          gap: ${scaledGridGap}px; overflow-y: auto; padding: ${Math.round(8 * scale)}px;
          height: 100%;
          box-sizing: border-box;
        }
        file-card { width: 100% !important; height: 100% !important; aspect-ratio: 1; }
        @media (max-width: 768px) {
          .folder-contents { grid-template-columns: repeat(auto-fill, minmax(${Math.max(50, Math.round(clampedCardSize * 0.8))}px, 1fr)); grid-auto-rows: ${Math.max(50, Math.round(clampedCardSize * 0.8))}px; gap: ${Math.round(12 * scale)}px; }
          file-card { width: 100% !important; height: 100% !important; }
        }
      `;
      this.files.forEach(file => {
        this.container.appendChild(this.createCard(file));
      });
    }

    this.styleEl.textContent = css;
  }
}

customElements.define('folder-contents', FolderContents);
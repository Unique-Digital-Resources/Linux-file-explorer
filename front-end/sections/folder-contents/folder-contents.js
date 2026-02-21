import './file-card.js';

class FolderContents extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.currentMode = 'general';
    this.container = document.createElement('div');
    this.container.setAttribute('class', 'folder-contents');
    
    // Settings state
    this.gridGap = 16;
    this.fontSize = 13;
    this.iconSize = 16;
    this.appScale = 100;

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
  }

  connectedCallback() {
    this.render();
    this.shadowRoot.append(this.styleEl, this.linkEl, this.container);
    
    // Watch for slot changes
    const slot = this.querySelector('[slot="files"]');
    if (slot) {
      const observer = new MutationObserver(() => this.render());
      observer.observe(this, { childList: true, subtree: true });
    }
  }

  // Get file data from slotted file-card elements
  getFilesFromSlot() {
    const fileCards = this.querySelectorAll('file-card[slot="files"]');
    return Array.from(fileCards).map(card => ({
      name: card.getAttribute('name') || 'Unknown',
      icon: card.getAttribute('icon') || 'mdi-file',
      type: card.getAttribute('type') || 'general',
      url: card.getAttribute('thumbnail') || null,
      w: parseInt(card.getAttribute('width')) || 100,
      h: parseInt(card.getAttribute('height')) || 100
    }));
  }

  createCard(file, extraClasses = '') {
    const card = document.createElement('file-card');
    card.setAttribute('name', file.name);
    card.setAttribute('icon', file.icon);
    if (file.url) card.setAttribute('thumbnail', file.url);
    if (extraClasses) card.classList.add(...extraClasses.split(' '));
    return card;
  }

  render() {
    this.container.innerHTML = '';
    let css = '';

    // Get files from slot or use empty array
    const files = this.getFilesFromSlot();
    
    // If no files in slot, check for light DOM content
    if (files.length === 0) {
      // Try to get files from light DOM file-card elements
      const lightDomFiles = this.querySelectorAll('file-card');
      if (lightDomFiles.length > 0) {
        lightDomFiles.forEach(card => {
          files.push({
            name: card.getAttribute('name') || 'Unknown',
            icon: card.getAttribute('icon') || 'mdi-file',
            type: card.getAttribute('type') || 'general',
            url: card.getAttribute('thumbnail') || null,
            w: parseInt(card.getAttribute('width')) || 100,
            h: parseInt(card.getAttribute('height')) || 100
          });
        });
      }
    }

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
      
      const visualFiles = files.filter(f => f.type === 'image' || f.type === 'video');
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

      const visualFiles = files.filter(f => f.type === 'image' || f.type === 'video');
      const generalFiles = files.filter(f => f.type !== 'image' && f.type !== 'video');

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
      files.forEach(file => {
        this.container.appendChild(this.createCard(file));
      });
    }

    this.styleEl.textContent = css;
  }
}

customElements.define('folder-contents', FolderContents);

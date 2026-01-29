import './file-card.js';

class FolderContents extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.currentMode = 'general';
    this.container = document.createElement('div');
    this.container.setAttribute('class', 'folder-contents');
    
    // Mock Data
    this.files = [
      { name: "ProjectX", icon: "mdi-folder", type: "folder" },
      { name: "Lake View", icon: "mdi-image", type: "image", w: 600, h: 400, url: "https://picsum.photos/seed/lake/600/400" },
      { name: "City Tower", icon: "mdi-image", type: "image", w: 400, h: 600, url: "https://picsum.photos/seed/city/400/600" },
      { name: "Clip 01", icon: "mdi-video", type: "video", w: 640, h: 360, url: "https://picsum.photos/seed/video1/640/360" },
      { name: "script.py", icon: "mdi-language-python", type: "general" },
      { name: "data.xlsx", icon: "mdi-microsoft-excel", type: "general" },
      { name: "Abstract", icon: "mdi-image", type: "image", w: 800, h: 800, url: "https://picsum.photos/seed/art/800/800" },
      { name: "Archive.zip", icon: "mdi-folder-zip", type: "general" },
      { name: "Panorama", icon: "mdi-image", type: "image", w: 800, h: 300, url: "https://picsum.photos/seed/pano/800/300" },
      { name: "report.docx", icon: "mdi-file-word-box", type: "general" },
      { name: "Portrait", icon: "mdi-image", type: "image", w: 300, h: 500, url: "https://picsum.photos/seed/person/300/500" },
    ];

    this.styleEl = document.createElement('style');
    this.linkEl = document.createElement('link');
    this.linkEl.setAttribute('rel', 'stylesheet');
    this.linkEl.setAttribute('href', '../../themes/default/folder-contents.css');

    window.addEventListener('change-view-mode', (e) => {
      this.currentMode = e.detail;
      this.render();
    });
  }

  connectedCallback() {
    this.render();
    this.shadowRoot.append(this.styleEl, this.linkEl, this.container);
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

    const hostStyle = `
      :host {
        display: block;
        height: 100%;
        overflow: hidden;
      }
    `;

    if (this.currentMode === 'masonry') {
      // --- MASONRY MODE ---
      css = `
        ${hostStyle}
        .folder-contents {
          display: grid; grid-gap: 10px;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          grid-auto-rows: 200px; grid-auto-flow: dense;
          overflow-y: auto; padding: 5px; height: 100%; /* Requested padding 5px */
        }
        .wide { grid-column: span 2; } .tall { grid-row: span 2; } .big { grid-column: span 2; grid-row: span 2; }
        file-card { width: 100% !important; height: 100% !important; border-radius: 5px; padding: 0 !important; border: none !important; }
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
      css = `
        ${hostStyle}
        .folder-contents {
          display: flex; flex-direction: column; gap: 24px;
          overflow-y: auto; padding: 16px; height: 100%;
        }
        .type-group { display: flex; flex-direction: column; gap: 12px; flex-shrink: 0; }
        .group-header {
          font-size: 14px; font-weight: 700; text-transform: uppercase;
          color: var(--text-color); padding-bottom: 4px; border-bottom: 1px solid var(--border-color);
        }

        /* 1. Visual Media Grid (Masonry) */
        .visuals-grid {
          display: grid;
          grid-gap: 10px;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          grid-auto-rows: 180px;
          grid-auto-flow: dense;
          padding: 5px; /* Requested padding 5px */
        }
        .visuals-grid .wide { grid-column: span 2; }
        .visuals-grid .tall { grid-row: span 2; }
        .visuals-grid file-card {
          width: 100% !important; height: 100% !important; padding: 0 !important;
          border: none !important; border-radius: 5px;
        }
        .visuals-grid file-card .name, .visuals-grid file-card .thumbnail-wrapper { display: none !important; }
        .visuals-grid .file-card.is-visual { background-size: cover !important; background-position: center !important; }

        /* 2. Documents Grid (Standard) */
        .documents-grid {
          display: grid; grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)); gap: 16px;
        }
        .documents-grid file-card {
          width: 100px !important; height: 100px !important; aspect-ratio: 1;
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
          grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
          /* Reverted to requested line */
          grid-template-rows: repeat(auto-fill, minmax(100px, 1fr));
          gap: 16px; overflow-y: auto; padding: 8px;
          height: 100%;
          box-sizing: border-box;
        }
        file-card { width: 100px !important; height: 100px !important; aspect-ratio: 1; }
        @media (max-width: 768px) {
          .folder-contents { grid-template-columns: repeat(auto-fill, minmax(80px, 1fr)); gap: 12px; }
          file-card { width: 80px !important; height: 80px !important; }
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
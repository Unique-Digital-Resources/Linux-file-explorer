class DirectoriesPanel extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.directories = [];
  
      this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@mdi/font@7.4.47/css/materialdesignicons.min.css">
        <link rel="stylesheet" href="../../themes/default/directories-panel.css">
        <div class="directories-panel-wrapper">
          <div class="custom-scrollbar-track" id="scrollbar-track">
            <div class="scrollbar-thumb" id="scrollbar-thumb"></div>
          </div>
          <div class="directories-panel" id="directories-container">
            <!-- Dynamic content loaded here -->
          </div>
        </div>
      `;
    }

    connectedCallback() {
      this.loadDirectories();
      this.initScrollbar();
      this.initSelection();

      window.addEventListener('path-changed', (e) => {
        const path = e.detail?.path;
        if (path) {
          this.highlightCurrentDirectory(path);
        }
      });
    }

    loadDirectories() {
      if (!window.SimulationAPI) {
        console.error('SimulationAPI not found');
        return;
      }

      const mainDirs = SimulationAPI.getMainDirectories();
      this.directories = mainDirs;

      const container = this.shadowRoot.getElementById('directories-container');
      
      const iconMap = {
        'Desktop': 'mdi-desktop-mac',
        'Downloads': 'mdi-download',
        'Documents': 'mdi-file-document',
        'Images': 'mdi-image',
        'Sounds': 'mdi-music',
        'Videos': 'mdi-video',
        'Network': 'mdi-network'
      };

      const dirItems = mainDirs.map(dir => {
        const icon = iconMap[dir.name] || 'mdi-folder';
        return `
          <div class="menu-panel-item" data-path="${dir.path}">
            <i class="mdi ${icon} menu-panel-item-icon"></i>
            <span class="menu-panel-item-label">${dir.name}</span>
          </div>
        `;
      }).join('');

      // Load drives from simulation
      const drives = window.SimulationAPI?.getDrives?.() || [];
      const driveItems = drives.map(d => {
        const percent = Math.round((d.used / d.total) * 100);
        return `
          <div class="driver vertical" data-path="${d.path}">
            <i class="mdi ${d.icon}"></i>
            <span>${d.name} (${percent}%)</span>
          </div>
        `;
      }).join('');

      // Load clouds from simulation
      const clouds = window.SimulationAPI?.getClouds?.() || [];
      const cloudItems = clouds.map(c => {
        const percent = Math.round((c.used / c.total) * 100);
        return `
          <div class="cloud-item" data-path="${c.path}">
            <i class="mdi ${c.icon} menu-panel-item-icon"></i>
            <span class="menu-panel-item-label">${c.name}</span>
            <div class="progress"><div class="progress-bar" style="width: ${percent}%;"></div></div>
          </div>
        `;
      }).join('');

      container.innerHTML = `
        <div class="card main-dicts menu-panel">
          <details open>
            <summary class="menu-panel-header">
              <i class="mdi mdi-chevron-right menu-panel-chevron"></i>
              <i class="mdi mdi-folder-multiple menu-panel-icon"></i>
              <span class="menu-panel-title">Main Directories</span>
            </summary>
            <div class="menu-panel-body">
              ${dirItems}
            </div>
          </details>
        </div>
        
        <div class="card favorites-dicts menu-panel">
          <details open>
            <summary class="menu-panel-header">
              <i class="mdi mdi-chevron-right menu-panel-chevron"></i>
              <i class="mdi mdi-star menu-panel-icon"></i>
              <span class="menu-panel-title">Favorites</span>
            </summary>
            <div class="menu-panel-body">
              <div class="menu-panel-item" data-path="/C:/home/Desktop">
                <i class="mdi mdi-folder-star menu-panel-item-icon"></i>
                <span class="menu-panel-item-label">Desktop</span>
              </div>
              <div class="menu-panel-item" data-path="/C:/home/Documents">
                <i class="mdi mdi-folder-star menu-panel-item-icon"></i>
                <span class="menu-panel-item-label">Documents</span>
              </div>
              <div class="menu-panel-item" data-path="/C:/home/Downloads">
                <i class="mdi mdi-folder-star menu-panel-item-icon"></i>
                <span class="menu-panel-item-label">Downloads</span>
              </div>
            </div>
          </details>
        </div>
        
        <div class="card drivers-card menu-panel">
          <div class="menu-panel-header">
            <i class="mdi mdi-harddisk menu-panel-icon"></i>
            <span class="menu-panel-title">Storage Drives</span>
          </div>
          <div class="menu-panel-body">
            <div class="drivers-treemap">
              ${driveItems}
            </div>
          </div>
        </div>
        
        <div class="card cloud-card menu-panel">
          <div class="menu-panel-header">
            <i class="mdi mdi-cloud menu-panel-icon"></i>
            <span class="menu-panel-title">Cloud Storage</span>
          </div>
          <div class="menu-panel-body">
            ${cloudItems}
          </div>
        </div>
      `;
    }

    highlightCurrentDirectory(path) {
      const items = this.shadowRoot.querySelectorAll('.menu-panel-item, .driver, .cloud-item');
      
      items.forEach(item => {
        if (item.dataset.path === path) {
          item.classList.add('selected');
        } else {
          item.classList.remove('selected');
        }
      });
    }

    initSelection() {
      const items = this.shadowRoot.querySelectorAll('.menu-panel-item, .driver, .cloud-item');
      
      items.forEach(item => {
        item.addEventListener('click', () => {
          // Dispatch custom event with path
          const path = item.dataset.path;
          if (path && path.startsWith('/')) {
            window.dispatchEvent(new CustomEvent('navigate-to-path', {
              detail: { path },
              bubbles: true,
              composed: true
            }));
          }
        });
      });
    }

    initScrollbar() {
      const container = this.shadowRoot.querySelector('.directories-panel');
      const track = this.shadowRoot.getElementById('scrollbar-track');
      const thumb = this.shadowRoot.getElementById('scrollbar-thumb');
      
      let isDragging = false;
      let startMouseY = 0;
      let startScrollTop = 0;

      const updateScrollbar = () => {
        const clientHeight = container.clientHeight;
        const scrollHeight = container.scrollHeight;
        const scrollTop = container.scrollTop;

        if (scrollHeight <= clientHeight) {
          track.style.display = 'none';
          return;
        }
        track.style.display = 'block';

        // Calculate thumb height
        const thumbHeight = Math.max((clientHeight / scrollHeight) * clientHeight, 40);
        thumb.style.height = `${thumbHeight}px`;

        // Map scroll position to thumb position
        const maxScroll = scrollHeight - clientHeight;
        const maxThumbTravel = clientHeight - thumbHeight;
        const scrollPercent = scrollTop / maxScroll;
        const thumbPos = scrollPercent * maxThumbTravel;

        thumb.style.transform = `translateY(${thumbPos}px)`;
      };

      // Dragging Logic
      thumb.onmousedown = (e) => {
        isDragging = true;
        startMouseY = e.clientY;
        startScrollTop = container.scrollTop;
        
        track.classList.add('dragging');
        document.body.style.userSelect = 'none';
        document.body.style.cursor = 'grabbing';
        e.preventDefault();
      };

      window.onmousemove = (e) => {
        if (!isDragging) return;

        const deltaY = e.clientY - startMouseY;
        const clientHeight = container.clientHeight;
        const scrollHeight = container.scrollHeight;
        const thumbHeight = thumb.offsetHeight;

        const maxScroll = scrollHeight - clientHeight;
        const maxThumbTravel = clientHeight - thumbHeight;
        
        // The ratio: how many content pixels per 1 thumb pixel
        const ratio = maxScroll / maxThumbTravel;

        // Update container scroll
        container.scrollTop = startScrollTop + (deltaY * ratio);
      };

      window.onmouseup = () => {
        if (isDragging) {
          isDragging = false;
          track.classList.remove('dragging');
          document.body.style.userSelect = '';
          document.body.style.cursor = '';
        }
      };

      // Sync on natural scrolling
      container.onscroll = updateScrollbar;
      window.onresize = updateScrollbar;

      // Initial update
      updateScrollbar();
    }
  }
  
  customElements.define('directories-panel', DirectoriesPanel);

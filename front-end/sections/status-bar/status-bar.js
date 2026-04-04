class StatusBar extends HTMLElement {
    constructor() {
      super();
      const shadow = this.attachShadow({ mode: 'open' });
  
      const wrapper = document.createElement('div');
      wrapper.className = 'status-bar';
  
      // Status Group
      const statusGroup = document.createElement('div');
      statusGroup.className = 'status-group';
      statusGroup.id = 'status-group';
      statusGroup.innerHTML = `
        <i class="mdi mdi-file-multiple"></i>
        <span id="item-count">Loading...</span>
      `;
  
      // Settings Group
      const settingsGroup = document.createElement('div');
      settingsGroup.className = 'settings-group';
      settingsGroup.innerHTML = `
        <div class="theme-switcher" title="Toggle Theme">
          <i class="mdi mdi-theme-light-dark"></i>
        </div>
        <div class="settings" title="Quick Settings">
          <i class="mdi mdi-cog"></i>
        </div>
        <span class="divider">|</span>
        <div class="zoom-controls">
          <i class="mdi mdi-magnify-minus" title="Zoom Out"></i>
          <input type="range" min="50" max="150" value="100" title="Zoom Level">
          <i class="mdi mdi-magnify-plus" title="Zoom In"></i>
        </div>
      `;

      // Quick Settings Drop-up Box
      const quickSettings = document.createElement('div');
      quickSettings.className = 'quick-settings';
      quickSettings.innerHTML = `
        <div class="quick-settings-header">
          <span>Quick Settings</span>
          <i class="mdi mdi-close close-btn"></i>
        </div>
        <div class="quick-settings-content">
          <div class="setting-item">
            <label class="setting-label">
              <i class="mdi mdi-grid"></i>
              <span>Grid Gap</span>
            </label>
            <div class="setting-control">
              <input type="range" id="grid-gap" min="4" max="32" value="16" step="2">
              <span class="setting-value">16px</span>
            </div>
          </div>
          <div class="setting-item">
            <label class="setting-label">
              <i class="mdi mdi-format-size"></i>
              <span>Font Size</span>
            </label>
            <div class="setting-control">
              <input type="range" id="font-size" min="10" max="20" value="13" step="1">
              <span class="setting-value">13px</span>
            </div>
          </div>
          <div class="setting-item">
            <label class="setting-label">
              <i class="mdi mdi-arrow-expand"></i>
              <span>Icon Size</span>
            </label>
            <div class="setting-control">
              <input type="range" id="icon-size" min="12" max="24" value="16" step="1">
              <span class="setting-value">16px</span>
            </div>
          </div>
          <div class="setting-item">
            <label class="setting-label">
              <i class="mdi mdi-human"></i>
              <span>App Scale</span>
            </label>
            <div class="setting-control">
              <input type="range" id="app-scale" min="80" max="130" value="100" step="5">
              <span class="setting-value">100%</span>
            </div>
          </div>
        </div>
      `;
  
      // Theme switcher event
      settingsGroup.querySelector('.theme-switcher').addEventListener('click', () => {
        document.body.classList.toggle('dark');
      });

      // Settings button event - toggle quick settings
      const settingsBtn = settingsGroup.querySelector('.settings');
      settingsBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        quickSettings.classList.toggle('visible');
        settingsBtn.classList.toggle('active');
      });

      // Close quick settings when clicking outside
      document.addEventListener('click', (e) => {
        if (!quickSettings.contains(e.target) && !settingsBtn.contains(e.target)) {
          quickSettings.classList.remove('visible');
          settingsBtn.classList.remove('active');
        }
      });

      // Close button in quick settings
      quickSettings.querySelector('.close-btn').addEventListener('click', () => {
        quickSettings.classList.remove('visible');
        settingsBtn.classList.remove('active');
      });

      // Grid gap control
      const gridGapInput = quickSettings.querySelector('#grid-gap');
      const gridGapValue = quickSettings.querySelector('#grid-gap + .setting-value');
      gridGapInput.addEventListener('input', (e) => {
        const value = e.target.value;
        gridGapValue.textContent = value + 'px';
        const event = new CustomEvent('grid-gap-changed', {
          detail: parseInt(value),
          bubbles: true,
          composed: true
        });
        this.dispatchEvent(event);
      });

      // Font size control
      const fontSizeInput = quickSettings.querySelector('#font-size');
      const fontSizeValue = quickSettings.querySelector('#font-size + .setting-value');
      fontSizeInput.addEventListener('input', (e) => {
        const value = e.target.value;
        fontSizeValue.textContent = value + 'px';
        const event = new CustomEvent('font-size-changed', {
          detail: parseInt(value),
          bubbles: true,
          composed: true
        });
        this.dispatchEvent(event);
      });

      // Icon size control
      const iconSizeInput = quickSettings.querySelector('#icon-size');
      const iconSizeValue = quickSettings.querySelector('#icon-size + .setting-value');
      iconSizeInput.addEventListener('input', (e) => {
        const value = e.target.value;
        iconSizeValue.textContent = value + 'px';
        const event = new CustomEvent('icon-size-changed', {
          detail: parseInt(value),
          bubbles: true,
          composed: true
        });
        this.dispatchEvent(event);
      });

      // App scale control
      const appScaleInput = quickSettings.querySelector('#app-scale');
      const appScaleValue = quickSettings.querySelector('#app-scale + .setting-value');
      appScaleInput.addEventListener('input', (e) => {
        const value = e.target.value;
        appScaleValue.textContent = value + '%';
        // Update CSS variable for app scale
        document.documentElement.style.setProperty('--app-scale', value / 100);
        const event = new CustomEvent('app-scale-changed', {
          detail: parseInt(value),
          bubbles: true,
          composed: true
        });
        this.dispatchEvent(event);
      });
  
      // Zoom control event
      const zoomRange = settingsGroup.querySelector('.zoom-controls input[type="range"]');
      zoomRange.addEventListener('input', (e) => {
        const zoomLevel = parseInt(e.target.value);
        const event = new CustomEvent('zoom-level-changed', {
          detail: zoomLevel,
          bubbles: true,
          composed: true
        });
        this.dispatchEvent(event);
      });

      // Listen for font size changes to update status bar
      window.addEventListener('font-size-changed', (e) => {
        const fontSize = e.detail;
        statusGroup.style.fontSize = `${fontSize}px`;
      });

      // Listen for icon size changes to update status bar
      window.addEventListener('icon-size-changed', (e) => {
        const iconSize = e.detail;
        const icons = wrapper.querySelectorAll('i');
        icons.forEach(icon => {
          icon.style.fontSize = `${iconSize}px`;
        });
      });

      // Listen for path changes to update item count
      window.addEventListener('path-changed', (e) => {
        if (window.AppState) window.AppState.currentPath = e.detail.path;
        const itemCountEl = wrapper.querySelector('#item-count');
        if (itemCountEl && window.SimulationAPI) {
          const result = SimulationAPI.getFolderContents(e.detail.path);
          if (!result.error) {
            const count = result.items.length;
            const folders = result.items.filter(i => i.type === 'folder').length;
            const files = count - folders;
            let text = '';
            if (folders > 0 && files > 0) {
              text = `${folders} folder${folders !== 1 ? 's' : ''}, ${files} file${files !== 1 ? 's' : ''}`;
            } else if (folders > 0) {
              text = `${folders} folder${folders !== 1 ? 's' : ''}`;
            } else {
              text = `${files} file${files !== 1 ? 's' : ''}`;
            }
            itemCountEl.textContent = text || '0 items';
          }
        }
      });

      // Listen for selection changes to update item count
      window.addEventListener('selection-changed', (e) => {
        const itemCountEl = wrapper.querySelector('#item-count');
        if (itemCountEl) {
          const count = e.detail.count;
          if (count > 0) {
            itemCountEl.textContent = `${count} item${count !== 1 ? 's' : ''} selected`;
          } else {
            // Restore normal count from path-changed
            // Re-trigger path-changed to restore folder count
            if (window.AppState && window.AppState.currentPath) {
              const result = window.SimulationAPI.getFolderContents(window.AppState.currentPath);
              if (!result.error) {
                const total = result.items.length;
                const folders = result.items.filter(i => i.type === 'folder').length;
                const files = total - folders;
                let text = '';
                if (folders > 0 && files > 0) {
                  text = `${folders} folder${folders !== 1 ? 's' : ''}, ${files} file${files !== 1 ? 's' : ''}`;
                } else if (folders > 0) {
                  text = `${folders} folder${folders !== 1 ? 's' : ''}`;
                } else {
                  text = `${files} file${files !== 1 ? 's' : ''}`;
                }
                itemCountEl.textContent = text || '0 items';
              }
            }
          }
        }
      });

      // Layout styles
      const style = document.createElement('style');
      style.textContent = `
        :host {
          display: block;
          box-sizing: border-box;
        }
        .status-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 16px;
          margin: 16px -16px -16px -16px;
          box-sizing: border-box;
          position: relative;
        }
        * {
          box-sizing: border-box;
        }
      `;
  
      // Link to external stylesheet
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = '/themes/default/status-bar.css';
  
      // Append elements
      shadow.appendChild(link);
      shadow.appendChild(style);
      wrapper.appendChild(statusGroup);
      wrapper.appendChild(settingsGroup);
      wrapper.appendChild(quickSettings);
      shadow.appendChild(wrapper);
    }
  }
  
  customElements.define('status-bar', StatusBar);
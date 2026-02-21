class SettingsPanel extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.isOpen = false;
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          position: fixed;
          top: 0;
          left: 0;
          z-index: 1000;
          pointer-events: none;
        }

        .overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0, 0, 0.5);
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.3s ease, visibility 0.3s ease;
          pointer-events: auto;
        }

        .overlay.active {
          opacity: 1;
          visibility: visible;
        }

        .settings-panel {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) scale(0.9);
          width: 400px;
          max-width: 90vw;
          max-height: 80vh;
          background: var(--card-bg, #ffffff);
          border-radius: 12px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.3s ease, visibility 0.3s ease, transform 0.3s ease;
          pointer-events: auto;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        .settings-panel.active {
          opacity: 1;
          visibility: visible;
          transform: translate(-50%, -50%) scale(1);
        }

        .settings-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 24px;
          border-bottom: 1px solid var(--border-color, #dee2e6);
        }

        .settings-header h2 {
          margin: 0;
          font-size: 18px;
          font-weight: 600;
          color: var(--text-color, #212529);
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .settings-header h2 i {
          font-size: 20px;
        }

        .close-btn {
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px;
          border-radius: 4px;
          color: var(--text-color, #212529);
          transition: background 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .close-btn:hover {
          background: var(--hover-bg, #e9ecef);
        }

        .close-btn i {
          font-size: 20px;
        }

        .settings-content {
          flex: 1;
          overflow-y: auto;
          padding: 24px;
        }

        .settings-section {
          margin-bottom: 24px;
        }

        .settings-section:last-child {
          margin-bottom: 0;
        }

        .settings-section h3 {
          margin: 0 0 16px 0;
          font-size: 14px;
          font-weight: 600;
          color: var(--text-color, #212529);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .setting-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 0;
          border-bottom: 1px solid var(--border-color, #dee2e6);
        }

        .setting-item:last-child {
          border-bottom: none;
        }

        .setting-label {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .setting-label .label-text {
          font-size: 14px;
          font-weight: 500;
          color: var(--text-color, #212529);
        }

        .setting-label .label-description {
          font-size: 12px;
          color: var(--text-color, #212529);
          opacity: 0.7;
        }

        /* Toggle Switch */
        .toggle-switch {
          position: relative;
          width: 44px;
          height: 24px;
        }

        .toggle-switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }

        .toggle-slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: var(--border-color, #dee2e6);
          transition: 0.3s;
          border-radius: 24px;
        }

        .toggle-slider:before {
          position: absolute;
          content: "";
          height: 18px;
          width: 18px;
          left: 3px;
          bottom: 3px;
          background-color: white;
          transition: 0.3s;
          border-radius: 50%;
        }

        .toggle-switch input:checked + .toggle-slider {
          background-color: var(--accent-color, #0d6efd);
        }

        .toggle-switch input:checked + .toggle-slider:before {
          transform: translateX(20px);
        }

        /* Select Dropdown */
        .setting-select {
          padding: 8px 12px;
          border: 1px solid var(--border-color, #dee2e6);
          border-radius: 6px;
          background: var(--card-bg, #ffffff);
          color: var(--text-color, #212529);
          font-size: 14px;
          cursor: pointer;
          transition: border-color 0.2s ease;
        }

        .setting-select:hover {
          border-color: var(--accent-color, #0d6efd);
        }

        .setting-select:focus {
          outline: none;
          border-color: var(--accent-color, #0d6efd);
        }

        /* Range Slider */
        .setting-range {
          width: 120px;
          cursor: pointer;
        }

        .setting-range::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: var(--accent-color, #0d6efd);
          cursor: pointer;
        }

        .setting-range::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: var(--accent-color, #0d6efd);
          cursor: pointer;
          border: none;
        }

        /* Dark mode support */
        :host-context(.dark) .settings-panel {
          background: var(--card-bg, #2d2d2d);
        }

        :host-context(.dark) .settings-header {
          border-bottom-color: var(--border-color, #404040);
        }

        :host-context(.dark) .setting-item {
          border-bottom-color: var(--border-color, #404040);
        }

        :host-context(.dark) .setting-select {
          background: var(--card-bg, #2d2d2d);
          border-color: var(--border-color, #404040);
        }

        /* Scrollbar styling */
        .settings-content::-webkit-scrollbar {
          width: 8px;
        }

        .settings-content::-webkit-scrollbar-track {
          background: var(--hover-bg, #e9ecef);
        }

        .settings-content::-webkit-scrollbar-thumb {
          background: var(--border-color, #dee2e6);
          border-radius: 4px;
        }

        .settings-content::-webkit-scrollbar-thumb:hover {
          background: var(--accent-color, #0d6efd);
        }
      </style>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@mdi/font@7.4.47/css/materialdesignicons.min.css">
      
      <div class="overlay" id="overlay"></div>
      <div class="settings-panel" id="settingsPanel">
        <div class="settings-header">
          <h2><i class="mdi mdi-cog"></i> Settings</h2>
          <button class="close-btn" id="closeBtn" title="Close Settings">
            <i class="mdi mdi-close"></i>
          </button>
        </div>
        <div class="settings-content">
          <!-- Appearance Section -->
          <div class="settings-section">
            <h3>Appearance</h3>
            
            <div class="setting-item">
              <div class="setting-label">
                <span class="label-text">Dark Mode</span>
                <span class="label-description">Toggle dark theme</span>
              </div>
              <label class="toggle-switch">
                <input type="checkbox" id="darkModeToggle">
                <span class="toggle-slider"></span>
              </label>
            </div>

            <div class="setting-item">
              <div class="setting-label">
                <span class="label-text">Default View</span>
                <span class="label-description">Default folder view mode</span>
              </div>
              <select class="setting-select" id="defaultViewSelect">
                <option value="general">General</option>
                <option value="masonry">Masonry</option>
                <option value="file-types">File Types</option>
              </select>
            </div>
          </div>

          <!-- Display Section -->
          <div class="settings-section">
            <h3>Display</h3>
            
            <div class="setting-item">
              <div class="setting-label">
                <span class="label-text">Show Hidden Files</span>
                <span class="label-description">Display hidden system files</span>
              </div>
              <label class="toggle-switch">
                <input type="checkbox" id="showHiddenToggle">
                <span class="toggle-slider"></span>
              </label>
            </div>

            <div class="setting-item">
              <div class="setting-label">
                <span class="label-text">Show File Extensions</span>
                <span class="label-description">Display file extensions</span>
              </div>
              <label class="toggle-switch">
                <input type="checkbox" id="showExtensionsToggle" checked>
                <span class="toggle-slider"></span>
              </label>
            </div>

            <div class="setting-item">
              <div class="setting-label">
                <span class="label-text">Grid Size</span>
                <span class="label-description">Adjust icon grid size</span>
              </div>
              <input type="range" class="setting-range" id="gridSizeRange" min="50" max="150" value="100">
            </div>
          </div>

          <!-- Behavior Section -->
          <div class="settings-section">
            <h3>Behavior</h3>
            
            <div class="setting-item">
              <div class="setting-label">
                <span class="label-text">Single Click to Open</span>
                <span class="label-description">Open files with single click</span>
              </div>
              <label class="toggle-switch">
                <input type="checkbox" id="singleClickToggle">
                <span class="toggle-slider"></span>
              </label>
            </div>

            <div class="setting-item">
              <div class="setting-label">
                <span class="label-text">Confirm Delete</span>
                <span class="label-description">Show confirmation before deleting</span>
              </div>
              <label class="toggle-switch">
                <input type="checkbox" id="confirmDeleteToggle" checked>
                <span class="toggle-slider"></span>
              </label>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  setupEventListeners() {
    const overlay = this.shadowRoot.getElementById('overlay');
    const closeBtn = this.shadowRoot.getElementById('closeBtn');
    const settingsPanel = this.shadowRoot.getElementById('settingsPanel');

    // Close on overlay click
    overlay.addEventListener('click', () => this.close());

    // Close on close button click
    closeBtn.addEventListener('click', () => this.close());

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.close();
      }
    });

    // Dark mode toggle
    const darkModeToggle = this.shadowRoot.getElementById('darkModeToggle');
    darkModeToggle.addEventListener('change', (e) => {
      if (e.target.checked) {
        document.body.classList.add('dark');
      } else {
        document.body.classList.remove('dark');
      }
      this.dispatchEvent(new CustomEvent('setting-changed', {
        detail: { key: 'darkMode', value: e.target.checked },
        bubbles: true,
        composed: true
      }));
    });

    // Default view select
    const defaultViewSelect = this.shadowRoot.getElementById('defaultViewSelect');
    defaultViewSelect.addEventListener('change', (e) => {
      this.dispatchEvent(new CustomEvent('setting-changed', {
        detail: { key: 'defaultView', value: e.target.value },
        bubbles: true,
        composed: true
      }));
    });

    // Show hidden files toggle
    const showHiddenToggle = this.shadowRoot.getElementById('showHiddenToggle');
    showHiddenToggle.addEventListener('change', (e) => {
      this.dispatchEvent(new CustomEvent('setting-changed', {
        detail: { key: 'showHidden', value: e.target.checked },
        bubbles: true,
        composed: true
      }));
    });

    // Show extensions toggle
    const showExtensionsToggle = this.shadowRoot.getElementById('showExtensionsToggle');
    showExtensionsToggle.addEventListener('change', (e) => {
      this.dispatchEvent(new CustomEvent('setting-changed', {
        detail: { key: 'showExtensions', value: e.target.checked },
        bubbles: true,
        composed: true
      }));
    });

    // Grid size range
    const gridSizeRange = this.shadowRoot.getElementById('gridSizeRange');
    gridSizeRange.addEventListener('input', (e) => {
      this.dispatchEvent(new CustomEvent('setting-changed', {
        detail: { key: 'gridSize', value: parseInt(e.target.value) },
        bubbles: true,
        composed: true
      }));
    });

    // Single click toggle
    const singleClickToggle = this.shadowRoot.getElementById('singleClickToggle');
    singleClickToggle.addEventListener('change', (e) => {
      this.dispatchEvent(new CustomEvent('setting-changed', {
        detail: { key: 'singleClick', value: e.target.checked },
        bubbles: true,
        composed: true
      }));
    });

    // Confirm delete toggle
    const confirmDeleteToggle = this.shadowRoot.getElementById('confirmDeleteToggle');
    confirmDeleteToggle.addEventListener('change', (e) => {
      this.dispatchEvent(new CustomEvent('setting-changed', {
        detail: { key: 'confirmDelete', value: e.target.checked },
        bubbles: true,
        composed: true
      }));
    });

    // Listen for open settings event
    document.addEventListener('open-settings', () => this.open());
  }

  open() {
    this.isOpen = true;
    const overlay = this.shadowRoot.getElementById('overlay');
    const settingsPanel = this.shadowRoot.getElementById('settingsPanel');
    overlay.classList.add('active');
    settingsPanel.classList.add('active');

    // Sync dark mode toggle with current state
    const darkModeToggle = this.shadowRoot.getElementById('darkModeToggle');
    darkModeToggle.checked = document.body.classList.contains('dark');
  }

  close() {
    this.isOpen = false;
    const overlay = this.shadowRoot.getElementById('overlay');
    const settingsPanel = this.shadowRoot.getElementById('settingsPanel');
    overlay.classList.remove('active');
    settingsPanel.classList.remove('active');
  }

  toggle() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }
}

customElements.define('settings-panel', SettingsPanel);

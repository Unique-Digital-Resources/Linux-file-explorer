class DirectoriesPanel extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
  
      this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@mdi/font@7.4.47/css/materialdesignicons.min.css">
        <link rel="stylesheet" href="../../themes/default/directories-panel.css">
        <div class="directories-panel">
          <div class="card main-dicts">
            <details open>
              <summary><i class="mdi mdi-chevron-right"></i><i class="mdi mdi-folder-multiple"></i>Main Directories</summary>
              <ul>
                <li><i class="mdi mdi-desktop-mac"></i>Desktop</li>
                <li><i class="mdi mdi-download"></i>Downloads</li>
                <li><i class="mdi mdi-file-document"></i>Documents</li>
                <li><i class="mdi mdi-image"></i>Images</li>
                <li><i class="mdi mdi-music"></i>Sounds</li>
                <li><i class="mdi mdi-video"></i>Videos</li>
                <li><i class="mdi mdi-network"></i>Network</li>
              </ul>
            </details>
          </div>
          <div class="card favorites-dicts">
            <details open>
              <summary><i class="mdi mdi-chevron-right"></i><i class="mdi mdi-star"></i>Favorites</summary>
              <ul>
                <li><i class="mdi mdi-folder-star"></i>Work</li>
                <li><i class="mdi mdi-folder-star"></i>Personal</li>
                <li><i class="mdi mdi-folder-star"></i>Projects</li>
              </ul>
            </details>
          </div>
          <div class="card drivers-card">
            <h3><i class="mdi mdi-harddisk"></i> Storage Drives</h3>
            <div class="drivers-treemap">
              <div class="driver vertical" style="grid-area: c;"><i class="mdi mdi-harddisk"></i>C: (25%)</div>
              <div class="driver horizontal" style="grid-area: d;"><i class="mdi mdi-harddisk"></i>D: (50%)</div>
              <div class="driver horizontal" style="grid-area: e;"><i class="mdi mdi-harddisk"></i>E: (15%)</div>
              <div class="driver horizontal" style="grid-area: f;"><i class="mdi mdi-harddisk"></i>F: (10%)</div>
            </div>
          </div>
          <div class="card cloud-card">
            <h3><i class="mdi mdi-cloud"></i> Cloud Storage</h3>
            <div class="cloud-item">
              <i class="mdi mdi-google-drive"></i>
              <span>Google Drive</span>
              <div class="progress"><div class="progress-bar" style="width: 60%;"></div></div>
            </div>
            <div class="cloud-item">
              <i class="mdi mdi-microsoft-onedrive"></i>
              <span>OneDrive</span>
              <div class="progress"><div class="progress-bar" style="width: 40%;"></div></div>
            </div>
            <div class="cloud-item">
              <i class="mdi mdi-dropbox"></i>
              <span>Dropbox</span>
              <div class="progress"><div class="progress-bar" style="width: 80%;"></div></div>
            </div>
          </div>
        </div>
      `;
    }
  }
  
  customElements.define('directories-panel', DirectoriesPanel);
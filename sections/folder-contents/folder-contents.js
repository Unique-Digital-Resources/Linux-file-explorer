class FolderContents extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
  
      // Create the container for folder contents
      const container = document.createElement('div');
      container.setAttribute('class', 'folder-contents');
  
      // Define the component's layout styles (width, height, grid)
      const style = document.createElement('style');
      style.textContent = `
        .folder-contents {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
          gap: 16px;
          overflow-y: auto;
          padding: 8px;
          justify-content: start;
          width: 100%;
          height: 100%;
          box-sizing: border-box;
        }
  
        @media (max-width: 768px) {
          .folder-contents {
            grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
            gap: 12px;
          }
        }
      `;
  
      // HTML structure from original_index.html for folder-contents
      container.innerHTML = `
        <div class="file-card">
          <i class="thumbnail mdi mdi-folder"></i>
          <div class="name">
            <i class="mdi mdi-folder"></i>
            <span>ProjectX</span>
          </div>
        </div>
        <div class="file-card">
          <i class="thumbnail mdi mdi-image"></i>
          <div class="name">
            <i class="mdi mdi-image"></i>
            <span>photo.jpg</span>
          </div>
        </div>
        <div class="file-card">
          <i class="thumbnail mdi mdi-language-python"></i>
          <div class="name">
            <i class="mdi mdi-language-python"></i>
            <span>script.py</span>
          </div>
        </div>
        <div class="file-card">
          <i class="thumbnail mdi mdi-file-pdf-box"></i>
          <div class="name">
            <i class="mdi mdi-file-pdf-box"></i>
            <span>document.pdf</span>
          </div>
        </div>
        <div class="file-card">
          <i class="thumbnail mdi mdi-folder-zip"></i>
          <div class="name">
            <i class="mdi mdi-folder-zip"></i>
            <span>Archive.zip</span>
          </div>
        </div>
        <div class="file-card">
          <i class="thumbnail mdi mdi-microsoft-excel"></i>
          <div class="name">
            <i class="mdi mdi-microsoft-excel"></i>
            <span>data.xlsx</span>
          </div>
        </div>
        <div class="file-card">
          <i class="thumbnail mdi mdi-music"></i>
          <div class="name">
            <i class="mdi mdi-music"></i>
            <span>song.mp3</span>
          </div>
        </div>
        <div class="file-card">
          <i class="thumbnail mdi mdi-video"></i>
          <div class="name">
            <i class="mdi mdi-video"></i>
            <span>video.mp4</span>
          </div>
        </div>
        <div class="file-card">
          <i class="thumbnail mdi mdi-file-word-box"></i>
          <div class="name">
            <i class="mdi mdi-file-word-box"></i>
            <span>report.docx</span>
          </div>
        </div>
      `;
  
      // Link to external themeable CSS
      const link = document.createElement('link');
      link.setAttribute('rel', 'stylesheet');
      link.setAttribute('href', '../../themes/default/folder-contents.css');
  
      // Append styles and content to shadow DOM
      this.shadowRoot.append(style, link, container);
    }
  }
  
  customElements.define('folder-contents', FolderContents);
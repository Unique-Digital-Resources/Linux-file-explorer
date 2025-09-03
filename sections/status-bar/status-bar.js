class StatusBar extends HTMLElement {
    constructor() {
      super();
      const shadow = this.attachShadow({ mode: 'open' });
  
      const wrapper = document.createElement('div');
      wrapper.className = 'status-bar';
  
      // Status Group
      const statusGroup = document.createElement('div');
      statusGroup.className = 'status-group';
      statusGroup.innerHTML = `
        <i class="mdi mdi-file-multiple"></i>
        <span>9 Files</span>
        <span>|</span>
        <span>photo.jpg (1.2 MB) selected</span>
      `;
  
      // Settings Group
      const settingsGroup = document.createElement('div');
      settingsGroup.className = 'settings-group';
      settingsGroup.innerHTML = `
        <div class="theme-switcher" title="Toggle Theme">
          <i class="mdi mdi-theme-light-dark"></i>
        </div>
        <div class="settings" title="Settings">
          <i class="mdi mdi-cog"></i>
        </div>
        <span class="divider">|</span>
        <div class="zoom-controls">
          <i class="mdi mdi-magnify-minus" title="Zoom Out"></i>
          <input type="range" min="50" max="150" value="100" title="Zoom Level">
          <i class="mdi mdi-magnify-plus" title="Zoom In"></i>
        </div>
      `;
  
      // Theme switcher event
      settingsGroup.querySelector('.theme-switcher').addEventListener('click', () => {
        document.body.classList.toggle('dark');
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
      shadow.appendChild(wrapper);
    }
  }
  
  customElements.define('status-bar', StatusBar);
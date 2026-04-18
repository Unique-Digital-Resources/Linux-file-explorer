class DirectoryBar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.currentPath = '/';

    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="/themes/default/directory-bar.css">
      <div class="directory-bar">
        <div class="dirct-move">
          <i class="mdi mdi-home" title="Home"></i>
          <i class="mdi mdi-arrow-left" title="Back"></i>
          <i class="mdi mdi-arrow-right" title="Forward"></i>
          <i class="mdi mdi-arrow-up" title="Up"></i>
          <i class="mdi mdi-refresh" title="Refresh"></i>
        </div>
        <div class="dirct-path" id="dir-path">
          <div class="breadcrumb-path" id="breadcrumb">
            <span>/</span>
          </div>
          <input type="text" class="path-edit-input" id="path-edit-input" spellcheck="false">
          <i class="mdi mdi-folder-plus clip-text" title="Copy folder path"></i>
        </div>
      </div>
    `;

    const style = document.createElement('style');
    style.textContent = `
      :host {
        box-sizing: border-box;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      }
      .directory-bar {
        display: flex;
        align-items: center;
        padding: 8px 12px;
        gap: 12px;
        height: 50px;
        width: 100%;
        box-sizing: border-box;
        position: relative;
      }
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      .dirct-move i.disabled {
        opacity: 0.3;
        pointer-events: none;
        cursor: default;
      }
      .path-edit-input {
        display: none;
        flex: 1;
        border: 1px solid var(--border-color, #ccc);
        border-radius: 3px;
        padding: 2px 6px;
        font-size: 13px;
        font-family: inherit;
        background: var(--card-bg, white);
        color: var(--text-color, #333);
        outline: none;
      }
      .path-edit-input:focus {
        border-color: var(--accent-color, #4a90d9);
      }
      .path-edit-mode .breadcrumb-path {
        display: none;
      }
      .path-edit-mode .clip-text {
        display: none;
      }
      .path-edit-mode .path-edit-input {
        display: block;
      }
      .path-edit-mode.path-error .path-edit-input {
        border-color: #e74c3c;
      }
    `;
    this.shadowRoot.appendChild(style);

    this.initNavigation();
    this.initPathListener();
    this.initPathEdit();
  }

  initNavigation() {
    const homeBtn = this.shadowRoot.querySelector('.mdi-home');
    const backBtn = this.shadowRoot.querySelector('.mdi-arrow-left');
    const forwardBtn = this.shadowRoot.querySelector('.mdi-arrow-right');
    const upBtn = this.shadowRoot.querySelector('.mdi-arrow-up');
    const refreshBtn = this.shadowRoot.querySelector('.mdi-refresh');

    this.backBtn = backBtn;
    this.forwardBtn = forwardBtn;
    this.upBtn = upBtn;

    homeBtn?.addEventListener('click', () => {
      window.dispatchEvent(new CustomEvent('tab-go-home'));
    });

    backBtn?.addEventListener('click', () => {
      if (!backBtn.classList.contains('disabled')) {
        window.dispatchEvent(new CustomEvent('tab-back'));
      }
    });

    forwardBtn?.addEventListener('click', () => {
      if (!forwardBtn.classList.contains('disabled')) {
        window.dispatchEvent(new CustomEvent('tab-forward'));
      }
    });

    upBtn?.addEventListener('click', () => {
      if (!upBtn.classList.contains('disabled')) {
        this.navigateUp();
      }
    });

    refreshBtn?.addEventListener('click', () => {
      window.dispatchEvent(new CustomEvent('navigate-to-path', {
        detail: { path: this.currentPath }
      }));
    });
  }

  initPathListener() {
    window.addEventListener('path-changed', (e) => {
      this.currentPath = e.detail.path;
      this.updateBreadcrumb(e.detail.path, e.detail.name);
    });

    window.addEventListener('navigation-state-changed', (e) => {
      this.updateNavigationState(e.detail);
    });
  }

  initPathEdit() {
    const dirPath = this.shadowRoot.getElementById('dir-path');
    const breadcrumb = this.shadowRoot.getElementById('breadcrumb');
    const pathInput = this.shadowRoot.getElementById('path-edit-input');

    if (!dirPath || !breadcrumb || !pathInput) return;

    breadcrumb.addEventListener('dblclick', (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.enterPathEditMode();
    });

    dirPath.addEventListener('click', (e) => {
      if (e.target === dirPath) {
        this.enterPathEditMode();
      }
    });

    pathInput.addEventListener('blur', (e) => {
      setTimeout(() => {
        if (dirPath.classList.contains('path-edit-mode')) {
          this.exitPathEditMode(false);
        }
      }, 150);
    });

    pathInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        const newPath = pathInput.value.trim();
        if (newPath) {
          this.validateAndNavigate(newPath);
        }
      } else if (e.key === 'Escape') {
        this.exitPathEditMode(false);
      }
    });
  }

  enterPathEditMode() {
    const dirPath = this.shadowRoot.getElementById('dir-path');
    const pathInput = this.shadowRoot.getElementById('path-edit-input');
    
    dirPath.classList.add('path-edit-mode');
    pathInput.value = this.currentPath;
    pathInput.focus();
    pathInput.select();
  }

  exitPathEditMode(navigate = false) {
    const dirPath = this.shadowRoot.getElementById('dir-path');
    const pathInput = this.shadowRoot.getElementById('path-edit-input');
    
    dirPath.classList.remove('path-edit-mode');
    dirPath.classList.remove('path-error');
    pathInput.value = '';
  }

  validateAndNavigate(path) {
    let normalizedPath = path.trim();
    
    if (!normalizedPath.startsWith('/')) {
      normalizedPath = '/' + normalizedPath;
    }
    
    if (normalizedPath.length > 1 && normalizedPath.endsWith('/')) {
      normalizedPath = normalizedPath.slice(0, -1);
    }

    if (typeof window.SimulationAPI?.pathExists === 'function') {
      const exists = window.SimulationAPI.pathExists(normalizedPath);
      const isFolder = window.SimulationAPI.isFolder(normalizedPath);
      
      if (exists && isFolder) {
        this.exitPathEditMode(true);
        this.navigateTo(normalizedPath);
      } else {
        this.showPathError();
      }
    } else {
      this.exitPathEditMode(true);
      this.navigateTo(normalizedPath);
    }
  }

  showPathError() {
    const dirPath = this.shadowRoot.getElementById('dir-path');
    const pathInput = this.shadowRoot.getElementById('path-edit-input');
    
    dirPath.classList.add('path-error');
    pathInput.value = '';
    pathInput.placeholder = 'Invalid path!';
    
    setTimeout(() => {
      if (dirPath.classList.contains('path-error')) {
        dirPath.classList.remove('path-error');
        pathInput.placeholder = '';
        pathInput.focus();
      }
    }, 3000);
  }

  updateNavigationState(detail) {
    const { canBack, canForward, currentPath } = detail;
    
    if (this.backBtn) {
      if (canBack) {
        this.backBtn.classList.remove('disabled');
        this.backBtn.title = 'Back';
      } else {
        this.backBtn.classList.add('disabled');
        this.backBtn.title = 'Back (no history)';
      }
    }
    
    if (this.forwardBtn) {
      if (canForward) {
        this.forwardBtn.classList.remove('disabled');
        this.forwardBtn.title = 'Forward';
      } else {
        this.forwardBtn.classList.add('disabled');
        this.forwardBtn.title = 'Forward (no history)';
      }
    }
    
    if (this.upBtn) {
      if (currentPath === '/' || !currentPath) {
        this.upBtn.classList.add('disabled');
        this.upBtn.title = 'Up (at root)';
      } else {
        this.upBtn.classList.remove('disabled');
        this.upBtn.title = 'Up';
      }
    }
  }

  updateBreadcrumb(path, name) {
    const breadcrumb = this.shadowRoot.getElementById('breadcrumb');
    if (!breadcrumb) return;

    if (path === '/') {
      breadcrumb.innerHTML = '<span>/</span>';
      return;
    }

    const parts = path.split('/').filter(p => p);
    let html = '<span data-path="/">/</span>';

    let currentPath = '';
    parts.forEach((part, index) => {
      currentPath += '/' + part;
      const isLast = index === parts.length - 1;
      if (isLast) {
        html += `<span>${part}</span>`;
      } else {
        html += `<span data-path="${currentPath}">${part}</span>`;
      }
    });

    breadcrumb.innerHTML = html;

    breadcrumb.querySelectorAll('span[data-path]').forEach(span => {
      span.addEventListener('click', () => {
        this.navigateTo(span.dataset.path);
      });
    });
  }

  navigateTo(path) {
    window.dispatchEvent(new CustomEvent('navigate-to-path', {
      detail: { path }
    }));
  }

  navigateUp() {
    if (this.upBtn && this.upBtn.classList.contains('disabled')) return;
    
    const parts = this.currentPath.split('/').filter(p => p);
    if (parts.length > 0) {
      parts.pop();
      const newPath = parts.length === 0 ? '/' : '/' + parts.join('/');
      this.navigateTo(newPath);
    }
  }
}

customElements.define('directory-bar', DirectoryBar);

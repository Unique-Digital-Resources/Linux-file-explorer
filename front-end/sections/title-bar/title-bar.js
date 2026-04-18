class TitleBar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.draggedTab = null;
    this.draggedIndex = null;
    this.dragIndicator = null;

    // Scrollbar state
    this.isDraggingScrollbar = false;
    this.startMouseX = 0;
    this.startScrollLeft = 0;

    // Tab state
    this.nextTabId = 2;
    this.tabs = [
      { 
        id: 'tab-1', 
        path: '/C:/home', 
        history: ['/C:/home'], 
        historyIndex: 0, 
        name: 'Home',
        filters: { extension: null, tags: [], colors: [], search: '' }
      }
    ];
    this.activeTabId = 'tab-1';

    this.shadowRoot.innerHTML = `
      <style>
        @import url('https://cdn.materialdesignicons.com/5.8.55/css/materialdesignicons.min.css');

        :host {
          display: block;
          width: 100%;
          max-width: 100%;
          overflow: hidden;
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .title-bar {
          width: 100%;
          max-width: 100%;
          height: 50px;
          display: flex;
          align-items: center;
          background: var(--card-bg);
          border-bottom: 1px solid var(--border-color);
          padding: 0 12px;
          gap: 12px;
          box-shadow: var(--shadow);
          overflow: hidden;
        }

        .tabs-wrapper {
          position: relative;
          background: var(--hover-bg);
          border-top-right-radius: 15px;
          border-top-left-radius: 15px;
          overflow: hidden;
          flex: 1 1 0;
          min-width: 0;
          max-width: 100%;
          display: flex;
          align-items: flex-end;
        }

        .tabs {
          display: flex;
          gap: 0;
          align-items: center;
          align-self: end;
          padding-bottom: 0;
          padding-right: 0;
          padding-left: 10px;
          width: 100%;
          max-width: 100%;
          min-width: 0;
          overflow-x: auto;
          overflow-y: hidden;
          scrollbar-width: none;
          -ms-overflow-style: none;
          scroll-behavior: auto;
          flex-wrap: nowrap;
        }

        .tabs::-webkit-scrollbar {
          display: none;
        }

        .new-tab-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          align-self: end;
          width: 30px;
          height: 30px;
          margin-top: 10px;
          margin-left: 4px;
          margin-right: 6px;
          flex-shrink: 0;
          cursor: pointer;
          border-radius: 8px;
          background: transparent;
          color: var(--text-color);
          font-size: 18px;
          transition: all 0.2s ease;
        }

        .new-tab-btn:hover {
          background: var(--accent-color);
          color: white;
        }

        .custom-scrollbar-track {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 12px;
          background: transparent;
          opacity: 0;
          transition: opacity 0.15s ease;
          z-index: 100;
          pointer-events: auto;
          display: none;
        }

        .tabs-wrapper:hover .custom-scrollbar-track,
        .custom-scrollbar-track.dragging {
          opacity: 1;
        }

        .scrollbar-thumb {
          position: absolute;
          top: 3px;
          height: 6px;
          background: rgba(0, 0, 0, 0.2);
          border-radius: 10px;
          cursor: grab;
          transition: none;
          left: 0;
        }

        .scrollbar-thumb:hover,
        .custom-scrollbar-track.dragging .scrollbar-thumb {
          background: var(--accent-color);
          height: 8px;
          top: 2px;
          cursor: grabbing;
        }

        .tab {
          display: flex;
          align-items: center;
          align-self: end;
          justify-content: space-between;
          gap: 8px;
          background: var(--card-bg);
          padding: 8px 12px;
          cursor: pointer;
          font-size: 14px;
          height: 30px;
          transition: all 0.2s ease;
          margin-top: 10px;
          flex: 1;
          min-width: 120px;
          border-radius: 0;
          user-select: none;
          position: relative;
          white-space: nowrap;
          overflow: hidden;
          color: var(--text-color);
        }

        .tab span {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          flex: 1;
        }

        .tab:hover {
          background: var(--accent-color);
          color: white;
        }

        .tab:hover .close {
          opacity: 1;
        }

        .tab.active {
          background: var(--accent-color);
          color: white;
        }

        .tab.active .close {
          opacity: 0.7;
        }

        .tab.active:hover .close {
          opacity: 1;
        }

        .tab.dragging {
          opacity: 0.5;
          transform: scale(1.05);
        }

        .drag-indicator {
          width: 3px;
          height: 30px;
          background: var(--accent-color);
          border-radius: 2px;
          margin-top: 10px;
          flex-shrink: 0;
          box-shadow: 0 0 8px var(--accent-color);
        }

        .tab.first {
          border-top-left-radius: 15px;
        }

        .tab.last {
          border-top-right-radius: 15px;
        }

        .tab.only {
          border-top-left-radius: 15px;
          border-top-right-radius: 15px;
        }

        .tab i {
          font-size: 16px;
          flex-shrink: 0;
        }

        .tab .close {
          font-size: 14px;
          color: #dc3545;
          margin-left: 4px;
          padding: 2px;
          border-radius: 3px;
          opacity: 0;
          transition: opacity 0.2s ease;
          flex-shrink: 0;
        }

        .tab .close:hover {
          background: #dc3545;
          color: white;
          opacity: 1;
        }

        .avatars {
          display: flex;
          align-items: center;
          margin-left: auto;
          margin-right: 16px;
          flex-shrink: 0;
        }

        .avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          margin-left: -8px;
          border: 2px solid var(--card-bg);
          position: relative;
        }

        .avatar:first-child {
          margin-left: 0;
        }

        .owner-avatar {
          background: linear-gradient(135deg, var(--accent-color) 0%, #0056b3 100%);
        }

        .main-buttons {
          display: flex;
          gap: 4px;
          align-items: center;
          flex-shrink: 0;
        }

        .main-buttons i {
          font-size: 16px;
          padding: 8px;
          border-radius: 4px;
          cursor: pointer;
          background: var(--hover-bg);
          transition: all 0.2s ease;
          width: 34px;
          height: 34px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .main-buttons i:hover {
          background: var(--accent-color);
          color: white;
        }

        .main-buttons .close:hover {
          background: #dc3545;
          color: white;
        }
      </style>

      <div class="title-bar">
        <div class="tabs-wrapper">
          <div class="tabs"></div>
          <div class="new-tab-btn"><i class="mdi mdi-plus"></i></div>
          <div class="custom-scrollbar-track">
            <div class="scrollbar-thumb"></div>
          </div>
        </div>

        <div class="avatars">
          <div class="avatar"></div>
          <div class="avatar"></div>
          <div class="avatar owner-avatar"></div>
        </div>
        <div class="main-buttons">
          <i class="mdi mdi-window-minimize"></i>
          <i class="mdi mdi-window-maximize"></i>
          <i class="mdi mdi-close close"></i>
        </div>
      </div>
    `;

    this.renderTabs();
    this.initScrollbar();
    this.initNewTabButton();
    this.initGlobalListeners();
  }

  renderTabs() {
    const tabsContainer = this.shadowRoot.querySelector('.tabs');
    tabsContainer.innerHTML = '';

    this.tabs.forEach((tab, index) => {
      const tabEl = document.createElement('div');
      tabEl.className = 'tab';
      tabEl.setAttribute('draggable', 'true');
      tabEl.setAttribute('data-id', tab.id);
      tabEl.setAttribute('data-index', index);

      if (tab.id === this.activeTabId) {
        tabEl.classList.add('active');
      }

      tabEl.innerHTML = `
        <i class="mdi mdi-folder-outline"></i>
        <span>${tab.name}</span>
        <i class="mdi mdi-close close"></i>
      `;

      tabEl.addEventListener('click', () => this.switchTab(tab.id));

      const closeBtn = tabEl.querySelector('.close');
      closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.closeTab(tab.id);
      });

      this.initTabDrag(tabEl, index);

      tabsContainer.appendChild(tabEl);
    });

    this.updateTabStyles();
    this.triggerScrollbarUpdate();
  }

  initTabDrag(tabEl, index) {
    tabEl.addEventListener('dragstart', (e) => {
      this.draggedTab = tabEl;
      this.draggedIndex = index;
      tabEl.style.opacity = '0';
      tabEl.style.visibility = 'hidden';
      this.createDragIndicator();
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/html', tabEl.innerHTML);
    });

    tabEl.addEventListener('dragend', () => {
      tabEl.style.opacity = '1';
      tabEl.style.visibility = 'visible';
      this.removeDragIndicator();
      this.draggedTab = null;
      this.draggedIndex = null;
      this.updateTabStyles();
    });

    tabEl.addEventListener('dragover', (e) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      if (this.draggedTab && this.draggedTab !== tabEl) {
        const rect = tabEl.getBoundingClientRect();
        const midX = rect.left + rect.width / 2;
        const tabsContainer = this.shadowRoot.querySelector('.tabs');
        if (e.clientX < midX) {
          tabsContainer.insertBefore(this.dragIndicator, tabEl);
        } else {
          tabsContainer.insertBefore(this.dragIndicator, tabEl.nextSibling);
        }
      }
    });

    tabEl.addEventListener('drop', (e) => {
      e.preventDefault();
      if (this.draggedTab && this.draggedTab !== tabEl) {
        const rect = tabEl.getBoundingClientRect();
        const midX = rect.left + rect.width / 2;
        const tabsContainer = this.shadowRoot.querySelector('.tabs');

        let dropIndex = parseInt(tabEl.getAttribute('data-index'));
        const fromIndex = this.draggedIndex;

        if (e.clientX >= midX) {
          dropIndex++;
        }

        if (fromIndex !== null && fromIndex !== undefined) {
          const movedTab = this.tabs.splice(fromIndex, 1)[0];
          if (dropIndex > fromIndex) dropIndex--;
          this.tabs.splice(dropIndex, 0, movedTab);
        }

        this.renderTabs();
      }
    });
  }

  createDragIndicator() {
    if (this.dragIndicator) return;
    this.dragIndicator = document.createElement('div');
    this.dragIndicator.className = 'drag-indicator';
    this.shadowRoot.querySelector('.tabs').appendChild(this.dragIndicator);
  }

  removeDragIndicator() {
    if (this.dragIndicator) {
      this.dragIndicator.remove();
      this.dragIndicator = null;
    }
  }

  updateTabStyles() {
    const tabElements = this.shadowRoot.querySelectorAll('.tab');
    tabElements.forEach((el, index) => {
      el.classList.remove('first', 'last', 'only');
      if (tabElements.length === 1) {
        el.classList.add('only');
        const closeBtn = el.querySelector('.close');
        if (closeBtn) closeBtn.style.display = 'none';
      } else {
        if (index === 0) el.classList.add('first');
        if (index === tabElements.length - 1) el.classList.add('last');
        const closeBtn = el.querySelector('.close');
        if (closeBtn) closeBtn.style.display = '';
      }
      el.setAttribute('data-index', index);
    });
    this.triggerScrollbarUpdate();
  }

  switchTab(tabId) {
    const tab = this.tabs.find(t => t.id === tabId);
    if (!tab || tab.id === this.activeTabId) return;

    this.activeTabId = tabId;
    // Sync filters from this tab to AppState (without dispatching filter-changed)
    if (window.AppState) {
      window.AppState.filters = { ...tab.filters };
    }
    this.renderTabs();
    // Notify UI components (toolbar) that active tab changed (filters may have changed)
    window.dispatchEvent(new CustomEvent('active-tab-changed'));
    window.dispatchEvent(new CustomEvent('navigate-to-path', { detail: { path: tab.path } }));
    this.dispatchNavigationState();
  }

  closeTab(tabId) {
    if (this.tabs.length === 1) {
      const homePath = '/C:/home';
      const tab = this.tabs[0];
      tab.path = homePath;
      tab.history = [homePath];
      tab.historyIndex = 0;
      tab.name = 'Home';
      this.renderTabs();
      window.dispatchEvent(new CustomEvent('navigate-to-path', { detail: { path: homePath } }));
      window.dispatchEvent(new CustomEvent('path-changed', { detail: { path: homePath, name: 'Home' } }));
      this.dispatchNavigationState();
      return;
    }

    const index = this.tabs.findIndex(t => t.id === tabId);
    if (index === -1) return;

    const wasActive = tabId === this.activeTabId;
    this.tabs.splice(index, 1);

    if (wasActive) {
      let newIndex = index;
      if (newIndex >= this.tabs.length) newIndex = this.tabs.length - 1;
      this.activeTabId = this.tabs[newIndex].id;
      // Sync filters from the new active tab to AppState (without dispatching filter-changed)
      if (window.AppState) {
        const newActiveTab = this.tabs[newIndex];
        window.AppState.filters = { ...newActiveTab.filters };
      }
      this.renderTabs();
      // Notify UI components that active tab changed
      window.dispatchEvent(new CustomEvent('active-tab-changed'));
      window.dispatchEvent(new CustomEvent('navigate-to-path', { detail: { path: this.tabs[newIndex].path } }));
    } else {
      this.renderTabs();
    }
    this.dispatchNavigationState();
  }

  createNewTab() {
    const homePath = '/C:/home';
    const newTab = {
      id: 'tab-' + this.nextTabId++,
      path: homePath,
      history: [homePath],
      historyIndex: 0,
      name: 'Home',
      filters: { extension: null, tags: [], colors: [], search: '' }
    };
    this.tabs.push(newTab);
    this.activeTabId = newTab.id;
    // Sync new tab's filters to AppState (without dispatching filter-changed)
    if (window.AppState) {
      window.AppState.filters = { ...newTab.filters };
    }
    this.renderTabs();
    // Notify UI components that active tab changed
    window.dispatchEvent(new CustomEvent('active-tab-changed'));
    window.dispatchEvent(new CustomEvent('navigate-to-path', { detail: { path: homePath } }));
    window.dispatchEvent(new CustomEvent('path-changed', { detail: { path: homePath, name: 'Home' } }));
    this.dispatchNavigationState();
  }

  updateActiveTabPath(path) {
    const tab = this.tabs.find(t => t.id === this.activeTabId);
    if (!tab) return;

    tab.path = path;
    const homePath = window.SimulationAPI?.getHomePath?.() || '/C:/home';
    if (path === homePath) {
      tab.name = 'Home';
    } else {
      const segments = path.split('/').filter(Boolean);
      tab.name = segments.length === 0 ? 'Home' : segments[segments.length - 1];
    }

    const currentHistoryPath = tab.history[tab.historyIndex];
    if (path !== currentHistoryPath) {
      tab.history = tab.history.slice(0, tab.historyIndex + 1);
      tab.history.push(path);
      tab.historyIndex = tab.history.length - 1;
    }

    this.renderTabs();
    this.dispatchNavigationState();
  }

  tabBack() {
    const tab = this.tabs.find(t => t.id === this.activeTabId);
    if (!tab || tab.historyIndex <= 0) return;

    tab.historyIndex--;
    const path = tab.history[tab.historyIndex];
    tab.path = path;
    const homePath = window.SimulationAPI?.getHomePath?.() || '/C:/home';
    if (path === homePath) {
      tab.name = 'Home';
    } else {
      const segments = path.split('/').filter(Boolean);
      tab.name = segments.length === 0 ? 'Home' : segments[segments.length - 1];
    }
    this.renderTabs();
    window.dispatchEvent(new CustomEvent('navigate-to-path', { detail: { path } }));
    window.dispatchEvent(new CustomEvent('path-changed', { detail: { path, name: tab.name } }));
    this.dispatchNavigationState();
  }

  tabForward() {
    const tab = this.tabs.find(t => t.id === this.activeTabId);
    if (!tab || tab.historyIndex >= tab.history.length - 1) return;

    tab.historyIndex++;
    const path = tab.history[tab.historyIndex];
    tab.path = path;
    const homePath = window.SimulationAPI?.getHomePath?.() || '/C:/home';
    if (path === homePath) {
      tab.name = 'Home';
    } else {
      const segments = path.split('/').filter(Boolean);
      tab.name = segments.length === 0 ? 'Home' : segments[segments.length - 1];
    }
    this.renderTabs();
    window.dispatchEvent(new CustomEvent('navigate-to-path', { detail: { path } }));
    window.dispatchEvent(new CustomEvent('path-changed', { detail: { path, name: tab.name } }));
    this.dispatchNavigationState();
  }

  tabGoHome() {
    const tab = this.tabs.find(t => t.id === this.activeTabId);
    if (!tab) return;

    const homePath = window.SimulationAPI?.getHomePath?.() || '/C:/home';
    const path = homePath;
    tab.path = path;
    tab.name = 'Home';

    if (tab.history[tab.historyIndex] !== homePath) {
      tab.history = tab.history.slice(0, tab.historyIndex + 1);
      tab.history.push(homePath);
      tab.historyIndex = tab.history.length - 1;
    }

    this.renderTabs();
    window.dispatchEvent(new CustomEvent('navigate-to-path', { detail: { path: homePath } }));
    window.dispatchEvent(new CustomEvent('path-changed', { detail: { path: homePath, name: 'Home' } }));
    this.dispatchNavigationState();
  }

  initNewTabButton() {
    const newTabBtn = this.shadowRoot.querySelector('.new-tab-btn');
    if (newTabBtn) {
      newTabBtn.addEventListener('click', () => this.createNewTab());
    }
  }

  initGlobalListeners() {
    window.addEventListener('path-changed', (e) => {
      if (e.detail && e.detail.path !== undefined) {
        this.updateActiveTabPath(e.detail.path);
      }
    });

    window.addEventListener('tab-back', () => this.tabBack());
    window.addEventListener('tab-forward', () => this.tabForward());
    window.addEventListener('tab-go-home', () => this.tabGoHome());

    this.dispatchNavigationState();
  }

  dispatchNavigationState() {
    const tab = this.tabs.find(t => t.id === this.activeTabId);
    if (!tab) return;

    window.dispatchEvent(new CustomEvent('navigation-state-changed', {
      detail: {
        canBack: tab.historyIndex > 0,
        canForward: tab.historyIndex < tab.history.length - 1,
        currentPath: tab.path
      }
    }));
  }

  initScrollbar() {
    const tabsContainer = this.shadowRoot.querySelector('.tabs');
    const track = this.shadowRoot.querySelector('.custom-scrollbar-track');
    const thumb = this.shadowRoot.querySelector('.scrollbar-thumb');

    if (!tabsContainer || !track || !thumb) return;

    const updateScrollbar = () => {
      const clientWidth = tabsContainer.clientWidth;
      const scrollWidth = tabsContainer.scrollWidth;
      const scrollLeft = tabsContainer.scrollLeft;

      if (scrollWidth <= clientWidth) {
        track.style.display = 'none';
        return;
      }
      track.style.display = 'block';

      const thumbWidth = Math.max((clientWidth / scrollWidth) * clientWidth, 40);
      thumb.style.width = `${thumbWidth}px`;

      const maxScroll = scrollWidth - clientWidth;
      const maxThumbTravel = clientWidth - thumbWidth;
      const scrollPercent = scrollLeft / maxScroll;
      const thumbPos = scrollPercent * maxThumbTravel;

      thumb.style.transform = `translateX(${thumbPos}px)`;
    };

    thumb.addEventListener('mousedown', (e) => {
      this.isDraggingScrollbar = true;
      this.startMouseX = e.clientX;
      this.startScrollLeft = tabsContainer.scrollLeft;
      track.classList.add('dragging');
      document.body.style.userSelect = 'none';
      e.preventDefault();
    });

    const handleMouseMove = (e) => {
      if (!this.isDraggingScrollbar) return;
      const deltaX = e.clientX - this.startMouseX;
      const clientWidth = tabsContainer.clientWidth;
      const scrollWidth = tabsContainer.scrollWidth;
      const thumbWidth = thumb.offsetWidth;
      const maxScroll = scrollWidth - clientWidth;
      const maxThumbTravel = clientWidth - thumbWidth;
      const ratio = maxScroll / maxThumbTravel;
      tabsContainer.scrollLeft = this.startScrollLeft + (deltaX * ratio);
    };

    const handleMouseUp = () => {
      if (this.isDraggingScrollbar) {
        this.isDraggingScrollbar = false;
        track.classList.remove('dragging');
        document.body.style.userSelect = '';
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    tabsContainer.addEventListener('scroll', updateScrollbar);

    tabsContainer.addEventListener('wheel', (e) => {
      e.preventDefault();
      const scrollAmount = e.deltaY !== 0 ? e.deltaY : e.deltaX;
      tabsContainer.scrollLeft += scrollAmount;
    }, { passive: false });

    const resizeObserver = new ResizeObserver(updateScrollbar);
    resizeObserver.observe(tabsContainer);

    this._updateScrollbar = updateScrollbar;
    setTimeout(updateScrollbar, 0);
  }

  triggerScrollbarUpdate() {
    setTimeout(() => {
      if (this._updateScrollbar) {
        this._updateScrollbar();
      }
    }, 0);
  }
}

customElements.define('title-bar', TitleBar);

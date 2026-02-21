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

    // Create the component structure with embedded CSS and scrollbar
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

        /* Wrapper acts as the positioning context for the scrollbar */
        .tabs-wrapper {
          position: relative;
          background: var(--hover-bg);
          border-top-right-radius: 15px;
          border-top-left-radius: 15px;
          overflow: hidden;
          flex: 1 1 0; /* Grow, shrink, base size 0 */
          min-width: 0; /* Critical: allows flex item to shrink below content size */
          max-width: 100%; /* Prevent exceeding container */
          display: flex;
          align-items: flex-end;
        }

        /* The Scroll Container. Native scrollbar is hidden */
        .tabs {
          display: flex;
          gap: 0;
          align-items: center;
          align-self: end;
          padding-bottom: 0;
          padding-right: 10px;
          padding-left: 10px;
          width: 100%;
          max-width: 100%;
          min-width: 0; /* Critical: allows flex item to shrink */
          overflow-x: auto;
          overflow-y: hidden;
          scrollbar-width: none;
          -ms-overflow-style: none;
          scroll-behavior: auto;
          flex-wrap: nowrap; /* Prevent wrapping */
        }

        .tabs::-webkit-scrollbar {
          display: none;
        }

        /* Custom Scrollbar Overlay */
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

        /* Drag indicator - positioned absolutely */
        .drag-indicator {
          position: absolute;
          width: 3px;
          height: 30px;
          background: var(--accent-color);
          border-radius: 2px;
          margin-top: 10px;
          flex-shrink: 0;
          box-shadow: 0 0 8px var(--accent-color);
          pointer-events: none;
          z-index: 50;
          display: none;
        }

        .avatars {
          display: flex;
          align-items: center;
          margin-left: auto;
          margin-right: 16px;
          flex-shrink: 0; /* Don't shrink avatars */
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
          flex-shrink: 0; /* Don't shrink buttons */
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
          <div class="tabs">
            <slot name="tabs"></slot>
          </div>
          
          <!-- Drag Indicator -->
          <div class="drag-indicator"></div>
          
          <!-- Custom Scrollbar Overlay -->
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
  }

  connectedCallback() {
    // Wait for slot content to be assigned
    const slot = this.shadowRoot.querySelector('slot[name="tabs"]');
    slot.addEventListener('slotchange', () => {
      this.initTabs();
      this.initScrollbar();
    });
    
    // Also initialize if slots already have content
    setTimeout(() => {
      this.initTabs();
      this.initScrollbar();
    }, 0);
  }

  initScrollbar() {
    const tabsContainer = this.shadowRoot.querySelector('.tabs');
    const track = this.shadowRoot.querySelector('.custom-scrollbar-track');
    const thumb = this.shadowRoot.querySelector('.scrollbar-thumb');

    if (!tabsContainer || !track || !thumb) return;

    // Update scrollbar position and size
    const updateScrollbar = () => {
      const clientWidth = tabsContainer.clientWidth;
      const scrollWidth = tabsContainer.scrollWidth;
      const scrollLeft = tabsContainer.scrollLeft;

      // Hide scrollbar if content fits
      if (scrollWidth <= clientWidth) {
        track.style.display = 'none';
        return;
      }
      track.style.display = 'block';

      // Calculate thumb width (minimum 40px)
      const thumbWidth = Math.max((clientWidth / scrollWidth) * clientWidth, 40);
      thumb.style.width = `${thumbWidth}px`;

      // Calculate thumb position
      const maxScroll = scrollWidth - clientWidth;
      const maxThumbTravel = clientWidth - thumbWidth;
      const scrollPercent = scrollLeft / maxScroll;
      const thumbPos = scrollPercent * maxThumbTravel;

      thumb.style.transform = `translateX(${thumbPos}px)`;
    };

    // Dragging logic
    thumb.addEventListener('mousedown', (e) => {
      this.isDraggingScrollbar = true;
      this.startMouseX = e.clientX;
      this.startScrollLeft = tabsContainer.scrollLeft;
      
      track.classList.add('dragging');
      document.body.style.userSelect = 'none';
      e.preventDefault();
    });

    // Global mouse move handler
    const handleMouseMove = (e) => {
      if (!this.isDraggingScrollbar) return;

      const deltaX = e.clientX - this.startMouseX;
      const clientWidth = tabsContainer.clientWidth;
      const scrollWidth = tabsContainer.scrollWidth;
      const thumbWidth = thumb.offsetWidth;

      const maxScroll = scrollWidth - clientWidth;
      const maxThumbTravel = clientWidth - thumbWidth;
      
      // The ratio: how many content pixels per 1 thumb pixel
      const ratio = maxScroll / maxThumbTravel;

      // Update container scroll
      tabsContainer.scrollLeft = this.startScrollLeft + (deltaX * ratio);
    };

    // Global mouse up handler
    const handleMouseUp = () => {
      if (this.isDraggingScrollbar) {
        this.isDraggingScrollbar = false;
        track.classList.remove('dragging');
        document.body.style.userSelect = '';
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    // Sync on natural scrolling
    tabsContainer.addEventListener('scroll', updateScrollbar);
    
    // Mouse wheel scrolling support
    tabsContainer.addEventListener('wheel', (e) => {
      // Prevent default vertical scroll
      e.preventDefault();
      
      // Scroll horizontally based on wheel delta
      // Use deltaY (vertical wheel) for horizontal scrolling
      const scrollAmount = e.deltaY !== 0 ? e.deltaY : e.deltaX;
      tabsContainer.scrollLeft += scrollAmount;
    }, { passive: false });
    
    // Update on resize
    const resizeObserver = new ResizeObserver(updateScrollbar);
    resizeObserver.observe(tabsContainer);

    // Initial update
    setTimeout(updateScrollbar, 0);
  }

  getTabs() {
    const slot = this.shadowRoot.querySelector('slot[name="tabs"]');
    return slot.assignedElements({ flatten: true }).filter(el => el.classList.contains('tab'));
  }

  initTabs() {
    const tabs = this.getTabs();
    const dragIndicator = this.shadowRoot.querySelector('.drag-indicator');

    // Update tab styles (first/last/only)
    this.updateTabStyles();

    // Add drag and drop event listeners
    tabs.forEach((tab, index) => {
      // Drag start
      tab.addEventListener('dragstart', (e) => {
        this.draggedTab = tab;
        this.draggedIndex = index;
        
        // Hide the dragged tab
        tab.style.opacity = '0';
        tab.style.visibility = 'hidden';
        
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', tab.innerHTML);
      });

      // Drag end
      tab.addEventListener('dragend', () => {
        // Show the dragged tab
        tab.style.opacity = '1';
        tab.style.visibility = 'visible';
        
        // Hide drag indicator
        dragIndicator.style.display = 'none';
        
        this.draggedTab = null;
        this.draggedIndex = null;
        this.updateTabStyles();
      });

      // Drag over
      tab.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        
        if (this.draggedTab && this.draggedTab !== tab) {
          const rect = tab.getBoundingClientRect();
          const midX = rect.left + rect.width / 2;
          
          // Position drag indicator
          dragIndicator.style.display = 'block';
          dragIndicator.style.top = '0';
          
          if (e.clientX < midX) {
            dragIndicator.style.left = `${rect.left - this.getBoundingClientRect().left}px`;
          } else {
            dragIndicator.style.left = `${rect.right - this.getBoundingClientRect().left}px`;
          }
        }
      });

      // Drop
      tab.addEventListener('drop', (e) => {
        e.preventDefault();
        dragIndicator.style.display = 'none';
        
        if (this.draggedTab && this.draggedTab !== tab) {
          const rect = tab.getBoundingClientRect();
          const midX = rect.left + rect.width / 2;
          
          // Move the dragged tab in the light DOM
          const parent = this;
          if (e.clientX < midX) {
            parent.insertBefore(this.draggedTab, tab);
          } else {
            parent.insertBefore(this.draggedTab, tab.nextSibling);
          }
          
          this.updateTabStyles();
        }
      });

      // Close button click
      const closeBtn = tab.querySelector('.close');
      if (closeBtn) {
        closeBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          tab.remove();
          this.updateTabStyles();
          
          // Update scrollbar after tab removal
          setTimeout(() => {
            const tabsContainer = this.shadowRoot.querySelector('.tabs');
            if (tabsContainer) {
              tabsContainer.dispatchEvent(new Event('scroll'));
            }
          }, 0);
        });
      }
    });
  }

  updateTabStyles() {
    const tabs = this.getTabs();
    
    tabs.forEach((tab, index) => {
      // Remove all position classes
      tab.classList.remove('first', 'last', 'only');
      
      // Add appropriate position class
      if (tabs.length === 1) {
        tab.classList.add('only');
        // Hide close button for single tab
        const closeBtn = tab.querySelector('.close');
        if (closeBtn) {
          closeBtn.style.opacity = '0';
        }
      } else {
        if (index === 0) {
          tab.classList.add('first');
        }
        if (index === tabs.length - 1) {
          tab.classList.add('last');
        }
        // Show close button for multiple tabs
        const closeBtn = tab.querySelector('.close');
        if (closeBtn) {
          closeBtn.style.opacity = '';
        }
      }
      
      // Update data-index attribute
      tab.setAttribute('data-index', index);
    });
    
    // Trigger scrollbar update
    setTimeout(() => {
      const tabsContainer = this.shadowRoot.querySelector('.tabs');
      if (tabsContainer) {
        tabsContainer.dispatchEvent(new Event('scroll'));
      }
    }, 0);
  }
}

customElements.define('title-bar', TitleBar);

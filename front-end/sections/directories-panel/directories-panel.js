class DirectoriesPanel extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@mdi/font@7.4.47/css/materialdesignicons.min.css">
      <style>
        /* Host styling - inherits CSS variables from document */
        :host {
          display: block;
          width: 100%;
          height: 100%;
          overflow: hidden;
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        /* Scroll container wrapper */
        .directories-panel-wrapper {
          position: relative;
          width: 100%;
          height: 100%;
          overflow: hidden;
          display: flex;
          flex-direction: row;
          --bg-color: #f8f9fa;
          --text-color: #212529;
          --card-bg: #ffffff;
          --border-color: #dee2e6;
          --accent-color: #0d6efd;
          --hover-bg: #e9ecef;
          --shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        /* Custom Scrollbar Overlay - on the LEFT side */
        .custom-scrollbar-track {
          position: absolute;
          top: 0;
          left: 0;
          width: 6px;
          height: 100%;
          background: transparent;
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: 100;
          pointer-events: auto;
        }

        /* Show scrollbar on hover or while dragging */
        .directories-panel-wrapper:hover .custom-scrollbar-track,
        .custom-scrollbar-track.dragging {
          opacity: 1;
        }

        .scrollbar-thumb {
          position: absolute;
          left: 0;
          width: 6px;
          background: rgba(0, 0, 0, 0.2);
          border-radius: 3px;
          cursor: grab;
          transition: background 0.2s;
        }

        .scrollbar-thumb:hover,
        .custom-scrollbar-track.dragging .scrollbar-thumb {
          background: var(--accent-color);
          cursor: grabbing;
        }

        .directories-panel {
          margin: 0;
          padding: 12px;
          padding-left: 16px;
          box-sizing: border-box;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          background: var(--bg-color);
          overflow-y: auto;
          overflow-x: hidden;
          flex: 1;
          min-height: 0;
          scrollbar-width: none;
          -ms-overflow-style: none;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .directories-panel::-webkit-scrollbar {
          display: none;
        }
      </style>
      <div class="directories-panel-wrapper">
        <div class="custom-scrollbar-track" id="scrollbar-track">
          <div class="scrollbar-thumb" id="scrollbar-thumb"></div>
        </div>
        <div class="directories-panel">
          <slot name="content"></slot>
        </div>
      </div>
    `;
  }

  connectedCallback() {
    // Wait for slot content to be assigned
    const slot = this.shadowRoot.querySelector('slot[name="content"]');
    slot.addEventListener('slotchange', () => {
      this.initScrollbar();
      this.initSelection();
    });
    
    // Also initialize if slots already have content
    setTimeout(() => {
      this.initScrollbar();
      this.initSelection();
    }, 0);
  }

  initSelection() {
    const items = this.querySelectorAll('.menu-panel-item, .driver, .cloud-item');
    
    items.forEach(item => {
      item.addEventListener('click', () => {
        // Remove selected from all
        items.forEach(i => i.classList.remove('selected'));
        // Add selected to clicked
        item.classList.add('selected');
        
        // Dispatch custom event with path
        const path = item.dataset.path;
        this.dispatchEvent(new CustomEvent('directory-select', {
          detail: { path },
          bubbles: true,
          composed: true
        }));
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

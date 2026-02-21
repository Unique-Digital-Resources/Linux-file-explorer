class PanelSplit extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.isResizing = false;
    this.startX = 0;
    this.startWidth = 0;
    this.minWidth = 150;
    this.maxWidth = 500;
  }

  connectedCallback() {
    this.render();
    this.setupResizer();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
          height: 100%;
        }

        .panel-container {
          display: flex;
          width: 100%;
          height: 100%;
          min-height: 0;
          overflow: hidden;
        }

        .left-panel {
          flex: 0 0 280px;
          min-width: ${this.minWidth}px;
          max-width: ${this.maxWidth}px;
          min-height: 0;
          overflow: hidden;
        }

        .resizer {
          flex: 0 0 6px;
          background: var(--border-color, #dee2e6);
          cursor: col-resize;
          position: relative;
          transition: background 0.2s ease;
          z-index: 10;
        }

        .resizer:hover,
        .resizer.active {
          background: var(--accent-color, #0d6efd);
        }

        .resizer::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 2px;
          height: 30px;
          background: var(--text-color, #212529);
          border-radius: 1px;
          opacity: 0.5;
        }

        .resizer:hover::after,
        .resizer.active::after {
          background: #ffffff;
          opacity: 1;
        }

        .right-panel {
          flex: 1;
          min-width: 0;
          min-height: 0;
          overflow: hidden;
        }

        /* Dark mode support */
        :host-context(.dark) .resizer {
          background: var(--border-color, #404040);
        }

        :host-context(.dark) .resizer::after {
          background: var(--text-color, #e9ecef);
        }

        /* Mobile responsive - hide resizer and left panel */
        @media (max-width: 768px) {
          .resizer {
            display: none;
          }

          .left-panel {
            display: none;
          }

          .right-panel {
            width: 100%;
          }
        }
      </style>
      <div class="panel-container">
        <div class="left-panel" id="leftPanel">
          <slot name="left"></slot>
        </div>
        <div class="resizer" id="resizer"></div>
        <div class="right-panel" id="rightPanel">
          <slot name="right"></slot>
        </div>
      </div>
    `;
  }

  setupResizer() {
    const resizer = this.shadowRoot.getElementById('resizer');
    const leftPanel = this.shadowRoot.getElementById('leftPanel');

    // Mouse events
    resizer.addEventListener('mousedown', (e) => this.startResize(e));
    document.addEventListener('mousemove', (e) => this.resize(e));
    document.addEventListener('mouseup', () => this.stopResize());

    // Touch events for mobile
    resizer.addEventListener('touchstart', (e) => this.startResize(e));
    document.addEventListener('touchmove', (e) => this.resize(e));
    document.addEventListener('touchend', () => this.stopResize());

    // Double-click to reset to default width
    resizer.addEventListener('dblclick', () => {
      leftPanel.style.flexBasis = '280px';
      this.dispatchEvent(new CustomEvent('panel-resized', {
        detail: { leftWidth: 280 },
        bubbles: true,
        composed: true
      }));
    });
  }

  startResize(e) {
    this.isResizing = true;
    const resizer = this.shadowRoot.getElementById('resizer');
    resizer.classList.add('active');
    
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    this.startX = clientX;
    
    const leftPanel = this.shadowRoot.getElementById('leftPanel');
    this.startWidth = leftPanel.getBoundingClientRect().width;
    
    e.preventDefault();
  }

  resize(e) {
    if (!this.isResizing) return;

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const deltaX = clientX - this.startX;
    const newWidth = this.startWidth + deltaX;

    // Clamp width between min and max
    const clampedWidth = Math.max(this.minWidth, Math.min(this.maxWidth, newWidth));

    const leftPanel = this.shadowRoot.getElementById('leftPanel');
    leftPanel.style.flexBasis = `${clampedWidth}px`;

    // Dispatch event with current width
    this.dispatchEvent(new CustomEvent('panel-resized', {
      detail: { leftWidth: clampedWidth },
      bubbles: true,
      composed: true
    }));
  }

  stopResize() {
    if (this.isResizing) {
      this.isResizing = false;
      const resizer = this.shadowRoot.getElementById('resizer');
      resizer.classList.remove('active');
    }
  }

  // Public method to set panel width programmatically
  setLeftWidth(width) {
    const clampedWidth = Math.max(this.minWidth, Math.min(this.maxWidth, width));
    const leftPanel = this.shadowRoot.getElementById('leftPanel');
    leftPanel.style.flexBasis = `${clampedWidth}px`;
  }

  // Public method to get current left panel width
  getLeftWidth() {
    const leftPanel = this.shadowRoot.getElementById('leftPanel');
    return leftPanel.getBoundingClientRect().width;
  }
}

customElements.define('panel-split', PanelSplit);

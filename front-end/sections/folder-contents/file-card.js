class FileCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.fontSize = 13;
    this.iconSize = 16;
    this.appScale = 100;
  }

  connectedCallback() {
    const icon = this.getAttribute('icon') || 'mdi-file';
    const name = this.getAttribute('name') || 'Unknown File';
    const thumbnail = this.getAttribute('thumbnail');

    // Determine if this is a visual card
    const isVisual = !!thumbnail;

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
          height: 100%;
        }
      </style>
      <link rel="stylesheet" href="../../themes/default/file-card.css">
      <div class="file-card ${isVisual ? 'is-visual' : ''}">
        <div class="thumbnail-wrapper">
            ${!isVisual ? `<i class="thumbnail mdi ${icon}"></i>` : ''}
        </div>
        <div class="name">
          <i class="mdi ${icon}"></i>
          <span>${name}</span>
        </div>
      </div>
    `;

    // Apply inline styles for the visual card background
    if (isVisual) {
      const card = this.shadowRoot.querySelector('.file-card');
      card.style.backgroundImage = `url('${thumbnail}')`;
    }

    // Listen for font size changes
    window.addEventListener('font-size-changed', (e) => {
      this.fontSize = e.detail;
      this.applyStyles();
    });

    // Listen for icon size changes
    window.addEventListener('icon-size-changed', (e) => {
      this.iconSize = e.detail;
      this.applyStyles();
    });

    // Listen for app scale changes
    window.addEventListener('app-scale-changed', (e) => {
      this.appScale = e.detail;
      this.applyStyles();
    });

    // Apply initial styles
    this.applyStyles();
  }

  applyStyles() {
    const scale = this.appScale / 100;
    const scaledFontSize = Math.round(this.fontSize * scale);
    const scaledIconSize = Math.round(this.iconSize * scale);

    const nameElement = this.shadowRoot.querySelector('.name');
    const thumbnailIcon = this.shadowRoot.querySelector('.thumbnail');
    const nameIcon = this.shadowRoot.querySelector('.name i');

    if (nameElement) {
      nameElement.style.fontSize = `${scaledFontSize}px`;
    }
    if (thumbnailIcon) {
      thumbnailIcon.style.fontSize = `${scaledIconSize}px`;
    }
    if (nameIcon) {
      nameIcon.style.fontSize = `${scaledIconSize}px`;
    }
  }
}

customElements.define('file-card', FileCard);
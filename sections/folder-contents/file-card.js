class FileCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    const icon = this.getAttribute('icon') || 'mdi-file';
    const name = this.getAttribute('name') || 'Unknown File';
    const thumbnail = this.getAttribute('thumbnail');

    // Determine if this is a visual card
    const isVisual = !!thumbnail;

    this.shadowRoot.innerHTML = `
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
  }
}

customElements.define('file-card', FileCard);
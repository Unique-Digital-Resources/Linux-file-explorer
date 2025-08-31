class TitleBar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    // Create the component structure
    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="/themes/default/title-bar.css">
      <div class="title-bar">
        <div class="tabs">
          <div class="tab">
            <i class="mdi mdi-folder-outline"></i>
            <span>Documents</span>
            <i class="mdi mdi-close close"></i>
          </div>
          <div class="tab">
            <i class="mdi mdi-folder-outline"></i>
            <span>Downloads</span>
            <i class="mdi mdi-close close"></i>
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

    // Set component-specific styles (dimensions)
    const style = document.createElement('style');
    style.textContent = `
      .title-bar {
        width: 100%;
        height: 50px;
      }
    `;
    this.shadowRoot.appendChild(style);
  }
}

customElements.define('title-bar', TitleBar);
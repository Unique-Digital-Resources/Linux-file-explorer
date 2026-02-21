class MoveableTabs extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
  
      const container = document.createElement('div');
      container.className = 'tabs';
  
      // Sample tabs (replace with dynamic logic if needed)
      container.innerHTML = `
        <div class="tab">
          <i class="mdi mdi-folder-outline"></i>
          Documents
          <i class="mdi mdi-close close"></i>
        </div>
        <div class="tab">
          <i class="mdi mdi-folder-outline"></i>
          Downloads
          <i class="mdi mdi-close close"></i>
        </div>
        <link rel="stylesheet" href="../themes/default/moveable-tabs.css">
      `;
  
      // Structural styles
      const style = document.createElement('style');
      style.textContent = `
        .tabs {
          display: flex;
          gap: 6px;
          flex: 1;
          align-items: center;
        }
        .tab {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 12px;
          border-radius: 6px;
          font-size: 14px;
          height: 34px;
          cursor: pointer;
        }
        .tab i {
          font-size: 16px;
        }
        .tab .close {
          font-size: 14px;
          margin-left: 4px;
          padding: 2px;
          border-radius: 3px;
        }
      `;
  
      this.shadowRoot.append(style, container);
    }
  }
  
  customElements.define('moveable-tabs', MoveableTabs);
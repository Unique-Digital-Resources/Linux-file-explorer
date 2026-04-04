class PropertiesDialog extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.items = [];
        
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: none;
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    z-index: 10000;
                }
                :host(.open) {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0,0,0,0.5);
                }
                .dialog {
                    position: relative;
                    background: var(--card-bg, #fff);
                    color: var(--text-color, #333);
                    border-radius: 8px;
                    box-shadow: 0 8px 32px rgba(0,0,0,0.3);
                    min-width: 350px;
                    max-width: 500px;
                    max-height: 80vh;
                    overflow-y: auto;
                    z-index: 1;
                }
                .dialog-header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 16px 20px;
                    border-bottom: 1px solid var(--border-color, #dee2e6);
                    font-weight: 600;
                    font-size: 16px;
                }
                .dialog-header .close-btn {
                    cursor: pointer;
                    font-size: 20px;
                    opacity: 0.6;
                    transition: opacity 0.2s;
                }
                .dialog-header .close-btn:hover {
                    opacity: 1;
                }
                .dialog-body {
                    padding: 16px 20px;
                }
                .item-properties {
                    margin-bottom: 16px;
                }
                .item-properties:last-child {
                    margin-bottom: 0;
                }
                .item-header {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    margin-bottom: 12px;
                    padding-bottom: 8px;
                    border-bottom: 1px solid var(--border-color, #dee2e6);
                }
                .item-header i {
                    font-size: 32px;
                    color: var(--accent-color, #0d6efd);
                }
                .item-header .item-name {
                    font-weight: 600;
                    font-size: 15px;
                    word-break: break-all;
                }
                .item-header .item-type {
                    font-size: 12px;
                    opacity: 0.6;
                    text-transform: capitalize;
                }
                .property-row {
                    display: flex;
                    justify-content: space-between;
                    padding: 6px 0;
                    font-size: 13px;
                }
                .property-row .label {
                    opacity: 0.7;
                }
                .property-row .value {
                    font-weight: 500;
                    text-align: right;
                    max-width: 60%;
                    word-break: break-all;
                }
            </style>
            <div class="overlay"></div>
            <div class="dialog">
                <div class="dialog-header">
                    <span>Properties</span>
                    <i class="mdi mdi-close close-btn"></i>
                </div>
                <div class="dialog-body" id="dialog-body">
                </div>
            </div>
        `;
        
        // Close handlers
        this.shadowRoot.querySelector('.overlay').addEventListener('click', () => this.close());
        this.shadowRoot.querySelector('.close-btn').addEventListener('click', () => this.close());
        
        // Listen for show-properties events
        window.addEventListener('show-properties', (e) => {
            this.items = e.detail.items || [];
            this.render();
            this.open();
        });
    }
    
    open() {
        this.classList.add('open');
    }
    
    close() {
        this.classList.remove('open');
    }
    
    formatSize(bytes) {
        if (!bytes || bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
    
    formatDate(dateStr) {
        if (!dateStr) return 'Unknown';
        try {
            return new Date(dateStr).toLocaleString();
        } catch {
            return dateStr;
        }
    }
    
    render() {
        const body = this.shadowRoot.getElementById('dialog-body');
        body.innerHTML = '';
        
        this.items.forEach(item => {
            const div = document.createElement('div');
            div.className = 'item-properties';
            div.innerHTML = `
                <div class="item-header">
                    <i class="mdi ${item.icon || 'mdi-file'}"></i>
                    <div>
                        <div class="item-name">${item.name}</div>
                        <div class="item-type">${item.type || 'file'}</div>
                    </div>
                </div>
                <div class="property-row">
                    <span class="label">Path</span>
                    <span class="value">${item.path}</span>
                </div>
                ${item.size ? `
                <div class="property-row">
                    <span class="label">Size</span>
                    <span class="value">${this.formatSize(item.size)}</span>
                </div>
                ` : ''}
                ${item.modified ? `
                <div class="property-row">
                    <span class="label">Modified</span>
                    <span class="value">${this.formatDate(item.modified)}</span>
                </div>
                ` : ''}
                ${item.w && item.h ? `
                <div class="property-row">
                    <span class="label">Dimensions</span>
                    <span class="value">${item.w} × ${item.h}</span>
                </div>
                ` : ''}
            `;
            body.appendChild(div);
        });
        
        // Add close on Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.close();
        }, { once: true });
    }
}

customElements.define('properties-dialog', PropertiesDialog);

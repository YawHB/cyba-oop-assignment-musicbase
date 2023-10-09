import { ItemRenderer } from "./ItemRenderer.js";
export class TrackRenderer extends ItemRenderer {
    constructor(item) {
        super();
        this.item = item;
    }
    renderHTML() {
        const html = `
        
        `;
        return html;
    }
    postRender(lastElementChild) {
    }
}

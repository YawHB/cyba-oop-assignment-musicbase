import ItemRenderer from "./ItemRenderer.js";
export default class ArtistRenderer extends ItemRenderer {
    constructor(item) {
        super();
        this.item = item;
    }
    renderHTML() {
        return `
         <article class="artist-card">
        <div class="artist-card-image">
            <img src="${this.item.image}" alt="${this.item.name}">
        </div>
        <div class="artist-card-content">
            <h4>${this.item.name}</h4>
        </div>
        </article>
        
        `;
    }
    postRender(lastElementChild) {
    }
}

import ItemRenderer from "./ItemRenderer.js";
import ArtistDialog from "./ArtistDialog.js";
export default class ArtistRenderer extends ItemRenderer {
    item;
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
    async postRender(lastElementChild) {
        lastElementChild.addEventListener('click', () => {
            new ArtistDialog().details(this.item);
        });
    }
}

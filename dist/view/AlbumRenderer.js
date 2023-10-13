import ItemRenderer from "./ItemRenderer.js";
import AlbumDialog from "./AlbumDialog.js";
export default class AlbumRenderer extends ItemRenderer {
    item;
    constructor(item) {
        super();
        this.item = item;
    }
    renderHTML() {
        return `
        <article class="album-card">
        <div class="album-card-image">
            <img src="${this.item.image}" alt="${this.item.title}">
        </div>
        <div class="album-card-content">
            <h4>${this.item.title}</h4>
            <p>${this.item.yearOfRelease}</p>
        </div>
        </article>
        
        `;
    }
    async postRender(lastElementChild) {
        lastElementChild.addEventListener("click", () => {
            console.log(this.item);
            new AlbumDialog().details(this.item);
        });
    }
}

import Album from "../model/Album.js";
import ItemRenderer from "./ItemRenderer.js";

export default class AlbumRenderer extends ItemRenderer {
    constructor(item: Album) {
        super();
        this.item = item;
    }
    public renderHTML(): string {
        return /*html*/ `
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

    public postRender(lastElementChild: Element): void {
        //TODO Tilføj eventlisteners
    }
}

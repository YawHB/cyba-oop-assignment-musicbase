import Album from "../model/Album.js";
import ItemRenderer from "./ItemRenderer.js";
import AlbumDialog from "./AlbumDialog.js";

export default class AlbumRenderer extends ItemRenderer {
    public override item: Album;

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
        lastElementChild.addEventListener("click", () => {
            // TODO RENDER DIALOG CONTENT
            new AlbumDialog().details(this.item);
        });
    }
}

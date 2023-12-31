import Artist from "../model/Artist.js";
import ItemRenderer from "./ItemRenderer.js";
import ArtistDialog from "./ArtistDialog.js";

export default class ArtistRenderer extends ItemRenderer {
    public override item: Artist

    constructor(item: Artist) {
        super();
        this.item = item;
    }

    public renderHTML(): string {
        return /*html*/ `
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

    public async postRender(lastElementChild: Element): Promise<void> {
        lastElementChild.addEventListener('click', () => {
            new ArtistDialog().details(this.item);
        });
    }
}

import Artist from "./Artist.js";
import ItemRenderer from "./ItemRenderer.js";

export default class ArtistRenderer extends ItemRenderer {
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

    public postRender(lastElementChild: Element): void {
        //TODO Tilføj eventlisteners
    }
}

import { Artist } from "./Artist.js";
import { ItemRenderer } from "./ItemRenderer.js";

export class ArtistRenderer extends ItemRenderer {
    declare item: Artist;

    constructor(item: any) {
        super();
        this.item = item;
    }
    public renderHTML(): string {
        const html = /*html*/ `
        
        `;
        return html;
    }

    public postRenderer(lastElementChild: Element): void {
        //TODO Tilføj eventlisteners
    }
}

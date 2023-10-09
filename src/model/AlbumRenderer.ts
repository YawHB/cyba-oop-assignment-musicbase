import { Album } from "./Album.js";
import { ItemRenderer } from "./ItemRenderer.js";

export class AlbumRenderer extends ItemRenderer {
    declare item: Album;

    constructor(item: any) {
        super();
        this.item = item;
    }
    public renderHTML(): string {
        const html = /*html*/ `
        
        `;
        return html;
    }

    public postRender(lastElementChild: Element): void {
        //TODO Tilføj eventlisteners
    }
}

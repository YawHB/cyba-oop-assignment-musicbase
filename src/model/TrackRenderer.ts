import Artist from "./Artist.js";
import ItemRenderer from "./ItemRenderer.js";

export class TrackRenderer extends ItemRenderer {
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

    public postRender(lastElementChild: Element): void {
        //TODO Tilføj eventlisteners
    }
}

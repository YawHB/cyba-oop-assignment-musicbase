import Artist from "../model/Artist.js";
import ItemRenderer from "./ItemRenderer.js";

export default class TrackRenderer extends ItemRenderer {
    // declare item: Track;

    constructor(item: Track) {
        super();
        this.item = item;
    }
    public renderHTML(): string {
        return /*html*/ `

        <tr>
            <td>${this.item.title}</td>
            <td>${this.item.getDuration()}</td>
            <td>${this.item.artists}</td>
            <td>${this.item.albums}</td>
        </tr>
        
        `;
    }

    public postRender(lastElementChild: Element): void {
        //TODO Tilføj eventlisteners
    }
}

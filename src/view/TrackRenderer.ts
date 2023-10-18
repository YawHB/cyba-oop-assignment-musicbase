import Track from "../model/Track.js";
import ItemRenderer from "./ItemRenderer.js";
import TrackDialog from "./TrackDialog.js";

export default class TrackRenderer extends ItemRenderer {
    public override item: Track;

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
        lastElementChild.addEventListener("click", () => {
            new TrackDialog().details(this.item);
        });
    }
}

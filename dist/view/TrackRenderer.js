import ItemRenderer from "./ItemRenderer.js";
import TrackDialog from "./TrackDialog.js";
export default class TrackRenderer extends ItemRenderer {
    item;
    constructor(item) {
        super();
        this.item = item;
    }
    renderHTML() {
        return `

        <tr>
            <td>${this.item.title}</td>
            <td>${this.item.getDuration()}</td>
            <td>${this.item.artists}</td>
            <td>${this.item.albums}</td>
        </tr>
        
        `;
    }
    postRender(lastElementChild) {
        lastElementChild.addEventListener("click", () => {
            new TrackDialog().details(this.item);
        });
    }
}

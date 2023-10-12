import Dialog from "./Dialog.js";
import DataHandler from "../components/dataHandler.js";
import { trackRenders } from "../app.js";
export default class TrackDialog extends Dialog {
    async renderHTML(html) {
        Dialog.clear();
        Dialog.open();
        Dialog.dialogContent.insertAdjacentHTML('beforeend', html);
    }
    async postRender(item) {
        try {
            const updateButton = document.querySelector(".track-dialog-update-button");
            const deleteButton = document.querySelector(".track-dialog-delete-button");
            if (!updateButton || !deleteButton) {
                throw new Error("No buttons found");
            }
            updateButton.addEventListener("click", () => {
                this.update(item);
            });
            deleteButton.addEventListener("click", () => {
                this.delete(item);
            });
        }
        catch (error) {
            console.error(error.message);
        }
    }
    async create() {
        console.log("create track");
    }
    async delete(item) {
        try {
            await DataHandler.deleteData("tracks", item.getId());
            const index = DataHandler.tracksArr.indexOf(item);
            DataHandler.tracksArr.splice(index, 1);
            Dialog.close();
            trackRenders.setList(DataHandler.tracksArr);
            trackRenders.clearList();
            trackRenders.renderList();
        }
        catch (error) {
            console.error(error.message);
        }
    }
    async details(item) {
        try {
            const html = `
                <article class="track-details">
                <h2>${item.title}</h2>
                <h3>Track Details</h3>
                <p>Artist: ${item.artists}</p>
                <p>Album: ${item.albums}</p>
                <p>Duration: ${item.getDuration()}</p>
                
                <div class="track-dialog-buttons">
                    <button class="track-dialog-update-button">Update</button>
                    <button class="track-dialog-delete-button">Delete</button>
                </div>
                </article>
                `;
            await this.renderHTML(html);
            await this.postRender(item);
        }
        catch (error) {
            console.error(error.message);
        }
    }
    async update(item) {
        console.log("update track");
    }
}

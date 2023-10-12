import Dialog from "./Dialog.js";
import Track from "../model/Track.js";
import DataHandler from "../components/dataHandler.js";
import {trackRenders} from "../app.js";

export default class TrackDialog extends Dialog {

    protected async renderHTML( html: string): Promise<void> {
        Dialog.clear()
        Dialog.open()
        Dialog.dialogContent.insertAdjacentHTML('beforeend', html)
    }

    protected async postRender(item: Track): Promise<void> {
        try {

            const updateButton = document.querySelector(".track-dialog-update-button") as HTMLButtonElement;
            const deleteButton = document.querySelector(".track-dialog-delete-button") as HTMLButtonElement;

            if (!updateButton || !deleteButton) {
                throw new Error("No buttons found");
            }

            updateButton.addEventListener("click", () => {
                this.update(item);
            });
            deleteButton.addEventListener("click", () => {
                this.delete(item);
            });
            } catch (error) {
            console.error((error as Error).message);
        }
    }

    async create(): Promise<void> {
        console.log("create track")
    }

    async delete(item: Track): Promise<void> {
        try {
            await DataHandler.deleteData("tracks", item.getId());
            const index = DataHandler.tracksArr.indexOf(item);
            DataHandler.tracksArr.splice(index, 1);
            Dialog.close();
            // render tracks list again
            trackRenders.setList(DataHandler.tracksArr);
            trackRenders.clearList();
            trackRenders.renderList();

        } catch (error) {
            console.error((error as Error).message);
        }
    }

    public async details(item: Track): Promise<void> {
        try {
            const html = /*html*/ `
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


        } catch (error) {
            console.error((error as Error).message);
        }
    }

    async update(item: Track): Promise<void> {
        console.log("update track")
    }


}
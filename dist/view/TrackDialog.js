import Dialog from "./Dialog.js";
import Track from "../model/Track.js";
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
        const createFormHTML = `
        <h2>Create Track</h2>
        <form class="create-track-form">
            <div class="create-form-content">
                <label for="trackTitle">Title</label>
                <input type=text name="trackTitle" id="trackTitle" value="">
                <label for="duration">Duration</label>
                <input type=text name="duration" id="duration" value="">
                <label for="artists">Artist</label>
                <input type=text name="artists" id="artists" value="">
                <label for="albums">Album</label>
                <input type=text name="albums" id="albums" value="">
            </div>
            <input type="submit" value="Submit track" />
        </form>
        `;
        await this.renderHTML(createFormHTML);
        Dialog.dialogContent.querySelector(".create-track-form")?.addEventListener("submit", async (event) => {
            event.preventDefault();
            const form = event.target;
            const title = form.trackTitle.value;
            const duration = parseInt(form.duration.value);
            const artists = form.artists.value;
            const albums = form.albums.value;
            const newTrackId = await DataHandler.postData("tracks", { title, duration, artists, albums });
            const instancedTrack = new Track(title, duration, artists, albums, newTrackId);
            DataHandler.tracksArr.push(instancedTrack);
            Dialog.close();
            trackRenders.setList(DataHandler.tracksArr);
            trackRenders.clearList();
            trackRenders.renderList();
        });
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
        const updateFormHTML = `
        <h2>Update Track</h2>
        <form class="update-track-form" id="trackId-${item.getId()}">
            <div class="update-form-content">
                <label for="trackTitle">Title</label>
                <input type=text name="trackTitle" id="trackTitle" value="${item.title}">
                <label for="duration">Duration</label>
                <input type=text name="duration" id="duration" value="${item.duration}">
                <label for="artists">Artist</label>
                <input type=text name="artists" id="artists" value="${item.artists}">
                <label for="albums">Album</label>
                <input type=text name="albums" id="albums" value="${item.albums}"> 
            </div>
            <input type="submit" value="Submit track" />
        </form>
        `;
        await this.renderHTML(updateFormHTML);
        Dialog.dialogContent.querySelector(`#trackId-${item.getId()}`)?.addEventListener("submit", async (event) => {
            event.preventDefault();
            const form = event.target;
            const title = form.trackTitle.value;
            const duration = parseInt(form.duration.value);
            const artists = form.artists.value;
            const albums = form.albums.value;
            const response = await DataHandler.putData("tracks", item.getId(), { title, duration, artists, albums });
            console.log(response);
            const index = DataHandler.tracksArr.indexOf(item);
            DataHandler.tracksArr[index] = new Track(title, duration, artists, albums, item.getId());
            Dialog.close();
            trackRenders.setList(DataHandler.tracksArr);
            trackRenders.clearList();
            trackRenders.renderList();
        });
    }
}

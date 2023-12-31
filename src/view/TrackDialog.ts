import Dialog from "./Dialog.js";
import Track from "../model/Track.js";
import DataHandler from "../utility/DataHandler.js";
import Artist from "../model/Artist.js";
import Album from "../model/Album.js";
import { createTrack, deleteTrack, updateTrack } from "../controller/track.controller.js";

export default class TrackDialog extends Dialog {

    protected async postRender(type: string, item?: Track): Promise<void> {
        switch (type) {
            case "details":
                const updateButton = Dialog.dialogContent.querySelector(".track-dialog-update-button") as HTMLButtonElement;
                const deleteButton = Dialog.dialogContent.querySelector(".track-dialog-delete-button") as HTMLButtonElement;
                if (!updateButton || !deleteButton) {
                    throw new Error("No buttons found");
                }
                updateButton.addEventListener("click", () => {
                    this.update(item!);
                });
                deleteButton.addEventListener("click", () => {
                    this.delete(item!);
                });
                break;
        
            case "create":
                const createTrackForm = Dialog.dialogContent.querySelector(".create-track-form") as HTMLFormElement;
                createTrackForm.addEventListener("submit", createTrack);
                break;
            case "delete":
                const confirmButton = Dialog.dialogContent.querySelector("#track-dialog-delete-confirm-button") as HTMLButtonElement;
                const cancelButton = Dialog.dialogContent.querySelector("#track-dialog-delete-cancel-button") as HTMLButtonElement;

                confirmButton.addEventListener("click", () => {
                    deleteTrack(item!);
                });
                cancelButton.addEventListener("click", () => {
                    Dialog.clear();
                    Dialog.close();
                });
                break;
            case "update":
                const updateTrackForm = Dialog.dialogContent.querySelector(`#trackid-${item!.getId()}`) as HTMLFormElement;
                updateTrackForm.addEventListener("submit", updateTrack);
        }
    }

    async create(): Promise<void> {
        const createFormHTML = /*html*/ `
        <h2>Create Track</h2>
        <form class="create-track-form">
            <div class="create-form-content">
                <label for="trackTitle">Title</label>
                <input type=text name="trackTitle" id="trackTitle" value="">
                <label for="duration">Duration</label>
                <input type=text name="duration" id="duration" placeholder="MM:SS" value="">
                <label for="artists">Artist</label>
                <input type=text name="artists" id="artists" value="">
                <label for="albums">Album</label>
                <input type=text name="albums" id="albums" value="">
            </div>
            <button type="submit">Submit track </button>
        </form>
        `;

        await this.renderHTML(createFormHTML);
        await this.postRender("create");
    }

    async delete(item: Track): Promise<void> {
        const html = /*html*/ `
        <h2>Are you sure you want to delete ${item.title}?</h2>

        <button id="track-dialog-delete-confirm-button">Yes</button>
        <button id="track-dialog-delete-cancel-button">Cancel</button>
        `;

        await this.renderHTML(html);
        await this.postRender("delete", item);
    }

    public async details(item: Track): Promise<void> {
        try {
            const html = /*html*/ `
                <article class="track-dialog">
                <h2>${item.title}</h2>
                <div class="track-dialog-details-info">
                <p>Artist: ${item.artists}</p>
                <p>Album: ${item.albums}</p>
                <p>Duration: ${item.getDuration()}</p>
                </div>
                <div class="track-dialog-buttons">
                    <button class="track-dialog-update-button">Update</button>
                    <button class="track-dialog-delete-button">Delete</button>
                </div>
                </article>
                `;

            await this.renderHTML(html);
            await this.postRender("details", item);
        } catch (error) {
            console.error((error as Error).message);
        }
    }

    async update(item: Track): Promise<void> {
        const updateFormHTML = /*html*/ `
        <h2>Update Track</h2>
        <form class="update-track-form" id="trackid-${item.getId()}">
            <div class="update-form-content">
                <label for="trackTitle">Title</label>
                <input type=text name="trackTitle" id="trackTitle" value="${item.title}">
                <label for="duration">Duration</label>
                <input type=text name="duration" id="duration" placeholder="MM:SS" value="${item.getDuration()}">
                <label for="artists">Artist</label>
                <select multiple name="artists" required id="artist-select">
                <!-- Insert artists from global array --> 
                </select>
                <label for="albums">Album</label>
                <select multiple name="albums" required id="album-select">
                <!-- Insert albums from global array -->
                </select>
            </div>
            <input type="submit" value="Submit track" />
        </form>
        `;

        await this.renderHTML(updateFormHTML);
        this.populateDropdown(DataHandler.artistsArr, "artist", item);
        this.populateDropdown(DataHandler.albumsArr, "album", item);
        await this.postRender("update", item);
    }

    private populateDropdown(globalArr: (Artist | Album)[], type: string, track: Track) {
        let html: string;

        const dropdown = Dialog.dialogContent.querySelector(`#${type}-select`);

        globalArr.map(item => {
            if (type === "artist") {
                const hasArtist = track.artists.includes(item.name);

                html = /*html*/ `
            <option value="${item.name}" ${hasArtist ? "selected" : ""}>${item.name}</option>
            `;
            }
            if (type === "album") {
                const hasAlbum = track.albums.includes(item.title);

                html = /*html*/ `
            <option value="${item.title}" ${hasAlbum ? "selected" : ""}>${item.title}</option>
            `;
            }

            dropdown?.insertAdjacentHTML("beforeend", html);
        });
    }
}
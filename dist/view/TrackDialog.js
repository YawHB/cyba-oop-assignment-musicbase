var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Dialog from "./Dialog.js";
import DataHandler from "../components/dataHandler.js";
import Artist from "../model/Artist.js";
import { createTrack, deleteTrack, updateTrack } from "../controller/track.controller.js";
export default class TrackDialog extends Dialog {
    postRender(type, item) {
        return __awaiter(this, void 0, void 0, function* () {
            switch (type) {
                case "details":
                    const updateButton = Dialog.dialogContent.querySelector(".track-dialog-update-button");
                    const deleteButton = Dialog.dialogContent.querySelector(".track-dialog-delete-button");
                    if (!updateButton || !deleteButton) {
                        throw new Error("No buttons found");
                    }
                    updateButton.addEventListener("click", () => {
                        this.update(item);
                    });
                    deleteButton.addEventListener("click", () => {
                        this.delete(item);
                    });
                    break;
                case "create":
                    const createTrackForm = Dialog.dialogContent.querySelector(".create-track-form");
                    createTrackForm.addEventListener("submit", createTrack);
                    break;
                case "delete":
                    const confirmButton = Dialog.dialogContent.querySelector("#track-dialog-delete-confirm-button");
                    const cancelButton = Dialog.dialogContent.querySelector("#track-dialog-delete-cancel-button");
                    confirmButton.addEventListener("click", () => {
                        deleteTrack(item);
                    });
                    cancelButton.addEventListener("click", () => {
                        Dialog.clear();
                        Dialog.close();
                    });
                    break;
                case "update":
                    const updateTrackForm = Dialog.dialogContent.querySelector(`#trackid-${item.getId()}`);
                    updateTrackForm.addEventListener("submit", updateTrack);
            }
        });
    }
    create() {
        return __awaiter(this, void 0, void 0, function* () {
            const createFormHTML = `
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
            <input type="submit" value="Submit track" />
        </form>
        `;
            yield this.renderHTML(createFormHTML);
            yield this.postRender("create");
        });
    }
    delete(item) {
        return __awaiter(this, void 0, void 0, function* () {
            const html = `
        <h2>Are you sure you want to delete ${item.title}?</h2>

        <button id="track-dialog-delete-confirm-button">Yes</button>
        <button id="track-dialog-delete-cancel-button">Cancel</button>
        `;
            yield this.renderHTML(html);
            yield this.postRender("delete", item);
        });
    }
    details(item) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(item);
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
                yield this.renderHTML(html);
                yield this.postRender("details", item);
            }
            catch (error) {
                console.error(error.message);
            }
        });
    }
    update(item) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateFormHTML = `
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
            yield this.renderHTML(updateFormHTML);
            this.populateDropdown(DataHandler.artistsArr);
            this.populateDropdown(DataHandler.albumsArr);
            yield this.postRender("update", item);
        });
    }
    populateDropdown(globalArr) {
        let type;
        let html;
        globalArr.every(item => item instanceof Artist)
            ? (type = "artist")
            : (type = "album");
        const dropdown = document.querySelector(`#${type}-select`);
        globalArr.map(item => {
            if (type === "artist") {
                html = `
            <option value="${item.name}">${item.name}</option>
            `;
            }
            else {
                html = `
            <option value="${item.title}">${item.title}</option>
            `;
            }
            dropdown === null || dropdown === void 0 ? void 0 : dropdown.insertAdjacentHTML("beforeend", html);
        });
    }
}

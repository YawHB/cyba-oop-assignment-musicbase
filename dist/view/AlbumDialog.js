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
import { createAlbum, deleteAlbum, updateAlbum } from "../controller/album.controller.js";
export default class AlbumDialog extends Dialog {
    postRender(type, item) {
        return __awaiter(this, void 0, void 0, function* () {
            switch (type) {
                case "details":
                    const updateButton = Dialog.dialogContent.querySelector(".album-dialog-update-button");
                    const deleteButton = Dialog.dialogContent.querySelector(".album-dialog-delete-button");
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
                    const createAlbumForm = Dialog.dialogContent.querySelector(".create-album-form");
                    createAlbumForm.addEventListener("submit", createAlbum);
                    break;
                case "delete":
                    const confirmButton = Dialog.dialogContent.querySelector("#album-dialog-delete-confirm-button");
                    const cancelButton = Dialog.dialogContent.querySelector("#album-dialog-delete-cancel-button");
                    confirmButton.addEventListener("click", () => {
                        deleteAlbum(item);
                    });
                    cancelButton.addEventListener("click", () => {
                        Dialog.clear();
                        Dialog.close();
                    });
                    break;
                case "update":
                    const updateAlbumForm = Dialog.dialogContent.querySelector(".update-album-form");
                    updateAlbumForm.addEventListener("submit", updateAlbum);
                    break;
            }
        });
    }
    create() {
        return __awaiter(this, void 0, void 0, function* () {
            const createFormHTML = `
        <h2>Create Album</h2>
        
        <form class="create-album-form">
            <div class="create-form-content">
                <label for="albumTitle">Title</label>
                <input type=text name="albumTitle" id="albumTitle" required>
                <label for="image">Image</label>
                <input type=text name="image" id="image" required>
                <label for="yearOfRelease">Year of release</label>
                <input type=text name="yearOfRelease" id="yearOfRelease" required>
                <label for="artist">Artist</label>
                <input type=text name="artist" id="artist" required>
                <button type="submit">Submit album</button>
            </div>
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

        <button id="album-dialog-delete-confirm-button">Yes</button>
        <button id="album-dialog-delete-cancel-button">Cancel</button>
        `;
            yield this.renderHTML(html);
            yield this.postRender("delete", item);
        });
    }
    details(item) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const albumData = yield DataHandler.getAllAlbumData(item.getId());
                if (!albumData) {
                    throw new Error("No album data found");
                }
                console.log(albumData.tracks);
                const html = `
        <article class="album-details">
        <h2>${albumData.title}</h2>
        <div class="album-details-image">
            <img src="${albumData.image}" alt="${albumData.title}">
        </div>
        <div class="album-details-content">
            <h3>Album Details</h3>
            <p>Artist: ${albumData.artists.length === 1 ? albumData.artists[0].name : albumData.artists.map((item) => ` ${item.name}`)}</p>
            <p>Year of release: ${albumData.yearOfRelease}</p>
            <h3>Tracks</h3>
            <ul>
            ${albumData.tracks
                    .map((track) => {
                    const foundTrack = DataHandler.tracksArr.find((instanciatedTrack) => instanciatedTrack.getId() === track.id);
                    return `<li>${foundTrack === null || foundTrack === void 0 ? void 0 : foundTrack.title} - ${foundTrack === null || foundTrack === void 0 ? void 0 : foundTrack.getDuration()} - ${foundTrack === null || foundTrack === void 0 ? void 0 : foundTrack.artists}</li>`;
                })
                    .join("")}
            </ul>
        </div>
        <div class="album-dialog-buttons">
            <button class="album-dialog-update-button">Update</button>
            <button class="album-dialog-delete-button">Delete</button>
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
            const albumData = yield DataHandler.getAllAlbumData(item.getId());
            if (!albumData) {
                throw new Error("No album data found");
            }
            const updateFormHTML = `
        <h2>Update Album</h2>
        <form class="update-album-form" id="albumId-${item.getId()}">
            <div class="update-form-content">
                <label for="albumTitle">Title</label>

                <input type=text name="albumTitle" id="albumTitle" value="${albumData.title}">

                <label for="image">Image</label>
                <input type=text name="image" id="image" value="${albumData.image}">
                <label for="yearOfRelease">Year of release</label>

                <input type=text name="yearOfRelease" id="yearOfRelease" value="${albumData.yearOfRelease}">
                <label for="artist">Artist</label> 
                <input type=text name="artist" id="artist" value="${albumData.artists.length === 1 ? albumData.artists[0].name : albumData.artists.join(", ").name}">
                <button type="submit">Update album</button>

            </div>
        </form>
        `;
            yield this.renderHTML(updateFormHTML);
            yield this.postRender("update");
        });
    }
}

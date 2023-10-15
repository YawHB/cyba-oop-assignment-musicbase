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
import { createArtist, deleteArtist, updateArtist } from "../controller/artist.controller.js";
export default class ArtistDialog extends Dialog {
    postRender(type, item) {
        return __awaiter(this, void 0, void 0, function* () {
            switch (type) {
                case "details":
                    const updateButton = Dialog.dialogContent.querySelector(".artist-dialog-details-update-button");
                    const deleteButton = Dialog.dialogContent.querySelector(".artist-dialog-details-delete-button");
                    updateButton.addEventListener("click", () => {
                        this.update(item);
                    });
                    deleteButton.addEventListener("click", () => {
                        this.delete(item);
                    });
                    break;
                case "delete":
                    const confirmButton = Dialog.dialogContent.querySelector("#artist-dialog-delete-confirm-button");
                    const cancelButton = Dialog.dialogContent.querySelector("#artist-dialog-delete-cancel-button");
                    confirmButton.addEventListener("click", () => {
                        deleteArtist(item);
                    });
                    cancelButton.addEventListener("click", () => {
                        Dialog.clear();
                        Dialog.close();
                    });
                    break;
                case "create":
                    const createArtistForm = Dialog.dialogContent.querySelector(".create-artist-form");
                    createArtistForm.addEventListener("submit", createArtist);
                    break;
                case "update":
                    const updateArtistForm = Dialog.dialogContent.querySelector(".update-artist-form");
                    updateArtistForm.addEventListener("submit", updateArtist);
            }
        });
    }
    create() {
        return __awaiter(this, void 0, void 0, function* () {
            const html = `
        <h2>Create Artist</h2>

        <form class="create-artist-form">
            <div class="create-form-content">
                <label for="artistName">Name</label>
                <input type=text name="artistName" id="artistName" value="">
                <label for="image">Image</label>
                <input type=text name="image" id="image" value="">
            </div>

            <button type="submit">Submit artist</button>
        </form>
        `;
            yield this.renderHTML(html);
            yield this.postRender("create");
        });
    }
    delete(item) {
        return __awaiter(this, void 0, void 0, function* () {
            const html = `
        <h2>Are you sure you want to delete ${item.name}?</h2>

        <button id="artist-dialog-delete-confirm-button">Yes</button>
        <button id="artist-dialog-delete-cancel-button">Cancel</button>
        `;
            yield this.renderHTML(html);
            yield this.postRender("delete", item);
        });
    }
    details(item) {
        return __awaiter(this, void 0, void 0, function* () {
            const artistAlbums = yield DataHandler.getAllAlbumsByArtistId(item.getId());
            const html = `
        <article class="artist-dialog">
            <h2>${item.name}</h2>
            <img src="${item.image}" alt="${item.name}">
            <h3>Albums</h3>
            <ul>
            ${artistAlbums
                .map((album) => {
                return `
                <li>${album.title}</li>`;
            })
                .join("")}
            </ul>
        
            <div class="artist-dialog-buttons">
                <button class="artist-dialog-details-update-button">Update</button>
                <button class="artist-dialog-details-delete-button">Delete</button>
            </div>
        </article>
        `;
            yield this.renderHTML(html);
            yield this.postRender("details", item);
        });
    }
    update(item) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("update");
            const html = `

        <h2>Update Artist</h2>

        <form class="update-artist-form" id="artistId-${item.getId()}">
            <div class="update-form-content">
                <label for="artistName"></label>
                 <input type=text name="artistName" id="artistName" value="${item.name}">
                <label for="image"></label>
                 <input type=text name="image" id="image" value="${item.image}">
            </div>
            <input type="submit" value="Confirm">

        </form>
        `;
            yield this.renderHTML(html);
            yield this.postRender("update");
        });
    }
}

import Dialog from "./Dialog.js";
import DataHandler from "../components/dataHandler.js";
import { albumRenders } from "../app.js";
export default class AlbumDialog extends Dialog {
    async renderHTML(html) {
        Dialog.clear();
        Dialog.open();
        Dialog.dialogContent.insertAdjacentHTML('beforeend', html);
    }
    async postRender(item) {
        try {
            const updateButton = document.querySelector(".album-dialog-update-button");
            const deleteButton = document.querySelector(".album-dialog-delete-button");
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
        console.log("create album");
    }
    async delete(item) {
        try {
            await DataHandler.deleteData("albums", item.getId());
            const index = DataHandler.albumsArr.findIndex((album) => album.getId() === item.getId());
            DataHandler.albumsArr.splice(index, 1);
            Dialog.close();
            albumRenders.setList(DataHandler.albumsArr);
            albumRenders.clearList();
            albumRenders.renderList();
        }
        catch (error) {
            console.error(error.message);
        }
    }
    async details(item) {
        try {
            const albumData = await DataHandler.getAllAlbumData(item.getId());
            if (!albumData) {
                throw new Error("No album data found");
            }
            const html = `
        <article class="album-details">
        <h2>${albumData.title}</h2>
        <div class="album-details-image">
            <img src="${albumData.image}" alt="${albumData.title}">
        </div>
        <div class="album-details-content">
            <h3>Album Details</h3>
            <p>Artist: ${albumData.artists.length === 1 ? albumData.artists[0].name : albumData.artists.join(", ").name}</p>
            <p>Year of release: ${albumData.yearOfRelease}</p>
            <h3>Tracks</h3>
            <ul>
            ${albumData.tracks.map((track) => `<li>${track.title}</li>`).join("")}
            </ul>
        </div>
        <div class="album-dialog-buttons">
            <button class="album-dialog-update-button">Update</button>
            <button class="album-dialog-delete-button">Delete</button>
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
        console.log("update");
    }
}

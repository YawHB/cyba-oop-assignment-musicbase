import Dialog from "./Dialog.js";
import Album from "../model/Album.js";
import Track from "../model/Track.js";
import DataHandler from "../components/dataHandler.js";
import { albumRenders } from "../app.js";
import { createAlbum, deleteAlbum, updateAlbum } from "../controller/album.controller.js";

export default class AlbumDialog extends Dialog {
    protected async postRender(type: string, item?: Album): Promise<void> {
        switch (type) {
            case "details":
                const updateButton = Dialog.dialogContent.querySelector(".album-dialog-update-button") as HTMLButtonElement;
                const deleteButton = Dialog.dialogContent.querySelector(".album-dialog-delete-button") as HTMLButtonElement;

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
                const createAlbumForm = Dialog.dialogContent.querySelector(".create-album-form") as HTMLFormElement;
                createAlbumForm.addEventListener("submit", createAlbum);

                break;
            case "delete":
                const confirmButton = Dialog.dialogContent.querySelector("#album-dialog-delete-confirm-button") as HTMLButtonElement;
                const cancelButton = Dialog.dialogContent.querySelector("#album-dialog-delete-cancel-button") as HTMLButtonElement;

                confirmButton.addEventListener("click", () => {
                    deleteAlbum(item!);
                });
                cancelButton.addEventListener("click", () => {
                    Dialog.clear();
                    Dialog.close();
                });
                break;
            case "update":
                const updateAlbumForm = Dialog.dialogContent.querySelector(".update-album-form") as HTMLFormElement;
                updateAlbumForm.addEventListener("submit", updateAlbum);
                break;
        }
    }

    public async create(): Promise<void> {
        const createFormHTML = /*html*/ `
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

        await this.renderHTML(createFormHTML);
        await this.postRender("create");
    }

    public async delete(item: Album): Promise<void> {
        const html = /*html*/ `
        <h2>Are you sure you want to delete ${item.title}?</h2>

        <button id="album-dialog-delete-confirm-button">Yes</button>
        <button id="album-dialog-delete-cancel-button">Cancel</button>
        `;

        await this.renderHTML(html);
        await this.postRender("delete", item);
    }

    public async details(item: Album): Promise<void> {
        try {
            const albumData = await DataHandler.getAllAlbumData(item.getId());
            if (!albumData) {
                throw new Error("No album data found");
            }
            console.log(albumData.tracks);
            const html: string = /*html*/ `
        <article class="album-details">
        <h2>${albumData.title}</h2>
        <div class="album-details-image">
            <img src="${albumData.image}" alt="${albumData.title}">
        </div>
        <div class="album-details-content">
            <h3>Album Details</h3>
            <p>Artist: ${albumData.artists.length === 1 ? albumData.artists[0].name : albumData.artists.map((item: { id: number; name: string }) => ` ${item.name}`)}</p>
            <p>Year of release: ${albumData.yearOfRelease}</p>
            <h3>Tracks</h3>
            <ul>
            ${albumData.tracks
                .map((track: { id: number; title: string; duration: number }): string => {
                    const foundTrack = DataHandler.tracksArr.find((instanciatedTrack) => instanciatedTrack.getId() === track.id);
                    return /*html*/ `<li>${foundTrack?.title} - ${foundTrack?.getDuration()} - ${foundTrack?.artists}</li>`;
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

            await this.renderHTML(html);
            await this.postRender("details", item);
        } catch (error) {
            console.error((error as Error).message);
        }
    }

    public async update(item: Album): Promise<void> {
        const albumData = await DataHandler.getAllAlbumData(item.getId());
        if (!albumData) {
            throw new Error("No album data found");
        }

        const updateFormHTML = /*html*/ `
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
                <input type=text name="artist" id="artist" value="${albumData.artists.length === 1 ? albumData.artists[0].name : albumData.artists.map((item: { id: number; name: string }) => ` ${item.name}`)}">
                <button type="submit">Update album</button>

            </div>
        </form>
        `;

        await this.renderHTML(updateFormHTML);
        await this.postRender("update");
    }
}

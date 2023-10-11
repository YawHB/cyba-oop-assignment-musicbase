import Dialog from "./Dialog.js";
import Artist from "../model/Artist.js";
import Album from "../model/Album.js";
import Track from "../model/Track.js";
import DataHandler from "../components/dataHandler.js";
import ArtistRenderer from "./ArtistRenderer.js";
import ListRenderer from "./ListRenderer.js";
import { artistRenders } from "../app.js";

export default class ArtistDialog extends Dialog {
    protected async renderHTML(item: Artist, html: string): Promise<void> {
        Dialog.clear();
        Dialog.open();
        Dialog.dialogContent.insertAdjacentHTML("beforeend", html);
        await this.postRender(item);
    }

    protected async postRender(item: Artist): Promise<void> {
        const updateButton = document.querySelector(
            ".artist-dialog-update-button"
        ) as HTMLButtonElement;
        const deleteButton = document.querySelector(
            ".artist-dialog-delete-button"
        ) as HTMLButtonElement;
        updateButton.addEventListener("click", () => {
            this.update(item);
        });
        deleteButton.addEventListener("click", () => {
            this.delete(item);
        });
    }

    create(item: Artist): void {}

    async delete(item: Artist): Promise<void> {
        await DataHandler.deleteData("artists", item.getId());
        const index: number = DataHandler.artistsArr.indexOf(item);
        console.log(index);
        DataHandler.artistsArr.splice(index, 1);
        Dialog.close();
        // render list again
        artistRenders.setList(DataHandler.artistsArr);
        artistRenders.clearList();
        artistRenders.renderList();
    }

    public async details(item: Artist): Promise<void> {
        const artistAlbums = await DataHandler.getAllAlbumsByArtistId(
            item.getId()
        );
        await this.renderHTML(
            item,
            /*html*/ `
        <article class="artist-dialog">
        <h2>${item.name}</h2>
        <img src="${item.image}" alt="${item.name}">
        <h3>Albums</h3>
        <ul>
        ${artistAlbums
            .map((album: Album) => {
                return /*html*/ `
            <li>${album.title}</li>
            `;
            })
            .join("")}
        </ul>
        
        <div class="artist-dialog-buttons">
        <button class="artist-dialog-update-button">Update</button>
        <button class="artist-dialog-delete-button">Delete</button>
        </div>
        </article>
    `
        );
    }

    async update(item: Artist): Promise<void> {
        await this.renderHTML(
            item,
            /*html*/ `
        
        
        <h2>Update Artist</h2>

        <form class="update-artist-form form">
            <div class="update-form-content">
                <label for="name"></label>
                 <input type=text name="name" id="name" value="${item.name}">


            </div>


        </form>
        `
        );

        console.log("update");
    }
}

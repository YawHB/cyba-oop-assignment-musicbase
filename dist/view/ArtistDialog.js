import Dialog from "./Dialog.js";
import DataHandler from "../components/dataHandler.js";
import { artistRenders } from "../app.js";
export default class ArtistDialog extends Dialog {
    async renderHTML(item, html) {
        Dialog.clear();
        Dialog.open();
        Dialog.dialogContent.insertAdjacentHTML("beforeend", html);
        await this.postRender(item);
    }
    async postRender(item) {
        const updateButton = document.querySelector(".artist-dialog-update-button");
        const deleteButton = document.querySelector(".artist-dialog-delete-button");
        updateButton.addEventListener("click", () => {
            this.update(item);
        });
        deleteButton.addEventListener("click", () => {
            this.delete(item);
        });
    }
    create(item) { }
    async delete(item) {
        await DataHandler.deleteData("artists", item.getId());
        const index = DataHandler.artistsArr.indexOf(item);
        console.log(index);
        DataHandler.artistsArr.splice(index, 1);
        Dialog.close();
        artistRenders.setList(DataHandler.artistsArr);
        artistRenders.clearList();
        artistRenders.renderList();
    }
    async details(item) {
        const artistAlbums = await DataHandler.getAllAlbumsByArtistId(item.getId());
        await this.renderHTML(item, `
        <article class="artist-dialog">
        <h2>${item.name}</h2>
        <img src="${item.image}" alt="${item.name}">
        <h3>Albums</h3>
        <ul>
        ${artistAlbums
            .map((album) => {
            return `
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
    `);
    }
    async update(item) {
        await this.renderHTML(item, `
        
        
        <h2>Update Artist</h2>

        <form class="update-artist-form form">
            <div class="update-form-content">
                <label for="name"></label>
                 <input type=text name="name" id="name" value="${item.name}">


            </div>


        </form>
        `);
        console.log("update");
    }
}

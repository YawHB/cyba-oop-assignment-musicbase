import Dialog from "./Dialog.js";
import DataHandler from "../components/dataHandler.js";
import ArtistRenderer from "./ArtistRenderer.js";
import ListRenderer from "./ListRenderer.js";
export default class ArtistDialog extends Dialog {
    async renderHTML(item, html) {
        Dialog.clear();
        Dialog.open();
        Dialog.dialogContent.insertAdjacentHTML('beforeend', html);
        await this.postRender(item);
    }
    async postRender(item) {
        const updateButton = document.querySelector('.artist-dialog-update-button');
        const deleteButton = document.querySelector('.artist-dialog-delete-button');
        updateButton.addEventListener('click', () => {
            this.update(item);
        });
        deleteButton.addEventListener('click', () => {
            this.delete(item);
        });
    }
    create(item) {
    }
    async delete(item) {
        await DataHandler.deleteData("artists", item.getId());
        const index = DataHandler.artistsArr.indexOf(item);
        console.log(index);
        DataHandler.artistsArr.splice(index, 1);
        Dialog.close();
        const listRenderer = new ListRenderer(DataHandler.artistsArr, "artists-grid", ArtistRenderer);
        listRenderer.clearList();
        listRenderer.renderList();
    }
    async details(item) {
        const artistAlbums = await DataHandler.getAllAlbumsByArtistId(item.getId());
        await this.renderHTML(item, `
        <article class="artist-dialog">
        <h2>${item.name}</h2>
        <img src="${item.image}" alt="${item.name}">
        <h3>Albums</h3>
        <ul>
        ${artistAlbums.map((album) => {
            return `
            <li>${album.title}</li>
            `;
        }).join('')}
        </ul>
        
        <div class="artist-dialog-buttons">
        <button class="artist-dialog-update-button">Update</button>
        <button class="artist-dialog-delete-button">Delete</button>
        </div>
        </article>
    `);
    }
    update(item) {
        console.log('update');
    }
}

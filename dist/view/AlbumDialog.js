import Dialog from "./Dialog.js";
import Album from "../model/Album.js";
import DataHandler from "../components/dataHandler.js";
import { albumRenders } from "../app.js";
export default class AlbumDialog extends Dialog {
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
        await this.renderHTML(createFormHTML);
        Dialog.dialogContent.querySelector(".create-album-form")?.addEventListener("submit", async (event) => {
            event.preventDefault();
            const form = event.target;
            const title = form.albumTitle.value;
            const image = form.image.value;
            const yearOfRelease = parseInt(form.yearOfRelease.value);
            const artist = form.artist.value;
            const newAlbumId = await DataHandler.postData("albums", { title, image, yearOfRelease, artist });
            DataHandler.albumsArr.push(new Album(title, yearOfRelease, image, newAlbumId));
            Dialog.close();
            albumRenders.setList(DataHandler.albumsArr);
            albumRenders.renderList();
        });
    }
    async delete(item) {
        try {
            await DataHandler.deleteData("albums", item.getId());
            const index = DataHandler.albumsArr.findIndex((album) => album.getId() === item.getId());
            DataHandler.albumsArr.splice(index, 1);
            Dialog.close();
            albumRenders.setList(DataHandler.albumsArr);
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
            <p>Artist: ${albumData.artists.length === 1 ? albumData.artists[0].name : albumData.artists.map((item) => ` ${item.name}`)}</p>
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
        const albumData = await DataHandler.getAllAlbumData(item.getId());
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
        await this.renderHTML(updateFormHTML);
        Dialog.dialogContent.querySelector(".update-album-form")?.addEventListener("submit", async (event) => {
            event.preventDefault();
            const form = event.target;
            const title = form.albumTitle.value;
            const image = form.image.value;
            const yearOfRelease = parseInt(form.yearOfRelease.value);
            let artist;
            if (form.artist.value.includes(", ")) {
                artist = form.artist.value.split(", ");
            }
            else {
                artist = form.artist.value;
            }
            const albumId = Number(form.id.split("-")[1]);
            console.log(artist);
            await DataHandler.putData("albums", albumId, { title, image, yearOfRelease, artist });
            const index = DataHandler.albumsArr.findIndex((album) => album.getId() === albumId);
            DataHandler.albumsArr[index] = new Album(title, yearOfRelease, image, albumId);
            Dialog.close();
            albumRenders.setList(DataHandler.albumsArr);
            albumRenders.renderList();
        });
    }
}

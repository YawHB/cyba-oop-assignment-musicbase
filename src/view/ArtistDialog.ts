import Dialog from "./Dialog.js";
import Artist from "../model/Artist.js";
import Album from "../model/Album.js";
import DataHandler from "../components/dataHandler.js";
import { artistRenders } from "../app.js";

export default class ArtistDialog extends Dialog {

    protected async postRender(item: Artist): Promise<void> {
        const updateButton = document.querySelector(".artist-dialog-update-button") as HTMLButtonElement;
        const deleteButton = document.querySelector(".artist-dialog-delete-button") as HTMLButtonElement;

        updateButton.addEventListener("click", () => {
            this.update(item);
        });
        deleteButton.addEventListener("click", () => {
            this.delete(item);
        });
    }

    async create(): Promise<void> {

        const html = /*html*/ `
        <h2>Create Artist</h2>

        <form class="create-artist-form">
            <div class="create-form-content">
                <label for="artistName">Name</label>
                <input type=text name="artistName" id="artistName" value="">
                <label for="image">Image</label>
                <input type=text name="image" id="image" value="">
            </div>

            <input type="submit" value="Submit artist" />
        </form>
        `;

        await this.renderHTML(html);
        Dialog.dialogContent.querySelector(".create-artist-form")?.addEventListener("submit", async (event: Event) => {
            event.preventDefault();
            const form = event.target as HTMLFormElement;

            const name: string = form.artistName.value;
            const image: string = form.image.value;

            const newArtist = { name, image };
            //TODO KALDER EN NY METODE(newArtist)
            const newArtistId: number = await DataHandler.postData("artists", newArtist);

            const instancedArtist = new Artist(newArtist.name, newArtist.image, newArtistId);

            DataHandler.artistsArr.push(instancedArtist);

            Dialog.close();
            artistRenders.setList(DataHandler.artistsArr);
            artistRenders.renderList();
        });
    }

    async delete(item: Artist): Promise<void> {
        await DataHandler.deleteData("artists", item.getId());
        const index: number = DataHandler.artistsArr.indexOf(item);
        console.log(index);
        DataHandler.artistsArr.splice(index, 1);
        Dialog.close();
        // render list again
        artistRenders.setList(DataHandler.artistsArr);
        artistRenders.renderList();
    }

    public async details(item: Artist): Promise<void> {
        const artistAlbums = await DataHandler.getAllAlbumsByArtistId(item.getId());

        const html = /*html*/ `
        <article class="artist-dialog">
            <h2>${item.name}</h2>
            <img src="${item.image}" alt="${item.name}">
            <h3>Albums</h3>
            <ul>
            ${artistAlbums
                .map((album: Album) => {
                    return /*html*/ `
                <li>${album.title}</li>`;
                })
                .join("")}
            </ul>
        
            <div class="artist-dialog-buttons">
                <button class="artist-dialog-update-button">Update</button>
                <button class="artist-dialog-delete-button">Delete</button>
            </div>
        </article>
        `;

        await this.renderHTML(html);
        await this.postRender(item);
    }

    async update(item: Artist): Promise<void> {
        console.log("update");
        const html = /*html*/ `

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

        await this.renderHTML(html);

        Dialog.dialogContent.querySelector(".update-artist-form")?.addEventListener("submit", async (event: Event) => {
            event.preventDefault();
            const form = event.target as HTMLFormElement;

            const name: string = form.artistName.value;
            const image: string = form.image.value;
            const artistId = Number(form.id.split("-")[1]);

            const updatedArtist = { name, image };

            const response = await DataHandler.putData(`artists`, artistId, updatedArtist);

            if (response.affectedRows > 0) {
                const instancedArtist = new Artist(updatedArtist.name, updatedArtist.image, artistId);
                const index = DataHandler.artistsArr.findIndex((artist) => artist.getId() === instancedArtist.getId());
                DataHandler.artistsArr[index] = instancedArtist;

                Dialog.close();
                artistRenders.setList(DataHandler.artistsArr);
                artistRenders.renderList();
            }
        });
    }
}

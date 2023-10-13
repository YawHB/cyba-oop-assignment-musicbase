import Dialog from "./Dialog.js";
import Album from "../model/Album.js";
import Track from "../model/Track.js";
import DataHandler from "../components/dataHandler.js";
import { albumRenders } from "../app.js";

export default class AlbumDialog extends Dialog {
    protected async renderHTML(html: string): Promise<void> {
        Dialog.clear();
        Dialog.open();
        Dialog.dialogContent.insertAdjacentHTML("beforeend", html);
    }

    protected async postRender(item: Album): Promise<void> {
        try {
            const updateButton = document.querySelector(
                ".album-dialog-update-button"
            ) as HTMLButtonElement;
            const deleteButton = document.querySelector(
                ".album-dialog-delete-button"
            ) as HTMLButtonElement;

            if (!updateButton || !deleteButton) {
                throw new Error("No buttons found");
            }

            updateButton.addEventListener("click", () => {
                this.update(item);
            });
            deleteButton.addEventListener("click", () => {
                this.delete(item);
            });
        } catch (error) {
            console.error((error as Error).message);
        }
    }

    public async create(): Promise<void> {
        console.log("create album");
        const createFormHTML = /*html*/ `
        <h2>Create Album</h2>
        
        <form class="create-album-form">
            <div class="create-form-content">
                <label for="albumTitle">Title</label>
                <input type=text name="albumTitle" id="albumTitle" value="">
                <label for="image">Image</label>
                <input type=text name="image" id="image" value="">
                <label for="yearOfRelease">Year of release</label>
                <input type=text name="yearOfRelease" id="yearOfRelease" value="">
                <label for="artist">Artist</label>
                <input type=text name="artist" id="artist" value="">
            </div>
            <input type="submit" value="Submit album" />
        </form>
        `;
        await this.renderHTML(createFormHTML);
        Dialog.dialogContent
            .querySelector(".create-album-form")
            ?.addEventListener("submit", async (event: Event) => {
                event.preventDefault();
                const form = event.target as HTMLFormElement;

                const title: string = form.albumTitle.value;
                const image: string = form.image.value;
                const yearOfRelease: number = parseInt(
                    form.yearOfRelease.value
                );
                const artist: string = form.artist.value;

                const newAlbumId: number = await DataHandler.postData(
                    "albums",
                    { title, image, yearOfRelease, artist }
                );

                DataHandler.albumsArr.push(
                    new Album(title, yearOfRelease, image, newAlbumId)
                );

                Dialog.close();
                albumRenders.setList(DataHandler.albumsArr);
                albumRenders.clearList();
                albumRenders.renderList();
            });
    }

    public async delete(item: Album): Promise<void> {
        try {
            await DataHandler.deleteData("albums", item.getId());
            const index = DataHandler.albumsArr.findIndex(
                (album: Album) => album.getId() === item.getId()
            );
            DataHandler.albumsArr.splice(index, 1);
            Dialog.close();
            // render album list again
            albumRenders.setList(DataHandler.albumsArr);
            albumRenders.clearList();
            albumRenders.renderList();
        } catch (error) {
            console.error((error as Error).message);
        }
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
            <p>Artist: ${
                albumData.artists.length === 1
                    ? albumData.artists[0].name
                    : albumData.artists.join(", ").name
            }</p>
            <p>Year of release: ${albumData.yearOfRelease}</p>
            <h3>Tracks</h3>
            <ul>
            ${albumData.tracks
                .map(
                    (track: {
                        id: number;
                        title: string;
                        duration: number;
                    }): string => {
                        const foundTrack = DataHandler.tracksArr.find(
                            (instanciatedTrack) =>
                                instanciatedTrack.getId() === track.id
                        );
                        return /*html*/ `<li>${
                            foundTrack?.title
                        } - ${foundTrack?.getDuration()} - ${
                            foundTrack?.artists
                        }</li>`;
                    }
                )

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
            await this.postRender(item);
        } catch (error) {
            console.error((error as Error).message);
        }
    }

    public async update(item: Album): Promise<void> {
        console.log(item);
        const updateFormHTML = /*html*/ `
        <h2>Update Album</h2>
        
        <form class="update-album-form" id="albumId-${item.getId()}">
            <div class="update-form-content">
                <label for="albumTitle">Title</label>
                <input type=text name="albumTitle" id="albumTitle" value="${
                    item.title
                }">
                <label for="image">Image</label>
                <input type=text name="image" id="image" value="${item.image}">
                <label for="yearOfRelease">Year of release</label>
                 <input type=text name="yearOfRelease" id="yearOfRelease" value="${
                     item.yearOfRelease
                 }">
                <!-- <label for="artist">Artist</label> 
                <input type=text name="artist" id="artist" value="${
                    item.artist
                }"> -->
            </div>
            <input type="submit" value="Submit album" />
        </form>
        `;
        await this.renderHTML(updateFormHTML);
        Dialog.dialogContent
            .querySelector(".update-album-form")
            ?.addEventListener("submit", async (event: Event) => {
                event.preventDefault();
                const form = event.target as HTMLFormElement;

                const title: string = form.albumTitle.value;
                const image: string = form.image.value;
                const yearOfRelease: number = parseInt(
                    form.yearOfRelease.value
                );
                // const artist: string = form.artist.value;
                const albumId = Number(form.id.split("-")[1]);

                await DataHandler.putData("albums", albumId, {
                    title,
                    image,
                    yearOfRelease /*artist*/,
                });

                const index = DataHandler.albumsArr.findIndex(
                    (album: Album) => album.getId() === albumId
                );
                DataHandler.albumsArr[index] = new Album(
                    title,
                    yearOfRelease,
                    image,
                    albumId
                );

                Dialog.close();
                albumRenders.setList(DataHandler.albumsArr);
                albumRenders.clearList();
                albumRenders.renderList();
            });
    }
}

import Dialog from "./Dialog.js";
import Track from "../model/Track.js";
import DataHandler from "../components/dataHandler.js";
import { trackRenders } from "../app.js";
import Artist from "../model/Artist.js";
import Album from "../model/Album.js";

export default class TrackDialog extends Dialog {

    protected async postRender(item: Track): Promise<void> {
        try {
            const updateButton = document.querySelector(
                ".track-dialog-update-button"
            ) as HTMLButtonElement;
            const deleteButton = document.querySelector(
                ".track-dialog-delete-button"
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

    async create(): Promise<void> {
        const createFormHTML = /*html*/ `
        <h2>Create Track</h2>
        <form class="create-track-form">
            <div class="create-form-content">
                <label for="trackTitle">Title</label>
                <input type=text name="trackTitle" id="trackTitle" value="">
                <label for="duration">Duration</label>
                <input type=text name="duration" id="duration" value="">
                <label for="artists">Artist</label>
                <input type=text name="artists" id="artists" value="">
                <label for="albums">Album</label>
                <input type=text name="albums" id="albums" value="">
            </div>
            <input type="submit" value="Submit track" />
        </form>
        `;
        await this.renderHTML(createFormHTML);
        Dialog.dialogContent
            .querySelector(".create-track-form")
            ?.addEventListener("submit", async (event: Event) => {
                event.preventDefault();
                const form = event.target as HTMLFormElement;

                const title: string = form.trackTitle.value;
                const duration: number = parseInt(form.duration.value);
                const artists: string = form.artists.value;
                const albums: string = form.albums.value;

                const newTrackId: number = await DataHandler.postData(
                    "tracks",
                    { title, duration, artists, albums }
                );
                const instancedTrack = new Track(
                    title,
                    duration,
                    artists,
                    albums,
                    newTrackId
                );

                DataHandler.tracksArr.push(instancedTrack);

                Dialog.close();
                trackRenders.setList(DataHandler.tracksArr);
                trackRenders.renderList();
            });
    }

    async delete(item: Track): Promise<void> {
        try {
            await DataHandler.deleteData("tracks", item.getId());
            const index = DataHandler.tracksArr.indexOf(item);
            DataHandler.tracksArr.splice(index, 1);
            Dialog.close();
            // render tracks list again
            trackRenders.setList(DataHandler.tracksArr);
            trackRenders.renderList();
        } catch (error) {
            console.error((error as Error).message);
        }
    }

    public async details(item: Track): Promise<void> {
        console.log(item)
        try {
            const html = /*html*/ `
                <article class="track-details">
                <h2>${item.title}</h2>
                <h3>Track Details</h3>
                <p>Artist: ${item.artists}</p>
                <p>Album: ${item.albums}</p>
                <p>Duration: ${item.getDuration()}</p>
                
                <div class="track-dialog-buttons">
                    <button class="track-dialog-update-button">Update</button>
                    <button class="track-dialog-delete-button">Delete</button>
                </div>
                </article>
                `;

            await this.renderHTML(html);
            await this.postRender(item);
        } catch (error) {
            console.error((error as Error).message);
        }
    }

    async update(item: Track): Promise<void> {
        //TODO change input types for artist and album to select with option values from artist and album arrays
        const updateFormHTML = /*html*/ `
        <h2>Update Track</h2>
        <form class="update-track-form" id="trackId-${item.getId()}">
            <div class="update-form-content">
                <label for="trackTitle">Title</label>
                <input type=text name="trackTitle" id="trackTitle" value="${
                    item.title
                }">
                <label for="duration">Duration</label>
                <input type=text name="duration" id="duration" value="${
                    item.duration
                }">
                <label for="artists">Artist</label>
                <select multiple name="artists" id="artist-select">
                <!-- Insert artists from global array --> 
                </select>
                <label for="albums">Album</label>
                <select multiple name="albums" id="album-select">
                <!-- Insert albums from global array -->
                </select>

            </div>
            <input type="submit" value="Submit track" />
        </form>
        `;

        await this.renderHTML(updateFormHTML);
        this.populateDropdown(DataHandler.artistsArr);
        this.populateDropdown(DataHandler.albumsArr);

        Dialog.dialogContent
            .querySelector(`#trackId-${item.getId()}`)
            ?.addEventListener("submit", async (event: Event) => {
                event.preventDefault();
                const form = event.target as HTMLFormElement;

                const title: string = form.trackTitle.value;
                const duration: number = parseInt(form.duration.value);
                const artists: string = form.artists.value;
                const albums: string = form.albums.value;

                const response = await DataHandler.putData(
                    "tracks",
                    item.getId(),
                    { title, duration, artists, albums }
                );
                console.log(response);

                const index = DataHandler.tracksArr.indexOf(item);
                DataHandler.tracksArr[index] = new Track(
                    title,
                    duration,
                    artists,
                    albums,
                    item.getId()
                );

                Dialog.close();
                trackRenders.setList(DataHandler.tracksArr);
                trackRenders.renderList();
            });
    }

    populateDropdown(globalArr: (Artist | Album)[]) {
        let type: string;
        let html: string;

        globalArr.every(item => item instanceof Artist)
            ? (type = "artist")
            : (type = "album");

        const dropdown = document.querySelector(`#${type}-select`);

        globalArr.map(item => {
            if (type === "artist") {
                html = /*html*/ `
            <option value="${item.name.toLowerCase()}">${item.name}</option>
            `;
            } else {
                html = /*html*/ `
            <option value="${item.title.toLowerCase()}">${item.title}</option>
            `;
            }

            dropdown?.insertAdjacentHTML("beforeend", html);
        });
    }
}

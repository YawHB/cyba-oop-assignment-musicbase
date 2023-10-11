"use strict";
import DataHandler from "./components/dataHandler.js";
import AlbumRenderer from "./view/AlbumRenderer.js";
import ArtistRenderer from "./view/ArtistRenderer.js";
import ListRenderer from "./view/ListRenderer.js";
import TrackRenderer from "./view/TrackRenderer.js";
import Dialog from "./view/Dialog.js";
import ArtistDialog from "./view/ArtistDialog.js";
window.addEventListener("load", app);
let artistRenders, albumRenders, trackRenders;
async function app() {
    console.log(`App is running 🎉`);
    await DataHandler.getData("artists");
    await DataHandler.getData("albums");
    await DataHandler.getData("tracks");

    artistRenders = new ListRenderer(DataHandler.artistsArr, "artists-grid", ArtistRenderer);
    albumRenders = new ListRenderer(DataHandler.albumsArr, "albums-grid", AlbumRenderer);
    trackRenders = new ListRenderer(DataHandler.tracksArr, "tracks-table tbody", TrackRenderer);
    artistRenders.renderList();
    albumRenders.renderList();
    trackRenders.renderList();
    document.querySelector("#btn-close-dialog-frame")?.addEventListener("click", () => Dialog.close());
    document.querySelector("#btn-create-artist")?.addEventListener('click', () => {
        console.log("eventlistener");
        new ArtistDialog().create();
    });

    const searchbar = document.querySelector("#searchbar");
    searchbar?.addEventListener("input", () => {
        const searchValue = searchbar.value.toLowerCase();
        artistRenders.search(searchValue);
        albumRenders.search(searchValue);
        tracksRenders.search(searchValue);
    });

}
export { artistRenders, albumRenders, trackRenders };

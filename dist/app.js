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
    artistRenders = new ListRenderer(DataHandler.artistsArr, "artists-grid", ArtistRenderer, "artist-sort-container");
    albumRenders = new ListRenderer(DataHandler.albumsArr, "albums-grid", AlbumRenderer, "album-sort-container");
    trackRenders = new ListRenderer(DataHandler.tracksArr, "tracks-table tbody", TrackRenderer, "track-sort-container");
    artistRenders.renderList();
    albumRenders.renderList();
    trackRenders.renderList();
    initiateEventListeners();
}
function initiateEventListeners() {
    document.querySelector("#btn-close-dialog-frame")?.addEventListener("click", () => Dialog.close());
    document.querySelector("#btn-create-artist")?.addEventListener("click", () => {
        new ArtistDialog().create();
    });
    const searchbar = document.querySelector("#searchbar");
    searchbar?.addEventListener("input", () => {
        const searchValue = searchbar.value.toLowerCase();
        artistRenders.search(searchValue);
        albumRenders.search(searchValue);
        trackRenders.search(searchValue);
    });
}
export { artistRenders, albumRenders, trackRenders };

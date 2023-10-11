"use strict";
import DataHandler from "./components/dataHandler.js";
import AlbumRenderer from "./view/AlbumRenderer.js";
import ArtistRenderer from "./view/ArtistRenderer.js";
import ListRenderer from "./view/ListRenderer.js";
import TrackRenderer from "./view/TrackRenderer.js";
import Dialog from "./view/Dialog.js";
window.addEventListener("load", app);
async function app() {
    console.log("hello there!");
    await DataHandler.getData("artists");
    await DataHandler.getData("albums");
    await DataHandler.getData("tracks");
    console.log(DataHandler.artistsArr);
    console.log(DataHandler.albumsArr);
    console.log(DataHandler.tracksArr);
    const artistRenders = new ListRenderer(DataHandler.artistsArr, "artists-grid", ArtistRenderer);
    const albumRenders = new ListRenderer(DataHandler.albumsArr, "albums-grid", AlbumRenderer);
    const tracksRenders = new ListRenderer(DataHandler.tracksArr, "tracks-table tbody", TrackRenderer);
    artistRenders.renderList();
    albumRenders.renderList();
    tracksRenders.renderList();
    const searchbar = document.querySelector("#searchbar");
    searchbar?.addEventListener("input", () => {
        console.log("Click");
        const searchValue = searchbar.value.toLowerCase();
        artistRenders.search(searchValue);
        albumRenders.search(searchValue);
        tracksRenders.search(searchValue);
    });
    document
        .querySelector("#btn-close-dialog-frame")
        ?.addEventListener("click", () => Dialog.close());
}

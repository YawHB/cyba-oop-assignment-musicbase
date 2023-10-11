"use strict";
import DataHandler from "./components/dataHandler.js";
import search from "./components/search.js";
import AlbumRenderer from "./view/AlbumRenderer.js";
import ArtistRenderer from "./view/ArtistRenderer.js";
import ListRenderer from "./view/ListRenderer.js";
import TrackRenderer from "./view/TrackRenderer.js";
import Dialog from "./view/Dialog.js";

window.addEventListener("load", app);

async function app() {
    console.log(`App is running 🎉`);
    await DataHandler.getData("artists");
    await DataHandler.getData("albums");
    await DataHandler.getData("tracks");

    console.log(DataHandler.artistsArr);
    console.log(DataHandler.albumsArr);
    console.log(DataHandler.tracksArr);

    const artistRenders = new ListRenderer(DataHandler.artistsArr, "artists-grid", ArtistRenderer, "artist-sort-container");

    const albumRenders = new ListRenderer(DataHandler.albumsArr, "albums-grid", AlbumRenderer, "album-sort-container");

    const tracksRenders = new ListRenderer(DataHandler.tracksArr, "tracks-table tbody", TrackRenderer, "track-sort-container");

    artistRenders.renderList();
    albumRenders.renderList();
    tracksRenders.renderList();

    const searchbar = document.querySelector("#searchbar") as HTMLInputElement;
    searchbar?.addEventListener("input", () => {
        const searchValue = searchbar.value.toLowerCase();

        artistRenders.search(searchValue);
        albumRenders.search(searchValue);
        tracksRenders.search(searchValue);
    });

    document
        .querySelector("#btn-close-dialog-frame")
        ?.addEventListener("click", () => Dialog.close());


}

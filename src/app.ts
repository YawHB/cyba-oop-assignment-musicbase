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

    // instantiate list renderers
    new ListRenderer(DataHandler.artistsArr, "artists-grid", ArtistRenderer).renderList();
    new ListRenderer(DataHandler.albumsArr, "albums-grid", AlbumRenderer).renderList();
    new ListRenderer(DataHandler.tracksArr, "tracks-table tbody", TrackRenderer).renderList();

    document
        .querySelector("#btn-close-dialog-frame")
        ?.addEventListener("click", () => Dialog.close());


}

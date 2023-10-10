"use strict";
import DataHandler from "./components/dataHandler.js";
import search from "./components/search.js";
import AlbumRenderer from "./view/AlbumRenderer.js";
import ArtistRenderer from "./view/ArtistRenderer.js";
import ListRenderer from "./view/ListRenderer.js";
import TrackRenderer from "./view/TrackRenderer.js";

window.addEventListener("load", app);

async function app() {
    console.log("hello there!");
    await DataHandler.getData("artists");
    await DataHandler.getData("albums");
    await DataHandler.getData("tracks");

    console.log(DataHandler.artistsArr);
    console.log(DataHandler.albumsArr);
    console.log(DataHandler.tracksArr);

    const artistRenders = new ListRenderer(
        DataHandler.artistsArr,
        "artists-grid",
        ArtistRenderer
    );

    const albumRenders = new ListRenderer(
        DataHandler.albumsArr,
        "albums-grid",
        AlbumRenderer
    );

    const tracksRenders = new ListRenderer(
        DataHandler.tracksArr,
        "tracks-table tbody",
        TrackRenderer
    );

    artistRenders.renderList();
    albumRenders.renderList();
    tracksRenders.renderList();

    const searchbar = document.querySelector("#searchbar") as HTMLInputElement;

    searchbar?.addEventListener("input", () => {
        if (searchbar.value === null) {
            throw new Error("Missing html element");
        }

        search(searchbar.value);
    });
}

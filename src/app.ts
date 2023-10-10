"use strict";
import DataHandler from "./components/dataHandler.js";
import AlbumRenderer from "./Model/AlbumRenderer.js";
import ArtistRenderer from "./Model/ArtistRenderer.js";
import ListRenderer from "./Model/ListRenderer.js";
import TrackRenderer from "./Model/TrackRenderer.js";

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
}

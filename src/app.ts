"use strict";
import DataHandler from "./components/dataHandler.js";
import AlbumRenderer from "./view/AlbumRenderer.js";
import ArtistRenderer from "./view/ArtistRenderer.js";
import ListRenderer from "./view/ListRenderer.js";
import TrackRenderer from "./view/TrackRenderer.js";
import Dialog from "./view/Dialog.js";
import ArtistDialog from "./view/ArtistDialog.js";

window.addEventListener("load", app);

let artistRenders: ListRenderer,
    albumRenders: ListRenderer,
    trackRenders: ListRenderer;

async function app() {
    console.log("hello there!");
    // await DataHandler.postData("artists", {
    //     name: "Pharrell Williams",
    //     image: "https://i.discogs.com/GEc6fi18WNAJL2GJuwyy5e8021jRuHrqHXV4id8bD-g/rs:fit/g:sm/q:90/h:512/w:512/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9BLTkwMDM3/LTE0MzQzOTQ5MzQt/NDIxMi5qcGVn.jpeg",
    // });

    await DataHandler.getData("artists");
    await DataHandler.getData("albums");
    await DataHandler.getData("tracks");

    // instantiate list renderers
    artistRenders = new ListRenderer(
        DataHandler.artistsArr,
        "artists-grid",
        ArtistRenderer
    );
    albumRenders = new ListRenderer(
        DataHandler.albumsArr,
        "albums-grid",
        AlbumRenderer
    );
    trackRenders = new ListRenderer(
        DataHandler.tracksArr,
        "tracks-table tbody",
        TrackRenderer
    );

    artistRenders.renderList();
    albumRenders.renderList();
    trackRenders.renderList();

    document.querySelector("#btn-close-dialog-frame")?.addEventListener("click", () => Dialog.close());

    document.querySelector("#btn-create-artist")?.addEventListener('click', () => {
        console.log("eventlistener");
        
        new ArtistDialog().create();
    });
}

export { artistRenders, albumRenders, trackRenders };

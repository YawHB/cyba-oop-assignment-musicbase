"use strict";
import DataHandler from "./components/dataHandler.js";
window.addEventListener("load", app);
async function app() {
    console.log("hello there!");
    await DataHandler.getData("artists");
    await DataHandler.getData("albums");
    await DataHandler.getData("tracks");
    console.log(DataHandler.artistsArr);
    console.log(DataHandler.albumsArr);
    console.log(DataHandler.tracksArr);
}

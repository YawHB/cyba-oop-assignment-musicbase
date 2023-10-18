"use strict";
import DataHandler from "./components/DataHandler";
import AlbumRenderer from "./view/AlbumRenderer.js";
import ArtistRenderer from "./view/ArtistRenderer.js";
import ListRenderer from "./view/ListRenderer.js";
import TrackRenderer from "./view/TrackRenderer.js";
import Dialog from "./view/Dialog.js";
import ArtistDialog from "./view/ArtistDialog.js";
import AlbumDialog from "./view/AlbumDialog.js";
import TrackDialog from "./view/TrackDialog.js";

window.addEventListener("load", app);

let artistRenders: ListRenderer, albumRenders: ListRenderer, trackRenders: ListRenderer;

async function app() {
    console.log(`App is running 🎉`);

    await DataHandler.getData("artists");
    await DataHandler.getData("albums");
    await DataHandler.getData("tracks");

    // instantiate list renderers
    artistRenders = new ListRenderer(DataHandler.artistsArr, "artists-grid", ArtistRenderer, "artist-sort-container");
    albumRenders = new ListRenderer(DataHandler.albumsArr, "albums-grid", AlbumRenderer, "album-sort-container");
    trackRenders = new ListRenderer(DataHandler.tracksArr, "tracks-table tbody", TrackRenderer, "track-sort-container");

    artistRenders.renderList();
    albumRenders.renderList();
    trackRenders.renderList();

    await initiateEventListeners();
}

async function initiateEventListeners() {
    document.querySelector(".create-dropdown-btn")?.addEventListener("click", showDropdownContent);
    window.addEventListener("click", closeDropdown);

    document.querySelector("#close-dialog-frame-btn")?.addEventListener("click", () => Dialog.close());

    document.querySelector("#create-artist-btn")?.addEventListener("click", () => {
        new ArtistDialog().create();
    });
    document.querySelector("#create-album-btn")?.addEventListener("click", () => {
        new AlbumDialog().create();
    });
    document.querySelector("#create-track-btn")?.addEventListener("click", () => {
        new TrackDialog().create();
    });

    const searchbar = document.querySelector("#searchbar") as HTMLInputElement;
    searchbar?.addEventListener("input", () => {
        const searchValue = searchbar.value.toLowerCase();

        artistRenders.setSearchValue(searchValue);
        albumRenders.setSearchValue(searchValue);
        trackRenders.setSearchValue(searchValue);
    });
}

// show the dropdown menu if the user clicks on the dropdown button
function showDropdownContent(event: Event) {
    const target = event.target as HTMLElement
    const dropdownContent = target.nextElementSibling as HTMLElement;

    if (dropdownContent) {
        dropdownContent.classList.toggle("visible");
    }
}

// close the dropdown menu if the user clicks outside of it
function closeDropdown(event: Event) {
    const target = event.target as HTMLElement;

    // Check if the target or its parent is the create-dropdown element
    const isInsideDropdown = target.closest(".create-dropdown") as HTMLElement;

    if (!isInsideDropdown) {
        const dropdownContent = document.querySelector(".create-dropdown-content") as HTMLElement;
        dropdownContent.classList.remove("visible");
    }
}

export { artistRenders, albumRenders, trackRenders };

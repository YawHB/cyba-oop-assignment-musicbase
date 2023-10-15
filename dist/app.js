"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import DataHandler from "./components/dataHandler.js";
import AlbumRenderer from "./view/AlbumRenderer.js";
import ArtistRenderer from "./view/ArtistRenderer.js";
import ListRenderer from "./view/ListRenderer.js";
import TrackRenderer from "./view/TrackRenderer.js";
import Dialog from "./view/Dialog.js";
import ArtistDialog from "./view/ArtistDialog.js";
import AlbumDialog from "./view/AlbumDialog.js";
import TrackDialog from "./view/TrackDialog.js";
window.addEventListener("load", app);
let artistRenders, albumRenders, trackRenders;
function app() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`App is running 🎉`);
        yield DataHandler.getData("artists");
        yield DataHandler.getData("albums");
        yield DataHandler.getData("tracks");
        artistRenders = new ListRenderer(DataHandler.artistsArr, "artists-grid", ArtistRenderer, "artist-sort-container");
        albumRenders = new ListRenderer(DataHandler.albumsArr, "albums-grid", AlbumRenderer, "album-sort-container");
        trackRenders = new ListRenderer(DataHandler.tracksArr, "tracks-table tbody", TrackRenderer, "track-sort-container");
        artistRenders.renderList();
        albumRenders.renderList();
        trackRenders.renderList();
        yield initiateEventListeners();
    });
}
function initiateEventListeners() {
    var _a, _b, _c, _d, _e;
    return __awaiter(this, void 0, void 0, function* () {
        (_a = document.querySelector(".create-dropdown-btn")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", showDropdownContent);
        window.addEventListener("click", closeDropdown);
        (_b = document.querySelector("#close-dialog-frame-btn")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => Dialog.close());
        (_c = document.querySelector("#create-artist-btn")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", () => {
            new ArtistDialog().create();
        });
        (_d = document.querySelector("#create-album-btn")) === null || _d === void 0 ? void 0 : _d.addEventListener("click", () => {
            new AlbumDialog().create();
        });
        (_e = document.querySelector("#create-track-btn")) === null || _e === void 0 ? void 0 : _e.addEventListener("click", () => {
            new TrackDialog().create();
        });
        const searchbar = document.querySelector("#searchbar");
        searchbar === null || searchbar === void 0 ? void 0 : searchbar.addEventListener("input", () => {
            const searchValue = searchbar.value.toLowerCase();
            artistRenders.setSearchValue(searchValue);
            albumRenders.setSearchValue(searchValue);
            trackRenders.setSearchValue(searchValue);
        });
    });
}
function showDropdownContent(event) {
    const target = event.target;
    const dropdownContent = target.nextElementSibling;
    if (dropdownContent) {
        dropdownContent.classList.toggle("visible");
    }
}
function closeDropdown(event) {
    const target = event.target;
    const isInsideDropdown = target.closest(".create-dropdown");
    if (!isInsideDropdown) {
        const dropdownContent = document.querySelector(".create-dropdown-content");
        dropdownContent.classList.remove("visible");
    }
}
export { artistRenders, albumRenders, trackRenders };

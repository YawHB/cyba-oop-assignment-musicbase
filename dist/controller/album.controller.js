var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { albumRenders } from "../app.js";
import DataHandler from "../components/dataHandler.js";
import Album from "../model/Album.js";
import Dialog from "../view/Dialog.js";
function createAlbum(event) {
    return __awaiter(this, void 0, void 0, function* () {
        event.preventDefault();
        const form = event.target;
        const title = form.albumTitle.value;
        const image = form.image.value;
        const yearOfRelease = parseInt(form.yearOfRelease.value);
        const artists = form.artist.value;
        const newAlbumId = yield DataHandler.postData("albums", { title, image, yearOfRelease, artists });
        console.log(newAlbumId);
        DataHandler.albumsArr.push(new Album(title, yearOfRelease, image, newAlbumId));
        Dialog.close();
        albumRenders.setList(DataHandler.albumsArr);
        albumRenders.renderList();
    });
}
function deleteAlbum(album) {
    return __awaiter(this, void 0, void 0, function* () {
        yield DataHandler.deleteData("albums", album.getId());
        const index = DataHandler.albumsArr.indexOf(album);
        DataHandler.albumsArr.splice(index, 1);
        Dialog.close();
        albumRenders.setList(DataHandler.albumsArr);
        albumRenders.renderList();
    });
}
function updateAlbum(event) {
    return __awaiter(this, void 0, void 0, function* () {
        event.preventDefault();
        const form = event.target;
        const title = form.albumTitle.value;
        const image = form.image.value;
        const yearOfRelease = parseInt(form.yearOfRelease.value);
        let artists;
        if (form.artist.value.includes(", ")) {
            artists = form.artist.value.split(", ");
        }
        else {
            artists = form.artist.value;
        }
        const albumId = Number(form.id.split("-")[1]);
        console.log(artists);
        yield DataHandler.putData("albums", albumId, { title, image, yearOfRelease, artists });
        const index = DataHandler.albumsArr.findIndex((album) => album.getId() === albumId);
        DataHandler.albumsArr[index] = new Album(title, yearOfRelease, image, albumId);
        Dialog.close();
        albumRenders.setList(DataHandler.albumsArr);
        albumRenders.renderList();
    });
}
export { createAlbum, deleteAlbum, updateAlbum };

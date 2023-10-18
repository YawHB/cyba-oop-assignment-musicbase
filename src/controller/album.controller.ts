import { albumRenders } from "../app.js";
import DataHandler from "../components/DataHandler.js";
import Album from "../model/Album.js";
import Dialog from "../view/Dialog.js";

async function createAlbum(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;

    const title: string = form.albumTitle.value;
    const image: string = form.image.value;
    const yearOfRelease: number = parseInt(form.yearOfRelease.value);
    const artists: string = form.artist.value;

    const newAlbumId: number = await DataHandler.postData("albums", { title, image, yearOfRelease, artists });
    
    DataHandler.albumsArr.push(new Album(title, yearOfRelease, image, newAlbumId));

    Dialog.close();
    albumRenders.setList(DataHandler.albumsArr);
    albumRenders.renderList();
}

async function deleteAlbum(album: Album) {
    await DataHandler.deleteData("albums", album.getId());
    const index = DataHandler.albumsArr.indexOf(album);

    DataHandler.albumsArr.splice(index, 1);

    Dialog.close();
    albumRenders.setList(DataHandler.albumsArr);
    albumRenders.renderList();
}

async function updateAlbum(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;

    const title: string = form.albumTitle.value;
    const image: string = form.image.value;
    const yearOfRelease: number = parseInt(form.yearOfRelease.value);
    // check if there is more than one artist seperated by comma
    let artists: string | string[];
    if (form.artist.value.includes(", ")) {
        artists = form.artist.value.split(", ");
    } else {
        artists = form.artist.value;
    }
    const albumId = Number(form.id.split("-")[1]);
    console.log(artists);
    await DataHandler.putData("albums", albumId, { title, image, yearOfRelease, artists });

    const index = DataHandler.albumsArr.findIndex((album: Album) => album.getId() === albumId);
    DataHandler.albumsArr[index] = new Album(title, yearOfRelease, image, albumId);

    Dialog.close();
    albumRenders.setList(DataHandler.albumsArr);
    albumRenders.renderList();
}

export {createAlbum, deleteAlbum, updateAlbum}
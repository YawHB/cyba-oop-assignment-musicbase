import { artistRenders } from "../app.js";
import DataHandler from "../components/dataHandler.js";
import Artist from "../model/Artist.js";
import Dialog from "../view/Dialog.js";


async function deleteArtist(artist: Artist) {
    await DataHandler.deleteData("artists", artist.getId());
    const index: number = DataHandler.artistsArr.indexOf(artist);
    
    DataHandler.artistsArr.splice(index, 1);

    Dialog.close();
    artistRenders.setList(DataHandler.artistsArr);
    artistRenders.renderList();
}

async function createArtist(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;

    const name: string = form.artistName.value;
    const image: string = form.image.value;

    const newArtist = { name, image };
    const newArtistId: number = await DataHandler.postData("artists", newArtist);

    const instancedArtist = new Artist(newArtist.name, newArtist.image, newArtistId);

    DataHandler.artistsArr.push(instancedArtist);

    Dialog.close();
    artistRenders.setList(DataHandler.artistsArr);
    artistRenders.renderList();
}

async function updateArtist(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;

    const name: string = form.artistName.value;
    const image: string = form.image.value;
    const artistId = Number(form.id.split("-")[1]);

    const updatedArtist = { name, image };

    const response = await DataHandler.putData(`artists`, artistId, updatedArtist);

    if (response.affectedRows > 0) {
        const instancedArtist = new Artist(updatedArtist.name, updatedArtist.image, artistId);
        const index = DataHandler.artistsArr.findIndex((artist) => artist.getId() === instancedArtist.getId());
        DataHandler.artistsArr[index] = instancedArtist;

        Dialog.close();
        artistRenders.setList(DataHandler.artistsArr);
        artistRenders.renderList();
    }
}

export {deleteArtist, createArtist, updateArtist}
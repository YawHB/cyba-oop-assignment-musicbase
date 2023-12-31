import { artistRenders } from "../app.js";
import DataHandler from "../utility/DataHandler.js";
import Artist from "../model/Artist.js";
import Dialog from "../view/Dialog.js";
function closeArtistDialog() {
    Dialog.close();
    artistRenders.setList(DataHandler.artistsArr);
    artistRenders.renderList();
}
async function deleteArtist(artist) {
    await DataHandler.deleteData("artists", artist.getId());
    const index = DataHandler.artistsArr.indexOf(artist);
    DataHandler.artistsArr.splice(index, 1);
    closeArtistDialog();
}
async function createArtist(event) {
    event.preventDefault();
    const form = event.target;
    const name = form.artistName.value;
    const image = form.image.value;
    const newArtist = { name, image };
    const newArtistId = await DataHandler.postData("artists", newArtist);
    const instancedArtist = new Artist(newArtist.name, newArtist.image, newArtistId);
    DataHandler.artistsArr.push(instancedArtist);
    closeArtistDialog();
}
async function updateArtist(event) {
    event.preventDefault();
    const form = event.target;
    const name = form.artistName.value;
    const image = form.image.value;
    const artistId = Number(form.id.split("-")[1]);
    const updatedArtist = { name, image };
    const response = await DataHandler.putData(`artists`, artistId, updatedArtist);
    if (response.affectedRows > 0) {
        const instancedArtist = new Artist(updatedArtist.name, updatedArtist.image, artistId);
        const index = DataHandler.artistsArr.findIndex((artist) => artist.getId() === instancedArtist.getId());
        DataHandler.artistsArr[index] = instancedArtist;
        closeArtistDialog();
    }
}
export { deleteArtist, createArtist, updateArtist };

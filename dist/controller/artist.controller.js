var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { artistRenders } from "../app.js";
import DataHandler from "../components/dataHandler.js";
import Artist from "../model/Artist.js";
import Dialog from "../view/Dialog.js";
function closeArtistDialog() {
    Dialog.close();
    artistRenders.setList(DataHandler.artistsArr);
    artistRenders.renderList();
}
function deleteArtist(artist) {
    return __awaiter(this, void 0, void 0, function* () {
        yield DataHandler.deleteData("artists", artist.getId());
        const index = DataHandler.artistsArr.indexOf(artist);
        DataHandler.artistsArr.splice(index, 1);
        closeArtistDialog();
    });
}
function createArtist(event) {
    return __awaiter(this, void 0, void 0, function* () {
        event.preventDefault();
        const form = event.target;
        const name = form.artistName.value;
        const image = form.image.value;
        const newArtist = { name, image };
        const newArtistId = yield DataHandler.postData("artists", newArtist);
        const instancedArtist = new Artist(newArtist.name, newArtist.image, newArtistId);
        DataHandler.artistsArr.push(instancedArtist);
        closeArtistDialog();
    });
}
function updateArtist(event) {
    return __awaiter(this, void 0, void 0, function* () {
        event.preventDefault();
        const form = event.target;
        const name = form.artistName.value;
        const image = form.image.value;
        const artistId = Number(form.id.split("-")[1]);
        const updatedArtist = { name, image };
        const response = yield DataHandler.putData(`artists`, artistId, updatedArtist);
        if (response.affectedRows > 0) {
            const instancedArtist = new Artist(updatedArtist.name, updatedArtist.image, artistId);
            const index = DataHandler.artistsArr.findIndex((artist) => artist.getId() === instancedArtist.getId());
            DataHandler.artistsArr[index] = instancedArtist;
            closeArtistDialog();
        }
    });
}
export { deleteArtist, createArtist, updateArtist };

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { trackRenders } from "../app.js";
import DataHandler from "../components/dataHandler.js";
import Track from "../model/Track.js";
import Dialog from "../view/Dialog.js";
function convertStringDurationToNumber(durationString) {
    const [minutes, seconds] = durationString.split(":").map(Number);
    const totalSeconds = minutes * 60 + seconds;
    return totalSeconds;
}
function createTrack(event) {
    return __awaiter(this, void 0, void 0, function* () {
        event.preventDefault();
        const form = event.target;
        const title = form.trackTitle.value;
        const duration = convertStringDurationToNumber(form.duration.value);
        const artists = form.artists.value;
        const albums = form.albums.value;
        const newTrackId = yield DataHandler.postData("tracks", { title, duration, artists, albums });
        const instancedTrack = new Track(title, duration, artists, albums, newTrackId);
        DataHandler.tracksArr.push(instancedTrack);
        Dialog.close();
        trackRenders.setList(DataHandler.tracksArr);
        trackRenders.renderList();
    });
}
function deleteTrack(track) {
    return __awaiter(this, void 0, void 0, function* () {
        yield DataHandler.deleteData("tracks", track.getId());
        const index = DataHandler.tracksArr.indexOf(track);
        DataHandler.tracksArr.splice(index, 1);
        Dialog.close();
        trackRenders.setList(DataHandler.tracksArr);
        trackRenders.renderList();
    });
}
function updateTrack(event) {
    return __awaiter(this, void 0, void 0, function* () {
        event.preventDefault();
        const form = event.target;
        const title = form.trackTitle.value;
        const duration = convertStringDurationToNumber(form.duration.value);
        const artists = form.artists.value;
        const albums = form.albums.value;
        const trackId = Number(form.id.split("-")[1]);
        const response = yield DataHandler.putData("tracks", trackId, { title, duration, artists, albums });
        console.log(response);
        const index = DataHandler.tracksArr.findIndex(track => track.getId() === trackId);
        DataHandler.tracksArr[index] = new Track(title, duration, artists, albums, trackId);
        Dialog.close();
        trackRenders.setList(DataHandler.tracksArr);
        trackRenders.renderList();
    });
}
export { createTrack, deleteTrack, updateTrack };

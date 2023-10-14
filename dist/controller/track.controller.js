import { trackRenders } from "../app.js";
import DataHandler from "../components/dataHandler.js";
import Track from "../model/Track.js";
import Dialog from "../view/Dialog.js";
function convertStringDurationToNumber(durationString) {
    const [minutes, seconds] = durationString.split(":").map(Number);
    const totalSeconds = minutes * 60 + seconds;
    return totalSeconds;
}
async function createTrack(event) {
    event.preventDefault();
    const form = event.target;
    const title = form.trackTitle.value;
    const duration = convertStringDurationToNumber(form.duration.value);
    const artists = form.artists.value;
    const albums = form.albums.value;
    const newTrackId = await DataHandler.postData("tracks", { title, duration, artists, albums });
    const instancedTrack = new Track(title, duration, artists, albums, newTrackId);
    DataHandler.tracksArr.push(instancedTrack);
    Dialog.close();
    trackRenders.setList(DataHandler.tracksArr);
    trackRenders.renderList();
}
async function deleteTrack(track) {
    await DataHandler.deleteData("tracks", track.getId());
    const index = DataHandler.tracksArr.indexOf(track);
    DataHandler.tracksArr.splice(index, 1);
    Dialog.close();
    trackRenders.setList(DataHandler.tracksArr);
    trackRenders.renderList();
}
async function updateTrack(event) {
    event.preventDefault();
    const form = event.target;
    const selectedArtists = [];
    const selectedAlbums = [];
    for (const artist of form.artists.options) {
        if (artist.selected)
            selectedArtists.push(artist.value);
    }
    for (const album of form.albums.options) {
        if (album.selected)
            selectedAlbums.push(album.value);
    }
    const title = form.trackTitle.value;
    const duration = convertStringDurationToNumber(form.duration.value);
    const artists = selectedArtists.join(', ');
    const albums = selectedAlbums.join(', ');
    const trackId = Number(form.id.split("-")[1]);
    console.log('artists: ' + artists);
    const response = await DataHandler.putData("tracks", trackId, { title, duration, artists, albums });
    console.log(response);
    const index = DataHandler.tracksArr.findIndex(track => track.getId() === trackId);
    DataHandler.tracksArr[index] = new Track(title, duration, artists, albums, trackId);
    Dialog.close();
    trackRenders.setList(DataHandler.tracksArr);
    trackRenders.renderList();
}
export { createTrack, deleteTrack, updateTrack };

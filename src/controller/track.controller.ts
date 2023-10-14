import { trackRenders } from "../app.js";
import DataHandler from "../components/dataHandler.js";
import Track from "../model/Track.js";
import Dialog from "../view/Dialog.js";



function convertStringDurationToNumber(durationString: string): number {
    const [minutes, seconds] = durationString.split(":").map(Number);
    const totalSeconds = minutes * 60 + seconds;
    return totalSeconds;
}


async function createTrack(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;

    const title: string = form.trackTitle.value;
    const duration: number = convertStringDurationToNumber(form.duration.value);
    const artists: string = form.artists.value;
    const albums: string = form.albums.value;


    const newTrackId: number = await DataHandler.postData("tracks", { title, duration, artists, albums });
    const instancedTrack = new Track(title, duration, artists, albums, newTrackId);

    DataHandler.tracksArr.push(instancedTrack);

    Dialog.close();
    trackRenders.setList(DataHandler.tracksArr);
    trackRenders.renderList();
}

async function deleteTrack(track: Track) {
    await DataHandler.deleteData("tracks", track.getId());
    const index = DataHandler.tracksArr.indexOf(track);
    DataHandler.tracksArr.splice(index, 1);
    Dialog.close();
    trackRenders.setList(DataHandler.tracksArr);
    trackRenders.renderList();
}

async function updateTrack(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;

    const selectedArtists: string[] = [];
    const selectedAlbums: string[] = [];
    
    for (const artist of form.artists.options) {
        if(artist.selected) selectedArtists.push(artist.value);
    }
    for (const album of form.albums.options) {
        if(album.selected) selectedAlbums.push(album.value);
    }
    
    

    const title: string = form.trackTitle.value;
    const duration: number = convertStringDurationToNumber(form.duration.value);
    const artists: string = selectedArtists.join(',')
    const albums: string  = selectedAlbums.join(',')
    const trackId: number = Number(form.id.split("-")[1]);
    console.log(selectedArtists);
    console.log(selectedAlbums)
    

    const response = await DataHandler.putData("tracks", trackId, { title, duration, artists: selectedArtists, albums: selectedAlbums });
    console.log(response);

    const index = DataHandler.tracksArr.findIndex(track => track.getId() === trackId);
    DataHandler.tracksArr[index] = new Track(title, duration, artists, albums, trackId);

    Dialog.close();
    trackRenders.setList(DataHandler.tracksArr);
    trackRenders.renderList();
}



export { createTrack, deleteTrack, updateTrack }
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Album from '../model/Album.js';
import Artist from '../model/Artist.js';
import Track from '../model/Track.js';
class DataHandler {
    static postData(endpoint, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch(`${this.apiURL}/${endpoint}`, {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (!response.ok) {
                    throw new Error(`Failed to post data ${response.statusText}`);
                }
                return yield response.json();
            }
            catch (error) {
                console.error(error.message);
            }
        });
    }
    static getData(endpoint) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch(`${this.apiURL}/${endpoint}`);
                if (!response.ok) {
                    throw new Error(`Failed to fetch data ${response.status}: ${response.statusText}`);
                }
                if (endpoint === 'artists') {
                    this.artistsArr = this.prepareArtistData(yield response.json());
                }
                else if (endpoint === 'albums') {
                    this.albumsArr = this.prepareAlbumData(yield response.json());
                }
                else if (endpoint === 'tracks') {
                    this.tracksArr = this.prepareTrackData(yield response.json());
                }
                else {
                    throw new Error(`Invalid endpoint: ${endpoint}`);
                }
            }
            catch (error) {
                console.error(error.message);
            }
        });
    }
    static getDataById(endpoint, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch(`${this.apiURL}/${endpoint}/${id}`);
                if (!response.ok) {
                    throw new Error(`Failed to fetch data: ${response.status}: ${response.statusText}`);
                }
                return yield response.json();
            }
            catch (error) {
                console.error(error.message);
            }
        });
    }
    static putData(endpoint, id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch(`${this.apiURL}/${endpoint}/${id}`, {
                    method: 'PUT',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (!response.ok) {
                    throw new Error(`Failed to put data ${response.status}: ${response.statusText}`);
                }
                return yield response.json();
            }
            catch (error) {
                console.error(error.message);
            }
        });
    }
    static deleteData(endpoint, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch(`${this.apiURL}/${endpoint}/${id}`, {
                    method: 'DELETE',
                });
                if (!response.ok) {
                    throw new Error(`Failed to delete data ${response.status}: ${response.statusText}`);
                }
                return yield response.json();
            }
            catch (error) {
                console.error(error.message);
            }
        });
    }
    static searchData(endpoint, searchValue) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch(`${this.apiURL}/${endpoint}/search/${searchValue}`);
                if (response.ok) {
                    return [];
                }
                return yield response.json();
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    static searchAllData(searchValue) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch(`${this.apiURL}/artists/albums/tracks/${searchValue}`);
                if (!response.ok) {
                    throw new Error(`${response.status}: ${response.statusText}`);
                }
                return yield response.json();
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    static createAllInOneGo(artistData, albumData, trackData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch(`${this.apiURL}/artists/albums/tracks`, {
                    method: 'POST',
                    body: JSON.stringify({
                        artistData,
                        albumData,
                        trackData,
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (!response.ok) {
                    throw new Error(`${response.status}: ${response.statusText}`);
                }
                return yield response.json();
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    static getAllAlbumData(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch(`${this.apiURL}/albums/${id}/tracks`);
                if (!response.ok) {
                    throw new Error(`${response.status}: ${response.statusText}`);
                }
                return yield response.json();
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    static getAllAlbumsByArtistId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch(`${this.apiURL}/artists/albums/${id}`);
                if (!response.ok) {
                    throw new Error(`${response.status}: ${response.statusText}`);
                }
                return yield response.json();
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    static prepareArtistData(rawData) {
        return rawData.map((artist) => {
            return new Artist(artist.name, artist.image, artist.id);
        });
    }
    static prepareAlbumData(rawData) {
        return rawData.map((album) => {
            return new Album(album.title, album.yearOfRelease, album.image, album.id);
        });
    }
    static prepareTrackData(rawData) {
        return rawData.map((track) => {
            return new Track(track.title, track.duration, track.artists, track.albums, track.id);
        });
    }
}
DataHandler.apiURL = 'https://cyba-music-base-node-app.azurewebsites.net/';
DataHandler.artistsArr = [];
DataHandler.albumsArr = [];
DataHandler.tracksArr = [];
export default DataHandler;

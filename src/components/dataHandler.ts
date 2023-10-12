import Album from "../model/Album.js";
import Artist from "../model/Artist.js";
import Track from "../model/Track.js";

class DataHandler {
    private static apiURL: string = "http://127.0.0.1:3000";
    public static artistsArr: Artist[] = [];
    public static albumsArr: Album[] = [];
    public static tracksArr: Track[] = [];

    // CRUD Methods
    static async postData(endpoint: string, data: any): Promise<any> {
        try {
            const response = await fetch(`${this.apiURL}/${endpoint}`, {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                throw new Error(`Failed to post data ${response.statusText}`);
            }
            return await response.json();
        } catch (error) {
            console.error((error as Error).message);
        }
    }
    static async getData(endpoint: string): Promise<any> {
        try {
            const response = await fetch(`${this.apiURL}/${endpoint}`);
            if (!response.ok) {
                throw new Error(
                    `Failed to fetch data ${response.status}: ${response.statusText}`
                );
            }
            if (endpoint === "artists") {
                this.artistsArr = this.prepareArtistData(await response.json());
            } else if (endpoint === "albums") {
                this.albumsArr = this.prepareAlbumData(await response.json());
            } else if (endpoint === "tracks") {
                this.tracksArr = this.prepareTrackData(await response.json());
            } else {
                throw new Error(`Invalid endpoint: ${endpoint}`);
            }
        } catch (error) {
            console.error((error as Error).message);
        }
    }
    static async getDataById(endpoint: string, id: number): Promise<any> {
        try {
            const response = await fetch(`${this.apiURL}/${endpoint}/${id}`);
            if (!response.ok) {
                throw new Error(
                    `Failed to fetch data: ${response.status}: ${response.statusText}`
                );
            }
            return await response.json();
        } catch (error) {
            console.error((error as Error).message);
        }
    }

    static async putData(
        endpoint: string,
        id: number,
        data: any
    ): Promise<any> {
        try {
            const response = await fetch(`${this.apiURL}/${endpoint}/${id}`, {
                method: "PUT",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                throw new Error(
                    `Failed to put data ${response.status}: ${response.statusText}`
                );
            }
            return await response.json();
        } catch (error) {
            console.error((error as Error).message);
        }
    }

    static async deleteData(endpoint: string, id: number): Promise<any> {
        try {
            const response = await fetch(`${this.apiURL}/${endpoint}/${id}`, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error(
                    `Failed to delete data ${response.status}: ${response.statusText}`
                );
            }
            return await response.json();
        } catch (error) {
            console.error((error as Error).message);
        }
    }

    // Search Methods
    static async searchData(
        endpoint: string,
        searchValue: string
    ): Promise<any> {
        try {
            const response = await fetch(
                `${this.apiURL}/${endpoint}/search/${searchValue}`
            );
            if (response.ok) {
                return [];
            }
            return await response.json();
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }

    static async searchAllData(searchValue: string): Promise<any> {
        try {
            const response = await fetch(
                `${this.apiURL}/artists/albums/tracks/${searchValue}`
            );
            if (!response.ok) {
                throw new Error(`${response.status}: ${response.statusText}`);
            }
            return await response.json();
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }

    // misc methods
    static async createAllInOneGo(
        artistData: string | number | [],
        albumData: string | number | [],
        trackData: []
    ): Promise<any> {
        try {
            const response = await fetch(
                `${this.apiURL}/artists/albums/tracks`,
                {
                    method: "POST",
                    body: JSON.stringify({
                        artistData,
                        albumData,
                        trackData,
                    }),
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            if (!response.ok) {
                throw new Error(`${response.status}: ${response.statusText}`);
            }
            return await response.json();
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }

    static async getAllAlbumData(id: number): Promise<any> {
        try {
            const response = await fetch(`${this.apiURL}/albums/${id}/tracks`);
            if (!response.ok) {
                throw new Error(`${response.status}: ${response.statusText}`);
            }
            return await response.json();
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }

    static async getAllAlbumsByArtistId(id: number): Promise<any> {
        try {
            const response = await fetch(`${this.apiURL}/artists/albums/${id}`);
            if (!response.ok) {
                throw new Error(`${response.status}: ${response.statusText}`);
            }
            return await response.json();
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }

    // prepare data methods
    private static prepareArtistData(rawData: RawArtist[]): Artist[] {
        return rawData.map((artist: RawArtist) => {
            return new Artist(artist.name, artist.image, artist.id);
        });
    }

    private static prepareAlbumData(rawData: RawAlbum[]): Album[] {
        return rawData.map((album: RawAlbum) => {
            return new Album(
                album.title,
                album.yearOfRelease,
                album.image,
                album.id
            );
        });
    }

    private static prepareTrackData(rawData: RawTrack[]): Track[] {
        return rawData.map((track: RawTrack) => {
            return new Track(
                track.title,
                track.duration,
                track.artists,
                track.albums,
                track.id
            );
        });
    }
}

export default DataHandler;

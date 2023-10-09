class DataHandler {
    static apiURL = "http://127.0.0.1:3000";
    static async postData(endpoint, data) {
        try {
            const response = await fetch(`${this.apiURL}/${endpoint}`, {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (!response.ok) {
                throw new Error(`Failed to post data ${response.statusText}`);
            }
            return await response.json();
        }
        catch (error) {
            console.error(error.message);
        }
    }
    static async getData(endpoint) {
        try {
            const response = await fetch(`${this.apiURL}/${endpoint}`);
            if (!response.ok) {
                throw new Error(`Failed to fetch data ${response.status}: ${response.statusText}`);
            }
            return await response.json();
        }
        catch (error) {
            console.error(error.message);
        }
    }
    static async getDataById(endpoint, id) {
        try {
            const response = await fetch(`${this.apiURL}/${endpoint}/${id}`);
            if (!response.ok) {
                throw new Error(`Failed to fetch data: ${response.status}: ${response.statusText}`);
            }
            return await response.json();
        }
        catch (error) {
            console.error(error.message);
        }
    }
    static async putData(endpoint, id, data) {
        try {
            const response = await fetch(`${this.apiURL}/${endpoint}/${id}`, {
                method: "PUT",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (!response.ok) {
                throw new Error(`Failed to put data ${response.status}: ${response.statusText}`);
            }
            return await response.json();
        }
        catch (error) {
            console.error(error.message);
        }
    }
    static async deleteData(endpoint, id) {
        try {
            const response = await fetch(`${this.apiURL}/${endpoint}/${id}`, {
                method: "DELETE"
            });
            if (!response.ok) {
                throw new Error(`Failed to delete data ${response.status}: ${response.statusText}`);
            }
            return await response.json();
        }
        catch (error) {
            console.error(error.message);
        }
    }
    static async searchData(endpoint, searchValue) {
        try {
            const response = await fetch(`${this.apiURL}/${endpoint}/search/${searchValue}`);
            if (response.ok) {
                return [];
            }
            return await response.json();
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    static async searchAllData(searchValue) {
        try {
            const response = await fetch(`${this.apiURL}/artists/albums/tracks/${searchValue}`);
            if (!response.ok) {
                throw new Error(`${response.status}: ${response.statusText}`);
            }
            return await response.json();
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    static async createAllInOneGo(artistData, albumData, trackData) {
        try {
            const response = await fetch(`${this.apiURL}/artists/albums/tracks`, {
                method: "POST",
                body: JSON.stringify({
                    artistData,
                    albumData,
                    trackData
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (!response.ok) {
                throw new Error(`${response.status}: ${response.statusText}`);
            }
            return await response.json();
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    static async getAllAlbumData(id) {
        try {
            const response = await fetch(`${this.apiURL}/albums/${id}/tracks`);
            if (!response.ok) {
                throw new Error(`${response.status}: ${response.statusText}`);
            }
            return await response.json();
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    static async getAllAlbumsByArtistId(id) {
        try {
            const response = await fetch(`${this.apiURL}/artists/albums/${id}`);
            if (!response.ok) {
                throw new Error(`${response.status}: ${response.statusText}`);
            }
            return await response.json();
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
}
export default DataHandler;
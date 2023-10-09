class DataHandler {
    private static apiURL: string = "http://127.0.0.1:3000";

    // CRUD Methods
    static async postData(endpoint:string, data:any): Promise<any> {
        try {
            const response = await fetch (`${this.apiURL}/${endpoint}`, {
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
        } catch (error) {
            console.error((error as Error).message);
        }
    }
    static async getData(endpoint:string): Promise<any> {
        try {
            const response = await fetch (`${this.apiURL}/${endpoint}`);
            if (!response.ok) {
                throw new Error(`Failed to fetch data ${response.status}: ${response.statusText}`);
            }
            return await response.json();
        } catch (error) {
            console.error((error as Error).message);
        }
    }
    static async getDataById(endpoint:string, id:string): Promise<any> {
        try {
            const response = await fetch (`${this.apiURL}/${endpoint}/${id}`);
            if (!response.ok) {
                throw new Error(`Failed to fetch data: ${response.status}: ${response.statusText}`);
            }
            return await response.json();
        } catch (error) {
            console.error((error as Error).message);
        }
    }

    static async putData(endpoint:string, id:string, data:any): Promise<any> {
        try {
            const response = await fetch (`${this.apiURL}/${endpoint}/${id}`, {
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
        } catch (error) {
            console.error((error as Error).message);
        }
    }

    static async deleteData(endpoint:string, id:string): Promise<any> {
        try {
            const response = await fetch (`${this.apiURL}/${endpoint}/${id}`, {
                method: "DELETE"
            });
            if (!response.ok) {
                throw new Error(`Failed to delete data ${response.status}: ${response.statusText}`);
            }
            return await response.json();
        } catch (error) {
            console.error((error as Error).message);
        }
    }

    // Search Methods
    static async searchData(endpoint:string, searchValue:string): Promise<any> {
        try {
            const response = await fetch (`${this.apiURL}/${endpoint}/search/${searchValue}`);
            if (response.ok) {
                return [];
            }
            return await response.json();
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }

    static async searchAllData(searchValue:string): Promise<any> {
        try {
            const response = await fetch (`${this.apiURL}/artists/albums/tracks/${searchValue}`);
            if (!response.ok) {
                throw new Error(`${response.status}: ${response.statusText}`);
            }
            return await response.json();
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }

    // misc methods
    static async createAllInOneGo(artistData: string | number | [], albumData: string | number | [], trackData: []): Promise<any> {
        try {
            const response = await fetch (`${this.apiURL}/artists/albums/tracks`, {
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
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }

    static async getAllAlbumData(id: string): Promise<any> {
        try {
            const response = await fetch (`${this.apiURL}/albums/${id}/tracks`);
            if (!response.ok) {
                throw new Error(`${response.status}: ${response.statusText}`);
            }
            return await response.json();
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }

    static async getAllAlbumsByArtistId(id: string): Promise<any> {
        try {
            const response = await fetch (`${this.apiURL}/artists/albums/${id}`);
            if (!response.ok) {
                throw new Error(`${response.status}: ${response.statusText}`);
            }
            return await response.json();
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }
}

export default DataHandler;
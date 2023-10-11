// raw data interfaces
interface RawArtist {
    id: number;
    name: string;
    image: string;
}

interface RawAlbum {
    id: number;
    title: string;
    image: string;
    yearOfRelease: number;
}

interface RawTrack {
    id: number;
    title: string;
    duration: number;
    artists: string;
    albums: string;
}

// prepared data interfaces
interface Artist {
    id: number;
    name: string;
    image: string;
    getId(): number;
}

interface Album {
    id: number;
    title: string;
    image: string;
    yearOfRelease: number;
}

interface Track {
    id: number;
    title: string;
    duration: number;
    artists: string;
    albums: string;
    getDuration(): string;
}

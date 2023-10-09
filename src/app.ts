"use strict";

import { Album } from "./Model/Album.js";
import { Artist } from "./Model/Artist.js";
import { Track } from "./Model/Track.js";

const globalArtists: Artist[] = [];
const globalAlbums: Album[] = [];
const globalTracks: Track[] = [];

window.addEventListener("load", app);

function app() {
    console.log("hello there!");
}

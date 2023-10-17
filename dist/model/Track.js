export default class Track {
    title;
    duration;
    artists;
    albums;
    id;
    constructor(title, duration, artists, albums, id) {
        this.title = title;
        this.duration = duration;
        this.artists = artists;
        this.albums = albums;
        this.id = id;
    }
    getDuration() {
        const minutes = Math.floor(this.duration / 60);
        const remainingSeconds = this.duration % 60;
        return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
    }
    setDuration(newDuration) {
        if (typeof newDuration === "string") {
            const [minutes, seconds] = newDuration.split(":").map(Number);
            const totalSeconds = minutes * 60 + seconds;
            this.duration = totalSeconds;
        }
        else if (typeof newDuration === "number") {
            this.duration = newDuration;
        }
    }
    getId() {
        return this.id;
    }
}

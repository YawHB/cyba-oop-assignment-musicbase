export default class Track {
    title;
    artists;
    albums;
    id;
    duration;
    constructor(title, duration, artists, albums, id) {
        this.title = title;
        this.artists = artists;
        this.albums = albums;
        this.id = id;
        typeof duration == "number" ? (this.duration = duration) : (this.duration = this.setDuration(duration));
    }
    getTitle() {
        return this.title;
    }
    setTitle(newTitle) {
        this.title = newTitle;
    }
    getDuration() {
        const minutes = Math.floor(this.duration / 60);
        const remainingSeconds = this.duration % 60;
        return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
    }
    setDuration(newDuration) {
        return Number(newDuration);
    }
    getId() {
        return this.id;
    }
}

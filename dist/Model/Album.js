export default class Album {
    constructor(title, yearOfRelease, image, id) {
        this.title = title;
        this.yearOfRelease = yearOfRelease;
        this.image = image;
        this.id = id;
    }
    getId() {
        return this.id;
    }
}

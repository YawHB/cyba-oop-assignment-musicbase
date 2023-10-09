export class Album {
    title;
    yearOfRelease;
    image;
    id;
    constructor(title, yearOfRelease, image, id) {
        this.title = title;
        this.yearOfRelease = yearOfRelease;
        this.image = image;
        this.id = id;
    }
    getTitle() {
        return this.title;
    }
    getYearOfRelease() {
        return this.yearOfRelease;
    }
    getImage() {
        return this.image;
    }
    getId() {
        return this.id;
    }
}

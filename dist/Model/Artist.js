export default class Artist {
    constructor(name, image, id) {
        this.name = name;
        this.image = image;
        this.id = id;
    }
    getId() {
        return this.id;
    }
}

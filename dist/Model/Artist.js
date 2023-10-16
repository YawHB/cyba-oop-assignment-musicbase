export default class Artist {
    name;
    image;
    id;
    constructor(name, image, id) {
        this.name = name;
        this.image = image;
        this.id = id;
    }
    getId() {
        return this.id;
    }
}

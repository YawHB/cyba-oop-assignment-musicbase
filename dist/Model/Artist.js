export default class Artist {
    name;
    image;
    id;
    constructor(name, image, id) {
        this.name = name;
        this.image = image;
        this.id = id;
    }
    getName() {
        return this.name;
    }
    setName(newName) {
        this.name = newName;
    }
    getImage() {
        return this.image;
    }
    setImage(newImage) {
        this.image = newImage;
    }
    getId() {
        return this.id;
    }
}

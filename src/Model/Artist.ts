export default class Artist {
    constructor(
        private name: string,
        private image: string,
        private id: number
    ) {}

    public getName(): string {
        return this.name;
    }

    public setName(newName: string): void {
        this.name = newName;
    }

    public getImage(): string {
        return this.image;
    }

    public setImage(newImage: string): void {
        this.image = newImage;
    }

    public getId(): number {
        return this.id;
    }
}

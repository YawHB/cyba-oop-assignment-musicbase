export class Artist {
    
    constructor(private name: string, private image: string) {}

    getName(): string {
        return this.name;
    }

    setName(newName: string): void {
        this.name = newName;
    }

    getImage(): string {
        return this.image;
    }

    setImage(newImage: string): void {
        this.image = newImage;
    }
}

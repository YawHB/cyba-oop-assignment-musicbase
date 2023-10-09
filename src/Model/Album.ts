export class Album {
    constructor(
        private title: string,
        private yearOfRelease: number,
        private image: string,
        private id: number
    ) {}

    public getTitle(): string {
        return this.title;
    }
    public getYearOfRelease(): number {
        return this.yearOfRelease;
    }

    public getImage(): string {
        return this.image;
    }

    public getId(): number {
        return this.id;
    }
}

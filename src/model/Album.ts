export default class Album {
    [key: string]: any;
    constructor(public title: string, public yearOfRelease: number, public image: string, private id: number) {}

    // public getTitle(): string {
    //     return this.title;
    // }
    // public getYearOfRelease(): number {
    //     return this.yearOfRelease;
    // }

    // public getImage(): string {
    //     return this.image;
    // }

    public getId(): number {
        return this.id;
    }
}

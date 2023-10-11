export default class Album {
    [key: string]: any;

    constructor(public title: string, public yearOfRelease: number, public image: string, private id: number) {}

    public getId(): number {
        return this.id;
    }
}

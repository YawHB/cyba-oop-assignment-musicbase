export default class Artist {
    [key: string]: any;
    constructor(public name: string, public image: string, private id: number) {}

    public getId(): number {
        return this.id;
    }
}

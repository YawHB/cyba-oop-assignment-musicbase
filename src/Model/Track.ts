export default class Track {
    private duration: number;

    constructor(
        private title: string,
        duration: number | string,
        private artists: string,
        private albums: string,
        private id: number
    ) {
        typeof duration == "number"
            ? (this.duration = duration)
            : (this.duration = this.setDuration(duration));
    }

    public getTitle(): string {
        return this.title;
    }

    public setTitle(newTitle: string): void {
        this.title = newTitle;
    }

    public getDuration(): string {
        const minutes = Math.floor(this.duration / 60);
        const remainingSeconds = this.duration % 60;

        return `${minutes}:${
            remainingSeconds < 10 ? "0" : ""
        }${remainingSeconds}`;
    }

    public setDuration(newDuration: string): number {
        //! Skal laves om. Konverter fra string (MM:SS) til sekunder (number)
        return Number(newDuration);
    }

    public getId(): number {
        return this.id;
    }
}

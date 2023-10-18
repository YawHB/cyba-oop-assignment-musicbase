export default class Track {
    [key: string]: any;

    constructor(public title: string, private duration: number , public artists: string, public albums: string, private id: number) {
    }

    public getDuration(): string {
        const minutes = Math.floor(this.duration / 60);
        const remainingSeconds = this.duration % 60;

        return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
    }

    public setDuration(newDuration: string | number): void {
        if (typeof newDuration === "string") {
            const [minutes, seconds] = newDuration.split(":").map(Number);
            const totalSeconds = minutes * 60 + seconds;
            this.duration = totalSeconds;
        } else if (typeof newDuration === "number") {
            this.duration = newDuration;
        }
    }

    public getId(): number {
        return this.id;
    }
}

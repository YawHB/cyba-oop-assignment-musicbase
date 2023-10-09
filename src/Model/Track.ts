export class Track {
    private duration: number;
    
    constructor(private title: string, duration: number | string, private artists: string, private albums: string) {
        typeof duration == "number" ? this.duration = duration : this.duration = this.setDuration(duration);
    }

    getTitle(): string {
        return this.title;
    }

    setTitle(newTitle: string): void {
        this.title = newTitle;
    }

    getDuration(): string {
        const minutes = Math.floor(this.duration / 60);
        const remainingSeconds = this.duration % 60;

        return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
    }

    setDuration(newDuration: string): number {
        //! Skal laves om. Konverter fra string (MM:SS) til sekunder (number) 
        return Number(newDuration);
    }

}

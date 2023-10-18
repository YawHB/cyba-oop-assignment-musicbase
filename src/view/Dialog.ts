import Artist from "../model/Artist.js";
import Album from "../model/Album.js";
import Track from "../model/Track.js";

export default abstract class Dialog {
    private static dialogWindow = document.querySelector(
        "#main-dialog-frame"
    ) as HTMLDialogElement;

    protected static dialogContent = document.querySelector(
        "#main-dialog-content"
    ) as HTMLElement;

    static open(): void {
        this.dialogWindow.showModal();
    }

    static close(): void {
        this.dialogWindow.close();
    }

    static clear(): void {
        this.dialogContent.innerHTML = "";
    }

    protected async renderHTML(html: string): Promise<void> {
        Dialog.clear()
        Dialog.open()
        Dialog.dialogContent.insertAdjacentHTML('beforeend', html)
    }

    protected abstract postRender(type: string, item?: Artist | Album | Track): void;
    public abstract create(item: Artist | Album | Track): void
    public abstract details(item: Artist | Album | Track): void
    public abstract update(item: Artist | Album | Track): void
    public abstract delete(item: Artist | Album | Track): void
}

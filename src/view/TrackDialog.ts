import Dialog from "./Dialog.js";
import Artist from "../model/Artist.js";
import Album from "../model/Album.js";
import Track from "../model/Track.js";

export default class TrackDialog extends Dialog {

    protected renderHTML(item: Track, html: string): void {
        Dialog.clear()
        Dialog.open()
        Dialog.dialogContent.insertAdjacentHTML('beforeend', html)
    }

    protected postRender(): void {
    }

    create(item: Artist | Album | Track): void {
    }

    delete(item: Artist | Album | Track): void {
    }

    public details(item: Track): void {
        this.renderHTML(item, /*html*/ `
        <h2>${item.title}</h2>
    `);
    }

    update(item: Artist | Album | Track): void {
    }


}
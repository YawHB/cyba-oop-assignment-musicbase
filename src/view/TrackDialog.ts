import Dialog from "./Dialog.js";
import Artist from "../model/Artist.js";
import Album from "../model/Album.js";
import Track from "../model/Track.js";

export default class TrackDialog extends Dialog {

    protected renderHTML( html: string): void {
        Dialog.clear()
        Dialog.open()
        Dialog.dialogContent.insertAdjacentHTML('beforeend', html)
    }

    protected postRender(): void {
    }

    create(): void {
        console.log("create track")
    }

    delete(item: Artist | Album | Track): void {
    }

    public details(item: Track): void {

        const html = /*html*/ `
        <h2>${item.title}</h2>`;
        
        this.renderHTML(html);
    }

    update(item: Artist | Album | Track): void {
    }


}
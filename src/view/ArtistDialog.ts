import Dialog from "./Dialog.js";
import Artist from "../model/Artist.js";
import Album from "../model/Album.js";
import Track from "../model/Track.js";

export default class ArtistDialog extends Dialog {

    protected renderHTML(html: string): void {
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

    public details(item: Artist): void {
        this.renderHTML(/*html*/ `
        <h2>${item.name}</h2>
        <img src="${item.image}" alt="${item.name}">
    `);
    }

    update(item: Artist | Album | Track): void {
    }


}
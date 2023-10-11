import Dialog from "./Dialog.js";
import Artist from "../model/Artist.js";
import Album from "../model/Album.js";
import Track from "../model/Track.js";

export default class AlbumDialog extends Dialog {

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

    public details(item: Album): void {
        const html = /*html*/ `<h2>${item.title}</h2>
        <img src="${item.image}" alt="${item.title}">`
        
        this.renderHTML(html);
    }

    update(item: Artist | Album | Track): void {
    }


}
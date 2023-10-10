import Album from "./Album.js";
import AlbumRenderer from "./AlbumRenderer.js";
import Artist from "./Artist.js";
import ArtistRenderer from "./ArtistRenderer.js";
import Track from "./Track.js";
import TrackRenderer from "./TrackRenderer.js";

export default class ListRenderer {
    container: HTMLElement;
    private list: AlbumRenderer[] | TrackRenderer[] | ArtistRenderer[];

    constructor(
        list: Album[] | Track[] | Artist[],
        container: string,
        private itemRenderer: any //TODO skal rettes fra any
    ) {
        this.container = document.querySelector(`.${container}`) as HTMLElement;
        this.list = [];
        this.setList(list);
    }

    public renderList(): void {
        for (const item of this.list) {
            const html = item.renderHTML();
            this.container.insertAdjacentHTML("beforeend", html);

            if (this.container.lastElementChild) {
                item.postRender(this.container.lastElementChild);
            }
        }
    }

    public setList(newList: any[]) {
        this.list = [];
        for (const item of newList) {
            this.list.push(new this.itemRenderer(item));
        }
    }
}

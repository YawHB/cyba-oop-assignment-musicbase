import Album from "../model/Album.js";
import AlbumRenderer from "./AlbumRenderer.js";
import Artist from "../model/Artist.js";
import ArtistRenderer from "./ArtistRenderer.js";
import Track from "../model/Track.js";
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

    public renderList(filteredList?: (AlbumRenderer | TrackRenderer | ArtistRenderer)[]): void {
        this.clear();

        for (const item of filteredList ?? this.list) {
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

    public search(searchValue: string) {
        if (!searchValue) {
            this.renderList();
        }

        const filteredList = this.list.filter((index) => {
            if (index instanceof ArtistRenderer) {
                return index.item.name.toLowerCase().includes(searchValue);
            } else {
                return index.item.title.toLowerCase().includes(searchValue);
            }
        });

        this.renderList(filteredList);
    }

    private clear() {
        this.container.innerHTML = "";
    }
}

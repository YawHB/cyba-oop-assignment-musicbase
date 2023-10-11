import Album from "../model/Album.js";
import AlbumRenderer from "./AlbumRenderer.js";
import Artist from "../model/Artist.js";
import ArtistRenderer from "./ArtistRenderer.js";
import Track from "../model/Track.js";
import TrackRenderer from "./TrackRenderer.js";

export default class ListRenderer {
    container: HTMLElement;
    sortContainer: HTMLElement;
    private list: AlbumRenderer[] | TrackRenderer[] | ArtistRenderer[];
    private sortValue: string;
    private sortByValue: string;
    private searchValue: string;

    constructor(
        list: Album[] | Track[] | Artist[],
        container: string,
        private itemRenderer: any, //TODO skal rettes fra any
        sortContainer: string
    ) {
        this.container = document.querySelector(`.${container}`) as HTMLElement;
        this.sortContainer = document.querySelector(`#${sortContainer}`) as HTMLElement;
        this.list = [];
        this.setList(list);

        this.sortValue = (this.sortContainer.querySelector(".sort") as HTMLSelectElement)?.value;
        this.sortByValue = (this.sortContainer.querySelector(".sort-order") as HTMLSelectElement)?.value;
        this.searchValue = "";
        this.postRender();
    }

    public renderList(filteredList?: (AlbumRenderer | TrackRenderer | ArtistRenderer)[]): void {
        this.clear();

        this.sort(filteredList ?? this.list);

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

    public search(searchValue?: string) {
        if (searchValue) {
            this.searchValue = searchValue;
        }

        if (!this.searchValue) {
            this.renderList();
            return;
        }

        const filteredList = this.list.filter((item) => {
            if (item instanceof ArtistRenderer) {
                return item.item.name.toLowerCase().includes(this.searchValue);
            } else {
                return item.item.title.toLowerCase().includes(this.searchValue);
            }
        });

        this.renderList(filteredList);
    }

    private sort(list: (AlbumRenderer | TrackRenderer | ArtistRenderer)[]): void {
        list.sort((b, a) => {
            if (a.item[this.sortValue] > b.item[this.sortValue]) {
                return 1;
            } else {
                return -1;
            }
        });

        if (this.sortByValue === "DESC") {
            list.reverse();
        }
    }

    private postRender() {
        this.sortContainer.querySelector(".sort")?.addEventListener("change", () => {
            this.sortValue = (this.sortContainer.querySelector(".sort") as HTMLSelectElement)?.value;
            this.search();
        });

        this.sortContainer.querySelector(".sort-order")?.addEventListener("change", () => {
            this.sortByValue = (this.sortContainer.querySelector(".sort-order") as HTMLSelectElement)?.value;
            this.search();
        });
    }

    private clear() {
        this.container.innerHTML = "";
    }
}

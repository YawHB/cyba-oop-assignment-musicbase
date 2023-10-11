import ArtistRenderer from "./ArtistRenderer.js";
export default class ListRenderer {
    itemRenderer;
    container;
    sortContainer;
    list;
    sortValue;
    sortByValue;
    searchValue;
    constructor(list, container, itemRenderer, sortContainer) {
        this.itemRenderer = itemRenderer;
        this.container = document.querySelector(`.${container}`);
        this.sortContainer = document.querySelector(`#${sortContainer}`);
        this.list = [];
        this.setList(list);
        this.sortValue = this.sortContainer.querySelector(".sort")?.value;
        this.sortByValue = this.sortContainer.querySelector(".sort-order")?.value;
        this.searchValue = "";
        this.initiateEventListeners();
    }
    renderList(filteredList) {
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
    setList(newList) {
        this.list = [];
        for (const item of newList) {
            this.list.push(new this.itemRenderer(item));
        }
    }
    search(searchValue) {
        if (searchValue) {
            this.searchValue = searchValue;
        }
        if (!this.searchValue) {
            this.renderList();
            return;
        }
        const filteredList = this.list.filter((index) => {
            if (index instanceof ArtistRenderer) {
                return index.item.name.toLowerCase().includes(this.searchValue);
            }
            else {
                return index.item.title.toLowerCase().includes(this.searchValue);
            }
        });
        this.renderList(filteredList);
    }
    sort(list) {
        list.sort((b, a) => {
            if (a.item[this.sortValue] > b.item[this.sortValue]) {
                return 1;
            }
            else {
                return -1;
            }
        });
        if (this.sortByValue === "DESC") {
            list.reverse();
        }
    }
    initiateEventListeners() {
        this.sortContainer.querySelector(".sort")?.addEventListener("change", () => {
            this.sortValue = this.sortContainer.querySelector(".sort")?.value;
            this.search();
        });
        this.sortContainer.querySelector(".sort-order")?.addEventListener("change", () => {
            this.sortByValue = this.sortContainer.querySelector(".sort-order")?.value;
            this.search();
        });
    }
    clear() {
        this.container.innerHTML = "";
    }
}

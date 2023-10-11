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
        this.postRender();
    }
    clearList() {
        this.container.innerHTML = "";
    }
    renderList() {
        this.clearList();
        const list = this.search();
        this.sort(list);
        for (const item of list) {
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
    setSearchValue(newSearchValue) {
        if (newSearchValue || newSearchValue == "") {
            this.searchValue = newSearchValue;
        }
        this.renderList();
    }
    search() {
        if (!this.searchValue) {
            return this.list;
        }
        const filteredList = this.list.filter((item) => {
            if (item instanceof ArtistRenderer) {
                return item.item.name.toLowerCase().includes(this.searchValue);
            }
            else {
                return item.item.title.toLowerCase().includes(this.searchValue);
            }
        });
        return filteredList;
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
    postRender() {
        this.sortContainer.querySelector(".sort")?.addEventListener("change", () => {
            this.sortValue = this.sortContainer.querySelector(".sort")?.value;
            this.setSearchValue();
        });
        this.sortContainer.querySelector(".sort-order")?.addEventListener("change", () => {
            this.sortByValue = this.sortContainer.querySelector(".sort-order")?.value;
            this.setSearchValue();
        });
    }
}

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
        this.list = [];
        this.setList(list);
        this.sortContainer = document.querySelector(`#${sortContainer}`);
        this.initiateEventListeners();
        this.sortValue = this.initSortValue();
        this.sortByValue = this.initSortByValue();
        this.searchValue = "";
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
    initiateEventListeners() {
        this.sortContainer.querySelector(".sort")?.addEventListener("change", () => {
            const sortElement = this.sortContainer.querySelector(".sort");
            this.setSortValue(sortElement.value);
            this.search();
        });
        this.sortContainer.querySelector(".sort-order")?.addEventListener("change", () => {
            const sortByElement = this.sortContainer.querySelector(".sort-order");
            this.setSortByValue(sortByElement.value);
            this.search();
        });
    }
    initSortValue() {
        const sortElement = this.sortContainer.querySelector(".sort");
        return sortElement.value;
    }
    initSortByValue() {
        const sortByElement = this.sortContainer.querySelector(".sort-order");
        return sortByElement.value;
    }
    setSortValue(newSortValue) {
        this.sortValue = newSortValue;
    }
    setSortByValue(newSortByValue) {
        this.sortByValue = newSortByValue;
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
    clear() {
        this.container.innerHTML = "";
    }
}

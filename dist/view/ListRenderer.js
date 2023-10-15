import ArtistRenderer from "./ArtistRenderer.js";
export default class ListRenderer {
    constructor(list, container, itemRenderer, sortContainer) {
        var _a, _b;
        this.itemRenderer = itemRenderer;
        this.container = document.querySelector(`.${container}`);
        this.sortContainer = document.querySelector(`#${sortContainer}`);
        this.list = [];
        this.setList(list);
        this.sortValue = (_a = this.sortContainer.querySelector(".sort")) === null || _a === void 0 ? void 0 : _a.value;
        this.sortByValue = (_b = this.sortContainer.querySelector(".sort-order")) === null || _b === void 0 ? void 0 : _b.value;
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
        var _a, _b;
        (_a = this.sortContainer.querySelector(".sort")) === null || _a === void 0 ? void 0 : _a.addEventListener("change", () => {
            var _a;
            this.sortValue = (_a = this.sortContainer.querySelector(".sort")) === null || _a === void 0 ? void 0 : _a.value;
            this.setSearchValue();
        });
        (_b = this.sortContainer.querySelector(".sort-order")) === null || _b === void 0 ? void 0 : _b.addEventListener("change", () => {
            var _a;
            this.sortByValue = (_a = this.sortContainer.querySelector(".sort-order")) === null || _a === void 0 ? void 0 : _a.value;
            this.setSearchValue();
        });
    }
}

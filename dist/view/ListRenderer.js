import ArtistRenderer from "./ArtistRenderer.js";
export default class ListRenderer {
    itemRenderer;
    container;
    list;
    constructor(list, container, itemRenderer) {
        this.itemRenderer = itemRenderer;
        this.container = document.querySelector(`.${container}`);
        this.list = [];
        this.setList(list);
    }
    renderList(filteredList) {
        this.clear();
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
        if (!searchValue) {
            this.renderList();
        }
        const filteredList = this.list.filter((index) => {
            if (index instanceof ArtistRenderer) {
                return index.item.name.toLowerCase().includes(searchValue);
            }
            else {
                return index.item.title.toLowerCase().includes(searchValue);
            }
        });
        this.renderList(filteredList);
    }
    clear() {
        this.container.innerHTML = "";
    }
}

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
    clearList() {
        this.container.innerHTML = "";
    }
    renderList() {
        for (const item of this.list) {
            const html = item.renderHTML();
            this.container.insertAdjacentHTML("beforeend", html);
            if (this.container.lastElementChild) {
                item.postRender(this.container.lastElementChild);
            }
        }
    }
    setList(newList) {
        console.log(newList);
        this.list = [];
        for (const item of newList) {
            this.list.push(new this.itemRenderer(item));
        }
    }
}

export class ListRenderer {
    container: HTMLElement;

    constructor(
        private list: any[],
        container: string,
        private itemRenderer: any
    ) {
        this.container = document.querySelector(container) as HTMLElement;
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
        for (const item of newList) {
            this.list.push(new this.itemRenderer(item));
        }
    }
}

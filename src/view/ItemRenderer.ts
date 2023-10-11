export default abstract class ItemRenderer {
    public item: any;

    constructor() {}

    public abstract renderHTML(): string;

    public abstract postRender(lastElementChild: Element): void;
}

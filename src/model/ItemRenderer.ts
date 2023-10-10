export default abstract class ItemRenderer {
    protected item: any;

    constructor() {}

    public abstract renderHTML(): string;

    public abstract postRender(lastElementChild: Element): void;
}

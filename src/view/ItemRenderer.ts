export default abstract class ItemRenderer {
    [key: string]: any;
    public item: any;

    protected constructor() {}

    public abstract renderHTML(): string;

    public abstract postRender(lastElementChild: Element): void;
}

export abstract class ItemRenderer {
    protected item: any;

    public abstract renderHTML(): string;

    public abstract postRenderer(lastElementChild: Element): void;
}

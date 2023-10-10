export default abstract class Dialog {
    private static dialogWindow = document.querySelector(
        "#main-dialog-frame"
    ) as HTMLDialogElement;

    private static dialogContent = document.querySelector(
        "#main-dialog-content"
    ) as HTMLElement;

    static open(): void {
        this.dialogWindow.showModal();
    }

    static close(): void {
        console.log("click?");

        this.dialogWindow.close();
    }

    static clear(): void {
        this.dialogContent.innerHTML = "";
    }

    protected abstract renderHTML(): string;

    protected abstract postRender(): void;
}

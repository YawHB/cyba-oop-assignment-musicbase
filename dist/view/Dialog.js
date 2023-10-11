export default class Dialog {
    static dialogWindow = document.querySelector("#main-dialog-frame");
    static dialogContent = document.querySelector("#main-dialog-content");
    static open() {
        this.dialogWindow.showModal();
    }
    static close() {
        this.dialogWindow.close();
    }
    static clear() {
        this.dialogContent.innerHTML = "";
    }
}

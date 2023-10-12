import Dialog from "./Dialog.js";
export default class TrackDialog extends Dialog {
    renderHTML(html) {
        Dialog.clear();
        Dialog.open();
        Dialog.dialogContent.insertAdjacentHTML('beforeend', html);
    }
    postRender() {
    }
    create() {
        console.log("create track");
    }
    delete(item) {
    }
    details(item) {
        const html = `
        <h2>${item.title}</h2>`;
        this.renderHTML(html);
    }
    update(item) {
    }
}

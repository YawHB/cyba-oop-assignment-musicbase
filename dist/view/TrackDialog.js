import Dialog from "./Dialog.js";
export default class TrackDialog extends Dialog {
    renderHTML(item, html) {
        Dialog.clear();
        Dialog.open();
        Dialog.dialogContent.insertAdjacentHTML('beforeend', html);
    }
    postRender() {
    }
    create(item) {
    }
    delete(item) {
    }
    details(item) {
        this.renderHTML(item, `
        <h2>${item.title}</h2>
    `);
    }
    update(item) {
    }
}

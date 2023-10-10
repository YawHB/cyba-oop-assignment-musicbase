import Dialog from "./Dialog.js";
export default class TrackDialog extends Dialog {
    renderHTML(html) {
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
        this.renderHTML(`
        <h2>${item.title}</h2>
    `);
    }
    update(item) {
    }
}

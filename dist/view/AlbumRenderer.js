var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import ItemRenderer from "./ItemRenderer.js";
import AlbumDialog from "./AlbumDialog.js";
export default class AlbumRenderer extends ItemRenderer {
    constructor(item) {
        super();
        this.item = item;
    }
    renderHTML() {
        return `
        <article class="album-card">
        <div class="album-card-image">
            <img src="${this.item.image}" alt="${this.item.title}">
        </div>
        <div class="album-card-content">
            <h4>${this.item.title}</h4>
            <p>${this.item.yearOfRelease}</p>
        </div>
        </article>
        
        `;
    }
    postRender(lastElementChild) {
        return __awaiter(this, void 0, void 0, function* () {
            lastElementChild.addEventListener("click", () => {
                console.log(this.item);
                new AlbumDialog().details(this.item);
            });
        });
    }
}

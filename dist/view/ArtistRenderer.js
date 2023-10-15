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
import ArtistDialog from "./ArtistDialog.js";
export default class ArtistRenderer extends ItemRenderer {
    constructor(item) {
        super();
        this.item = item;
    }
    renderHTML() {
        return `
         <article class="artist-card">
        <div class="artist-card-image">
            <img src="${this.item.image}" alt="${this.item.name}">
        </div>
        <div class="artist-card-content">
            <h4>${this.item.name}</h4>
        </div>
        </article>
        
        `;
    }
    postRender(lastElementChild) {
        return __awaiter(this, void 0, void 0, function* () {
            lastElementChild.addEventListener('click', () => {
                new ArtistDialog().details(this.item);
            });
        });
    }
}

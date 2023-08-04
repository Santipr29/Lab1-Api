import styles from "./card.css";

export enum Attribute {
    "name" = "name",
    "uid" = "uid",
    "image" = "image",
}

class Card extends HTMLElement {
    name?: string;
    uid?: number;
    image?: string;

    static get observedAttributes() {
        const attrs: Record<Attribute, null> = {
            name: null,
            uid: null,
            image: null,
        };
        return Object.keys(attrs);
    }

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.render();
    }

    attributeChangedCallback(
        propName: Attribute,
        _: string | undefined,
        newValue: string | undefined
        ) {
            switch (propName) {
                case Attribute.uid:
                    this.uid = newValue ? Number(newValue) : undefined;
                    break;

                default:
                this[propName] = newValue;
                break;
            }

            this.render();
        }

        render() {
            if (this.shadowRoot) {
                this.shadowRoot.innerHTML = ``

                const css = this.ownerDocument.createElement("style");
                css.innerHTML = styles;
                this.shadowRoot?.appendChild(css);

                const container = this.ownerDocument.createElement("section")

                const Pokeid = this.ownerDocument.createElement("h1")
                Pokeid.innerText = String(this.uid)
                container.appendChild(Pokeid)

                const Pokeimg = this.ownerDocument.createElement("img")
                Pokeimg.src = String(this.image)
                container.appendChild(Pokeimg)

                const Pokename = this.ownerDocument.createElement("h2")
                Pokename.innerText = String(this.name)
                container.appendChild(Pokename)

                const favbtn = this.ownerDocument.createElement("button")
                favbtn.innerText = "add Fav"
                favbtn.addEventListener("click",()=>{
                    
                })
                container.appendChild(favbtn)

                this.shadowRoot?.appendChild(container)
            }
        }
    }

customElements.define("my-card", Card);
export default Card;
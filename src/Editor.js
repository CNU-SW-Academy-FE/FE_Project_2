import { request } from "./API.js";

function Editor({ $target, onChange }) {
    this.state = {};
    this.setState = (nextState) => {
        this.state = nextState;
        this.render();
    };
    this.render = (initial = false) => {
        const { id, title, content } = this.state;
        if (initial) {
            const $editor = document.createElement("div");
            $editor.className = "editor";
            const $title = document.createElement("header");
            $title.innerHTML = title;
            const $content = document.createElement("article");
            $content.innerHTML = content;
            $editor.appendChild($title);
            $editor.appendChild($content);
            $target.appendChild($editor);
        } else {
            const $editor = document.querySelector(".editor");
            const $title = $editor.querySelector("header");
            $title.innerHTML = title;
            const $content = $editor.querySelector("article");
            $content.innerHTML = content;
        }
    };
    this.render(true);
}

export default Editor;

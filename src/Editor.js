function Editor({ $target, onChange }) {
    this.state = {};
    this.setState = (nextState) => {
        this.state = nextState;
        this.render();
    };
    this.render = (init = false) => {
        const { id, title, content } = this.state;
        if (init) {
            const $editor = document.createElement("div");
            $editor.className = "editor";
            $editor.innerHTML = "<header></header><article></article>";
            $target.appendChild($editor);
        } else {
            const $title = document.querySelector(".editor header");
            const $content = document.querySelector(".editor article");
            if (title) {
                $title.setAttribute("contentEditable", true);
                $title.style.border = "5px solid #55595e";
                $content.setAttribute("contentEditable", true);
                $content.style.border = "5px solid #55595e";
            } else {
                $title.setAttribute("contentEditable", false);
                $title.style.border = "none";
                $content.setAttribute("contentEditable", false);
                $content.style.border = "none";
            }
            $title.innerHTML = title;
            $content.innerHTML = content;
        }
    };
    this.render(true);
}

export default Editor;

function Editor({ $target, onChange, onSubDocClick }) {
    const handleEnterKeyInput = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            document.execCommand("insertLineBreak");
        }
    };

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
            $editor.innerHTML =
                '<div class="save"></div><header></header><article></article><footer></footer>';
            $target.appendChild($editor);
        } else {
            const $title = document.createElement("header");
            const $content = document.createElement("article");
            const $footer = document.createElement("footer");
            const $save = document.querySelector(".save");
            if (title) {
                $title.setAttribute("contentEditable", true);
                $title.style.border = "5px solid #55595e";
                $title.addEventListener("input", async (e) => {
                    await onChange({
                        id,
                        title: e.target.textContent,
                        content: $content.textContent,
                        save: $save,
                    });
                });
                $title.addEventListener("keydown", handleEnterKeyInput);
                $title.innerHTML = title;

                $content.setAttribute("contentEditable", true);
                $content.style.border = "5px solid #55595e";
                $content.addEventListener("input", async (e) => {
                    await onChange({
                        id,
                        title: $title.textContent,
                        content: e.target.textContent,
                        save: document.querySelector(".save"),
                    });
                });
                $content.addEventListener("keydown", handleEnterKeyInput);
                $content.innerHTML = content;

                if (this.state.subDoc) {
                    const { id: subDocId, title: subDocTitle } =
                        this.state.subDoc;
                    $footer.addEventListener("click", () =>
                        onSubDocClick(subDocId)
                    );
                    $footer.innerHTML = "하위 문서 : " + subDocTitle;
                } else {
                    $footer.innerHTML = "하위 문서 : 없음";
                }

                const $editor = document.querySelector(".editor");
                $editor.replaceChild(
                    $title,
                    document.querySelector(".editor header")
                );
                $editor.replaceChild(
                    $content,
                    document.querySelector(".editor article")
                );
                $editor.replaceChild(
                    $footer,
                    document.querySelector(".editor footer")
                );
            } else {
                $title.setAttribute("contentEditable", false);
                $title.style.border = "none";
                $content.setAttribute("contentEditable", false);
                $content.style.border = "none";
            }
        }
    };
    this.render(true);
}

export default Editor;

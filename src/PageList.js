import { getIconNode } from "./Icon.js";

function addDocument(
    $parentNode,
    pageList = [],
    indent = 0,
    onRead,
    onCreate,
    onDelete
) {
    if (pageList.length === 0) return;
    const $ul = document.createElement("ul");
    for (const { id, title, documents } of pageList) {
        const $li = document.createElement("li");
        const $tmp = document.createElement("div");
        $tmp.className = "pageItem";
        $tmp.dataset.id = id;
        $tmp.style.marginLeft = `${20 * indent}px`;
        $tmp.appendChild(getIconNode("../icons/note.svg", "note"));
        const $text = document.createElement("div");
        $text.className = "pageItemText";
        $text.innerHTML = title;
        $text.addEventListener("click", () => onRead(id));
        $tmp.appendChild($text);
        $tmp.appendChild(
            getIconNode("../icons/plus.svg", "plus", () => onCreate(id))
        );
        $tmp.appendChild(
            getIconNode("../icons/trash.svg", "trash", () => onDelete(id))
        );
        $li.appendChild($tmp);
        $ul.appendChild($li);
    }
    $parentNode.appendChild($ul);
}

function PageList({
    $target,
    onNewPageClick,
    onTitleClick,
    onItemPlusClick,
    onItemDeleteClick,
}) {
    this.state = [];
    this.setState = (nextState) => {
        this.state = nextState;
        console.log(this.state);
        this.render();
    };
    this.render = (initial = false) => {
        if (initial) {
            const $pageList = document.createElement("div");
            $pageList.className = "pageList";
            const $header = document.createElement("header");
            $header.innerHTML = "Notion";
            const $article = document.createElement("article");
            addDocument(
                $article,
                this.state,
                onTitleClick,
                onItemPlusClick,
                onItemDeleteClick
            );
            const $footer = document.createElement("footer");
            $footer.innerHTML = "+ New Page";
            $footer.addEventListener("click", onNewPageClick);
            $pageList.appendChild($header);
            $pageList.appendChild($article);
            $pageList.appendChild($footer);
            $target.appendChild($pageList);
        } else {
            const $pageList = document.querySelector(".pageList");
            const $old = document.querySelector("article");
            const $new = document.createElement("article");
            addDocument(
                $new,
                this.state,
                onTitleClick,
                onItemPlusClick,
                onItemDeleteClick
            );
            $pageList.replaceChild($new, $old);
        }
    };
    this.render(true);
}

export default PageList;

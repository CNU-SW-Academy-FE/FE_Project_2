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
        $li.style.marginLeft = `${indent * 10}px`;
        const $tmp = document.createElement("div");
        $tmp.className = "pageItem";
        $tmp.dataset.id = id;
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
            getIconNode("../icons/trash.svg", "trash", () =>
                onDelete({ id, title, documents })
            )
        );
        $li.appendChild($tmp);
        $ul.appendChild($li);
        if (documents?.length) {
            const $nestedList = document.createElement("li");
            $nestedList.style.listStyleType = "none";
            addDocument(
                $nestedList,
                documents,
                indent + 1,
                onRead,
                onCreate,
                onDelete
            );
            $ul.appendChild($nestedList);
        }
    }
    $parentNode.appendChild($ul);
}

function PageList({
    $target,
    onHomeClick,
    onNewPageClick,
    onTitleClick,
    onItemPlusClick,
    onItemDeleteClick,
}) {
    this.state = [];
    this.setState = (nextState) => {
        this.state = nextState;
        this.render();
    };
    this.render = (initial = false) => {
        if (initial) {
            const $pageList = document.createElement("div");
            $pageList.className = "pageList";
            const $header = document.createElement("header");
            $header.innerHTML = "Home";
            $header.addEventListener("click", onHomeClick);
            const $article = document.createElement("article");
            addDocument(
                $article,
                this.state,
                0,
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
                0,
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

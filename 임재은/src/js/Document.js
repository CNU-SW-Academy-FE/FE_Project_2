import { request } from "../api/request.js";

export default function DocumentList({
    $target,
    initialState,
    onChange,
    onClick,
    onDelete
}) {
    const $page = document.createElement("div");
    $page.style.display = "inline-block";
    $page.style.border = "1px solid black";
    $page.style.padding = "0px 12px";
    const $ul = document.createElement("ul");
    $page.appendChild($ul);
    $target.appendChild($page);

    const $addRootButton = document.createElement("button");
    $addRootButton.textContent = "루트 문서 추가";
    $addRootButton.style.position = "relative";
    $addRootButton.style.top = "0px";
    $page.appendChild($addRootButton);
    $addRootButton.addEventListener("click", () => {
        createDocument(null);
        onChange();
    });

    this.state = initialState;

    this.setState = (nextState) => {
        this.state = nextState;
        this.render();
    }

    const deleteDocument = async ( documentId ) => {
        await request(`/documents/${documentId}`, {
            method: "DELETE"
        });
        onDelete(documentId);
    }

    const createDocument = async (documentId) => {
        await request("/documents", {
            method: "POST",
            body: JSON.stringify({
                title: "untitled",
                parent: documentId
            })
        })
        onChange();
    }

    this.render = () => {
        const recursiveDocument = (docs) => {
            const $ul = document.createElement("ul");
            $ul.innerHTML = `
                ${docs.map(({ id, title, documents }) => `
                    <li data-documentid="${id}"><span>${title}</span><button class="createButton">+</button><button class="deleteButton">-</button></li>
                    ${documents.length > 0 ? recursiveDocument(documents) : ""}`
                ).join("")}
            `;
            return $ul.outerHTML;
        };
        
        $ul.innerHTML = `
            ${this.state.map(({ id, title, documents }) => `
                <li data-documentid="${id}"><span>${title}</span><button class="createButton">+</button><button class="deleteButton">-</button></li>
                ${documents.length > 0 ? recursiveDocument(documents) : ""}`
            ).join("")}
        `;

        document.querySelectorAll("li").forEach(($li) => {
            $li.addEventListener("click", (e) => {
                const { className } = e.target;
                const id = e.target.closest('li').dataset.documentid;
                if (className == "createButton") {
                    createDocument(id);
                } else if (className == "deleteButton") {
                    deleteDocument(id);
                } else {
                    onClick($li.dataset.documentid);
                }
            });
        });
    }

}
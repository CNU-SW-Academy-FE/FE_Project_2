import DocumentList from "./DocumentList.js";
import { deleteDocument, createDocument } from "../util/DocumentRequest.js";

export default function SideBar({
    $target,
    initialState,
    onChange,
    onSelect,
    onDelete
}) {
    const $container = document.createElement("div");
    $container.className = "sideBar";
    $target.appendChild($container);
    
    const $topBar = document.createElement("div");
    $topBar.className = "topBar";

    const $pin = document.createElement("button");
    $pin.className = "pin"
    $pin.textContent = ">>";
    $topBar.appendChild($pin);


    const $contentBar = document.createElement("div");
    $contentBar.className = "contentBar";
    const $documenList = document.createElement("div");
    $contentBar.appendChild($documenList);


    const $addRootButton = document.createElement("button");
    $addRootButton.textContent = "루트 문서 추가";


    $container.appendChild($topBar);
    $container.appendChild($contentBar);
    $container.appendChild($addRootButton);


    this.state = initialState;

    this.setState = (nextState) => {
        this.state = nextState;
        this.render();
    }

    const handleDelete = async (documentId) => {
        await deleteDocument(documentId);
        onDelete(documentId);
    }

    const handleCreate = async (documentId) => {
        await createDocument(documentId);
        onChange();
    }

    this.render = () => {
        $documenList.innerHTML = DocumentList(this.state);

        $documenList.querySelectorAll("li").forEach(($li) => {
            $li.addEventListener("click", (e) => {
                const { className } = e.target;
                const id = e.target.closest("li").dataset.documentid;

                switch (className) {
                    case "createButton":
                        handleCreate(id);
                        break;

                    case "deleteButton":
                        handleDelete(id);
                        break;

                    default:
                        onSelect($li.dataset.documentid);
                }
            });
        });
    }

    $addRootButton.addEventListener("click", () => {
        handleCreate(null);
    });

    let pinFlag = false;    
    $container.addEventListener("mouseover", () => {
        $container.style.transform = "translateX(0)";
    });
    $container.addEventListener("mouseleave", () => {
        if (!pinFlag) {
            $container.style.transform = "translateX(-90%)";
        }
    })

    $pin.addEventListener("click", () => {
        if (pinFlag) {
            $container.style.transform = "translateX(-90%)";
            $pin.textContent = ">>";
        }
        else {
            $container.style.transform = "translateX(0)";
            $pin.textContent = "<<";
        }
        pinFlag = !pinFlag;
    })
}
import { setItem, TEMPSAVE_BODY_KEY, TEMPSAVE_ID_KEY, TEMPSAVE_TITLE_KEY } from "../../api/localstorage.js";
import { fetchDocument } from "../util/DocumentRequest.js";

export default function TextEditor({ $target, onChange, signalDelete }) {
    const $container = document.createElement("div");
    $container.className = "textEditor";
    $target.appendChild($container);

    this.state = {
        id: "",
        title: "",
        content: ""
    };

    const $title = document.createElement("input");
    $title.className = "editorTitle"
    $title.setAttribute("disabled", false);
    
    const $body = document.createElement("div");
    $body.className = "editorBody";
    $body.setAttribute("contenteditable", false);

    $container.appendChild($title);
    $container.appendChild($body);
    
    this.render = () => {
        $title.value = this.state.title ?? "";
        $body.textContent = this.state.content ?? "";
        $title.removeAttribute("disabled");
        $body.setAttribute("contenteditable", true);
    }

    this.setState = async ({ currentDocumentId }) => {
        let document = null;

        if (currentDocumentId) {
            document = await fetchDocument(currentDocumentId);
        }

        this.state = document;

        if (document) {
            setItem(TEMPSAVE_ID_KEY, this.state.id);
            setItem(TEMPSAVE_TITLE_KEY, this.state.title);
            setItem(TEMPSAVE_BODY_KEY, this.state.content || ""); // 새로 만든 document에는 content에 null이 있어 기본값으로 문자열로 설정
            this.render();
        }
        else {
            $title.setAttribute("disabled", true);
            $body.removeAttribute("contenteditable");
            $title.value = "";
            $body.textContent = "";
        }
    }

    $title.addEventListener("keyup", (e) => {
        setItem(TEMPSAVE_TITLE_KEY, e.target.value);
        onChange();
    })

    $body.addEventListener("keyup", (e) => {
        setItem(TEMPSAVE_BODY_KEY, e.target.textContent);
        onChange();
    })

}
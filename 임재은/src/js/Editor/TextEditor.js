import { setItem, TEMPSAVE_BODY_KEY, TEMPSAVE_ID_KEY, TEMPSAVE_TITLE_KEY } from "../../api/localstorage.js";
import { fetchDocument } from "../util/DocumentRequest.js";
import TextEditorRenderer from "./TextEditorRender.js";

export default function TextEditor({ $target, onChange }) {
    const $container = document.createElement("div");
    $container.className = "textEditor";
    $target.appendChild($container);

    this.state = {
        id: "",
        title: "",
        content: "",
    };
    
    
    this.setState = async ({ currentDocumentId }) => {
        let document = {
            id: "",
            title: "",
            content: ""
        };

        if (currentDocumentId) {
            document = await fetchDocument(currentDocumentId);
        }

        this.state = {
            id: document.id,
            title: document.title,
            content: document.content || ""
        };

        if (document) {
            setItem(TEMPSAVE_ID_KEY, this.state.id);
            setItem(TEMPSAVE_TITLE_KEY, this.state.title);
            setItem(TEMPSAVE_BODY_KEY, this.state.content || ""); // 새로 만든 document에는 content에 null이 있어 기본값으로 문자열로 설정
        }

        this.render();
    }

    this.render = () => {
        $container.innerHTML = TextEditorRenderer(this.state);

        document.querySelector('.editorTitle').addEventListener("keyup", (e) => {
            setItem(TEMPSAVE_TITLE_KEY, e.target.value);
            onChange();
        })
    
        document.querySelector('.editorBody').addEventListener("keyup", (e) => {
            setItem(TEMPSAVE_BODY_KEY, e.target.textContent);
            onChange();
        })
    }

}
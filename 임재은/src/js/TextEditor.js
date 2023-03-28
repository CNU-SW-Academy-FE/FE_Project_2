import { setItem, TEMPSAVE_BODY_KEY, TEMPSAVE_ID_KEY, TEMPSAVE_TITLE_KEY } from "../api/localstorage.js";

export default function TextEditor({ $target, onChange, signalDelete }) {
    const $page = document.createElement("div");
    $page.style.margin = "0 auto";
    $target.appendChild($page);

    this.state = null; // this.state는 선택된 document object가 될 것임

    const $title = document.createElement("input");
    $title.style.width = "598px";
    $title.style.height = "30px";
    $title.style.display = "block";
    $title.style.fontWeight = "bold";
    $title.style.fontSize = "32px";
    $title.setAttribute("disabled", true);
    
    const $body = document.createElement("textarea");
    $body.style.width = "600px";
    $body.style.height = "600px";
    $body.setAttribute("disabled", true);

    $page.appendChild($title);
    $page.appendChild($body);
    
    this.render = () => {
        $title.value = this.state.title ?? "";
        $body.value = this.state.content ?? "";
        $title.removeAttribute("disabled");
        $body.removeAttribute("disabled");
    }

    this.setState = (newState) => {
        this.state = newState;
        if (newState) {
            setItem(TEMPSAVE_ID_KEY, newState.id);
            setItem(TEMPSAVE_TITLE_KEY, newState.title);
            setItem(TEMPSAVE_BODY_KEY, newState.content || ""); // 새로 만든 document에는 content에 null이 있어 기본값으로 문자열로 설정
            this.render();
        }
    }

    $title.addEventListener("keyup", (e) => {
        setItem(TEMPSAVE_TITLE_KEY, e.target.value);
        onChange();
    })

    $body.addEventListener("keyup", (e) => {
        setItem(TEMPSAVE_BODY_KEY, e.target.value);
        onChange();
    })
    
    this.signalDelete = (documentId) => {
        if (parseInt(documentId) === this.state?.id) {
            this.reset();
        }
    };

    this.reset = () => {
        this.state = null;
        $title.setAttribute("disabled", true);
        $body.setAttribute("disabled", true);
        $title.value = "";
        $body.value = "";
    }
}
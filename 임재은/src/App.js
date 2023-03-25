import { fetchData } from "./api/api.js";
import DocumentList from "./js/document.js";
import TextEditor from "./js/TextEditor.js";

export default function App({
    $target
}) {
    const $page = document.createElement('div');
    $page.style.display = 'flex';
    $page.style.justifyContent = 'space-between';
    $target.appendChild($page);
    const state = {
        documents: [],
    };
    const $document = new DocumentList({ $target: $page, initialState: [] });
    const $textEditor = new TextEditor({ $target: $page, initialState: "" });

    const render = () => {
    }

    const setState = (content) => {
        state = { ...state, content };

        document.setState(state);
    }
    render();

    const fetchTest = async () => {
      const postData = {
        "title": "테스트입니",
        "parent": 171
      }
      fetchData("/documents", {
        method: "POST",
        body: JSON.stringify(postData)
      })
    }
}
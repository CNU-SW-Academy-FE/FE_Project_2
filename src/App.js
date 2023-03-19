import { request } from "./API.js";
import Editor from "./Editor.js";
import PageList from "./PageList.js";

function App({ $target }) {
    const $pageList = new PageList({
        $target,
        onNewPageClick: async (e) => {
            const title = window.prompt("새로 생성할 문서의 제목을 입력하세요");

            if (!title) return;
            const newDocument = await request("", "POST", {
                title,
                parent: null,
            });

            if (!newDocument) return;
            this.setState({
                ...this.state,
                pageList: [...this.state.pageList, newDocument],
            });
        },
        onTitleClick: async (id) => {
            const data = await request(`/${id}`);
            if (!data) return;
            history.pushState(null, null, `${id}`);
            const { title, content } = data;
            this.setState({
                ...this.state,
                title,
                content,
            });
        },
        onItemPlusClick: async (id) => {
            const title = window.prompt("새로 생성할 문서의 제목을 입력하세요");

            if (!title) return;
            const newDocument = await request("", "POST", {
                title,
                parent: id,
            });

            if (!newDocument) return;
            this.setState({
                ...this.state,
                pageList: this.state.pageList.map((item) =>
                    item.id === id ? item.documents.concat(newDocument) : item
                ),
            });
        },
        onItemDeleteClick: async (id) => {
            const answer = confirm("이 문서를 삭제하시겠습니까?");
            if (!answer) return;
            const res = await request(`/${id}`, "DELETE");
            if (!res) return;
            this.setState({
                ...this.state,
                pageList: pageList.filter((item) => item.id !== id),
            });
        },
    });

    const $editor = new Editor({
        $target,
        onChange: async () => {},
    });

    const initialState = {
        pageList: [],
        title: "",
        content: "",
    };

    this.state = initialState;

    this.setState = ({ pageList, title, content }) => {
        this.state = { pageList, title, content };
        $pageList.setState(pageList);
        $editor.setState({ title, content });
    };

    const fetchPageList = async (documentId) => {
        const pageList = await request();
        this.setState({
            ...this.state,
            pageList,
        });
    };

    const route = () => {
        const { pathname } = location;
        switch (pathname) {
            case "/":
                history.pushState(null, null, "documents");
                route();
                break;
            case "/documents":
                this.setState(initialState);
                break;
            case /\/documents[\/\d{1,}]+/:
                const id = pathname.slice(pathname.lastIndexOf("/") + 1);
                console.log(id);
            default:
                const $h1 = document.createElement("h1");
                $h1.textContent = "페이지를 찾을 수 없습니다.";
                $target = $h1;
        }
    };

    fetchPageList();
    route();
}

export default App;

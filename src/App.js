import { request } from "./API.js";
import Editor from "./Editor.js";
import PageList from "./PageList.js";

function App({ $target }) {
    const pageList = new PageList({
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
            history.pushState(null, null, `${location.pathname}/${id}`);
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
            const res = await request(`/documents/${id}`, "DELETE");
            if (!res) return;
            this.setState({
                ...this.state,
                pageList: pageList.filter((item) => item.id !== id),
            });
        },
    });
    const editor = new Editor();
    this.state = {
        pageList: [],
        title: "",
        content: "",
    };

    this.setState = (nextState) => {
        this.state = nextState;
        pageList.setState(nextState.pageList);
    };

    const fetchPageList = async (documentId) => {
        const pageList = await request();
        this.setState({
            ...this.state,
            pageList,
        });
    };

    fetchPageList();
}

export default App;

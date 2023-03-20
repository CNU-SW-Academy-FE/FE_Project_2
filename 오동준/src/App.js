import { request } from "./API.js";
import { debounce } from "./Debounce.js";
import Editor from "./Editor.js";
import PageList from "./PageList.js";

function App({ $target }) {
    const $pageList = new PageList({
        $target,
        onHomeClick: async () => {
            history.pushState(null, null, "/");
            this.route();
        },
        onNewPageClick: async (e) => {
            const title = window.prompt("새로 생성할 문서의 제목을 입력하세요");
            if (!title) {
                alert(`제목은 1글자 이상이어야 합니다.`);
                return;
            }
            const newDocument = await request("", "POST", {
                title,
                parent: null,
            });

            if (!newDocument) return;
            newDocument.documents = [];
            this.setState({
                ...this.state,
                pageList: this.state.pageList.concat(newDocument),
            });
            history.pushState(null, null, `/documents/${newDocument.id}`);
            await this.route();
        },
        onTitleClick: async (id) => {
            const data = await request(`/${id}`);
            history.pushState(null, null, `/documents/${id}`);
            const { title, content, documents } = data;
            this.setState({
                ...this.state,
                curDoc: {
                    id,
                    title,
                    content,
                    subDoc: documents.length ? documents[0] : null,
                },
            });
        },
        onItemPlusClick: async (id) => {
            const title = window.prompt("새로 생성할 문서의 제목을 입력하세요");
            if (!title) {
                alert(`제목은 1글자 이상이어야 합니다.`);
                return;
            }
            const newDocument = await request("", "POST", {
                title,
                parent: id,
            });
            if (!newDocument) return;
            newDocument.documents = [];
            this.setState({
                ...this.state,
                pageList: this.state.pageList.concat(newDocument),
            });
            history.pushState(null, null, `/documents/${newDocument.id}`);
            await this.route();
        },
        onItemDeleteClick: async (documents) => {
            const answer = confirm(
                "이 문서를 삭제하시겠습니까?(하위 문서들도 같이 삭제됩니다)"
            );
            if (!answer) return;
            const removeCascadingDocuments = async (docs) => {
                for (const { id, documents } of docs) {
                    await request(`/${id}`, "DELETE");
                    documents.length &&
                        (await removeCascadingDocuments(documents));
                }
            };
            await removeCascadingDocuments([documents]);
            history.pushState(null, null, "/");
            this.route();
        },
    });

    const $editor = new Editor({
        $target,
        onChange: debounce(async ({ id, title, content, save }) => {
            save.innerHTML = "Saving...";
            await request(`/${id}`, "PUT", { title, content });
            await this.route();
            save.innerHTML = "Saved!";
            setTimeout(() => (save.innerHTML = ""), 2000);
        }, 3000),
        onSubDocClick: async (id) => {
            history.pushState(null, null, `/documents/${id}`);
            this.route();
        },
    });

    const initialState = {
        pageList: [],
        curDoc: {
            id: null,
            title: "",
            content: "",
            subDoc: null,
        },
    };

    this.state = initialState;

    this.setState = (nextState) => {
        this.state = nextState;
        $pageList.setState(nextState.pageList);
        $editor.setState(nextState.curDoc);
    };

    const fetchPageList = async () => {
        const pageList = await request();
        this.setState({
            ...this.state,
            pageList,
        });
    };

    const fetchTitleContent = async (id = "") => {
        if (!id) {
            this.setState({
                ...this.state,
                curDoc: initialState.curDoc,
            });
            return;
        }
        const { title, content, documents } = await request(`/${id}`);
        this.setState({
            ...this.state,
            curDoc: {
                id,
                title,
                content,
                subDoc: documents.length ? documents[0] : null,
            },
        });
    };

    this.route = async () => {
        const { pathname } = location;
        await fetchPageList();
        switch (true) {
            case /^\/$/.test(pathname):
                await fetchTitleContent();
                break;
            case /^\/documents[\/\d{1,}]+$/.test(pathname):
                const id = pathname.match(/\d{1,}/)[0];
                await fetchTitleContent(id);
                break;
            default:
                const $h1 = document.createElement("h1");
                $h1.textContent = "페이지를 찾을 수 없습니다.";
                $target = $h1;
        }
    };
    window.addEventListener("popstate", this.route);
    this.route();
}

export default App;

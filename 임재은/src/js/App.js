import { getItem, TEMPSAVE_BODY_KEY, TEMPSAVE_ID_KEY, TEMPSAVE_TITLE_KEY } from "../api/localstorage.js";
import { fetchDocuments, updateDocument } from "./util/DocumentRequest.js";
import TextEditor from "./Editor/TextEditor.js";
import SideBar from "./SideBar/SideBar.js";
import Router from "./util/Router.js";
// localstorange에는 현재 수정중인 document의 정보를 담고 있음

export default function App({
    $target
}) {
    const $page = document.createElement("div");
    $page.style.display = "flex";
    $target.appendChild($page);

    this.state = {
        documents: [],
        currentDocumentId: null,
    };


    const $sideBar = new SideBar({
      $target: $page,
      initialState: this.state.documents,
      onChange: () => {
        loadDocuments();
      },

      onSelect: async (documentId) => {
        const { id, title, content } = getLocalData();

        await updateDocument(id, title, content, () => {
          localStorage.clear();
          loadDocuments();
        })

        history.pushState(null, null, location.origin + `/documents/${documentId}`);
        this.setState({ currentDocumentId: documentId });
      },

      onDelete: (documentId) => {
        if (documentId === this.state.currentDocumentId) {
          this.setState({ currentDocumentId: null });
          history.pushState(null, null, location.origin);
        }
        loadDocuments();
        localStorage.clear();
      }
    });

    let timer = null;

    const $textEditor = new TextEditor({
      $target: $page,
      onChange: async () => {
        clearTimeout(timer);
        timer = setTimeout(async () => {
          const { id, title, content } = getLocalData();
          await updateDocument( id, title, content, () => {
            loadDocuments();
          })
      }, 1000);
      }
    });


    /** Documents 업데이트 */
    const loadDocuments = async () => {
      const documents = await fetchDocuments();
      this.setState({ documents });
    }

    const getLocalData = () => {
      const id = getItem(TEMPSAVE_ID_KEY);
      const title = getItem(TEMPSAVE_TITLE_KEY);
      const content = getItem(TEMPSAVE_BODY_KEY);
      
      return { id, title, content };
    }


    this.setState = (nextState) => {
      this.state = { ...this.state, ...nextState};

      $sideBar.setState(this.state.documents);
      $textEditor.setState({ currentDocumentId: this.state.currentDocumentId });
    }


    new Router({
      $target,
      onRoute: (id) => {
        this.setState({ currentDocumentId: id });
      }
    })

    loadDocuments();
}

    /** fetchDocument()로 대체 가능 */
    // const findDocumentById = (documentId) => {
    //   const queue = this.state.documents;

    //   while (queue.length > 0) {
    //     const document = queue.shift();
    //     if (document.id == documentId) {
    //       return document;
    //     }
    //     else if (document.documents.length > 0) {
    //       document.documents.forEach((element) => queue.push(element));
    //     }
    //   }
    // }
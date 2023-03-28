import { getItem, TEMPSAVE_BODY_KEY, TEMPSAVE_ID_KEY, TEMPSAVE_TITLE_KEY } from "./api/localstorage.js";
import { request } from "./api/request.js";
import DocumentList from "./js/document.js";
import TextEditor from "./js/TextEditor.js";

// localstorange에는 현재 수정중인 document의 정보를 담고 있음

export default function App({
    $target
}) {
    const $page = document.createElement("div");
    $page.style.display = "flex";
    $target.appendChild($page);

    this.state = {
        documents: [],
    };



    const $document = new DocumentList({
      $target: $page,
      initialState: this.state.documents,
      onChange: () => {
        fetchDocuments();
      },

      onClick: async (documentId) => {
        const { id, title, content } = getLocalData();

        if (id) {
          const jsonData = JSON.stringify({ title, content });
    
          await request(`/documents/${id}`, {
            method: "PUT",
            body: jsonData
          });

          localStorage.clear();
        }
        const document = await fetchDocument(documentId);
        $textEditor.setState(document);
      },

      onDelete: (documentId) => {
        fetchDocuments();
        $textEditor.signalDelete(documentId); // 현재 수정중인 document를 삭제한 경우, editor를 disabled 상태로 전환
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

          if (id) { // localstorage에 존재하지 않을 때 미실행 ex) 수정 중에 삭제 시 onDelete에서 localStorage.clear()를 실행하여 id값을 지움
            const jsonData = JSON.stringify({ title, content });
    
            await request(`/documents/${id}`, {
              method: "PUT",
              body: jsonData
            });

            fetchDocuments();
          }
      }, 1000);
      }
    });


    
    this.setState = (nextState) => {
      this.state = nextState;

      $document.setState(this.state.documents);
    }

    this.render = () => {
      $textEditor.reset();
    }

    this.router = () => {
      const { pathname } = window.location;

      if (pathname === '/') {
        $textEditor.signalDelete();

      } else if (pathname.indexOf('/document/') === 0) {
        const documentId = pathname.split('/')[2];
        const selectedDocument = findDocumentById(documentId);
        console.log(pathname)
        $textEditor.setState(selectedDocument);
      }
    }

    /** Documents 업데이트 */
    const fetchDocuments = async () => {
      const documents = await request("/documents", {
          method: "GET",
      });

      this.setState({
        documents
      });
    }

    const findDocumentById = (documentId) => {
      const queue = this.state.documents;

      while (queue.length > 0) {
        const document = queue.shift();
        if (document.id == documentId) {
          return document;
        }
        else if (document.documents.length > 0) {
          document.documents.forEach((element) => queue.push(element));
        }
      }
    }

    const fetchDocument = async (documentId) => {
      const document = await request(`/documents/${documentId}`, {
        method: "GET",
      });

      return document;
    };

    const getLocalData = () => {
      const id = getItem(TEMPSAVE_ID_KEY);
      const title = getItem(TEMPSAVE_TITLE_KEY);
      const content = getItem(TEMPSAVE_BODY_KEY);
      return { id, title, content };
    }

    fetchDocuments();
}
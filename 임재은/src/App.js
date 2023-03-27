import { request } from "./api/request.js";
import DocumentList from "./js/document.js";
import TextEditor from "./js/TextEditor.js";

export default function App({
    $target
}) {
    const $page = document.createElement('div');
    $page.style.display = 'flex';
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
        const document = await fetchDocument(documentId);
        $textEditor.setState(document);
      },
      onDelete: (documentId) => {
        clearTimeout(timer);
        timer = setTimeout(async () => {
          fetchDocuments();
          $textEditor.signalDelete(documentId);
      }, 1000)
      }
    });

    let timer = null;

    const $textEditor = new TextEditor({
      $target: $page,
      onChange: async ({ id, title, content }) => {
        console.log(id);
        findDocument(id).title = title;
        clearTimeout(timer);
        timer = setTimeout(async () => {
          const postData = JSON.stringify({
            title,
            content
          })
  
          await request(`/documents/${id}`, {
            method: 'PUT',
            body: postData
          });
      }, 1000);
      }
    });
    
    this.setState = (nextState) => {
      this.state = nextState;

      $document.setState(this.state.documents);

    }

    this.render = () => {
      $document.render(state.documents);
    }

    const fetchDocuments = async () => {
      const documents = await request('/documents', {
          method: 'GET',
      });

      this.setState({
        documents
      });
    }

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

    const findDocument = (documentId) => {
      const findRecursive = (documentList) => {
        return documentList.find((document) => {
          if (document.id === documentId) {
            console.log(document.id);
            return true;
          }

          if (document.documents.length > 0) {
            findRecursive(document.documents);
          }
        })
      }

      return findRecursive(this.state.documents);
    }

    const fetchDocument = async (documentId) => {
      const document = await request(`/documents/${documentId}`, {
        method: 'GET',
      });

      return document;
    };

    fetchDocuments();
}
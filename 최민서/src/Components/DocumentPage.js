import DocumentList from "./DocumentList.js"
import { request } from "../api/api.js"
import Header from "./Header.js"

export default function DocumentPage({ $target }) {
    const $documentPage = document.createElement('div')
    $documentPage.className  = "document-page"
    
    new Header ({
        $target : $documentPage,
        initialState : '최민서'
    })
    
    const documentList = new DocumentList({
        $target: $documentPage,
        initialState :[]
    })

    const fetchDocuments = async () => {
        const documents = await request('/')
        documentList.setState(documents)
    }

    this.render = async () => {
        await fetchDocuments()
        $target.prepend($documentPage)
    }
}
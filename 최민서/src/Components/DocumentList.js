import { displayDocumentList } from "../utils/displayList.js"
import { push } from "../utils/router.js"
import { getItem, removeItem, setItem } from "../utils/storage.js"

export default function PostList({ $target, initialState }) {
    const $documentList = document.createElement('div')
    $documentList.className = "document-list"
    $target.appendChild($documentList)
    
    this.state = initialState

    this.setState =  nextState => {
        this.state = nextState
        this.render()
    }

    this.render = () => {
        $documentList.innerHTML = `
            <button name ="add-btn parent-document-add" data-id="null">
                <i class="fas fa-plus"></i>
                페이지 추가
            </button>
            <div class="list-box">
                ${displayDocumentList(this.state)}
            </div>
        `
    }

    $documentList.addEventListener('click', e=> {
        const {target} = e
        const element = target.closest('[name]')

        if (element) {
            const id = element.dataset.id
            const listToggleState = `isOpened-${id}`
            const name = element.getAttribute('name')
            if (target.className === 'toggle-btn') {
                const getToggleState = getItem(listToggleState)
                getToggleState ? removeItem(listToggleState) : setItem(listToggleState, 'block')
                this.render()

                return
            }
            if (name){
                push({
                    type : name,
                    id : id
                })
            }
        }
    })

}
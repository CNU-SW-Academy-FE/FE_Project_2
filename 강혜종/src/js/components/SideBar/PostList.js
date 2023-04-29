import { $creEle } from "../../utils/document.js"
import { ListView } from "./ListView.js"

export default function PostList({ $target, initialState, onClick }) {
    const $postList = $creEle('div')
    $target.appendChild($postList)

    this.state = initialState

    this.setState = nextState => {
        this.state = nextState
        this.render()
    }

    this.render = () => {
        // this.state.map((({ id, title }) => console.log(id, title)))

        $postList.innerHTML = `
            <ul>
                ${ListView(this.state)}
            </ul>
        `
    }

    this.render()

    $postList.addEventListener('click', async (e) => {
        const $li = e.target.closest('li')
        const { id } = $li.dataset
        
        if (e.target.tagName === 'li') {
            onClick(id)
        } else {
            const { id } = $li.dataset
            if (e.target.className === 'addBtn') {
                console.log('new start')
                await request(`/documents`, { 
                    "method": 'POST',
                    "body": JSON.stringify({
                        "title": `새로운 문서 ${id}`,
                        "parent": id
                    })
                })

                console.log('new end', e.target.className)
            } else if (e.target.className === 'delBtn') {
                console.log('delete', id)
                await request(`/documents/${id}`, { 'method': 'DELETE' })
            }
        }
    })
}
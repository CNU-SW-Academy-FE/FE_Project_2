// 사이드바를  담당하는 페이지
import { request } from "../../utils/api.js"
import PostList from "./PostList.js"
import { $creEle } from "../../utils/document.js"

export default function PostsPage({ $target, initialState, onClick }) {
    const $postPage = $creEle('div')
    $postPage.className += ' postList'

    // 처음 페이지 생성 버튼
    const $firstAddButton = $creEle('button')
    $firstAddButton.className += ' addNew addBtn'
    $firstAddButton.innerHTML = '+'

    $postPage.appendChild($firstAddButton)
    $target.appendChild($postPage)

    const postList = new PostList({
        $target: $postPage,
        initialState: [],
        onClick: (id) => {
            this.onClick(id)
        }
    })

    this.state = initialState


    this.setState = nextState => {
        this.state = nextState
        this.render()
    }

    this.render = async () => {
        const postLists = await request('/documents', { method: 'GET' })
        postList.setState(postLists)
    }

    this.render()

    $firstAddButton.addEventListener('click', async (e) => {
        if (this.state.postList.length === 0) {
            await request('/documents', {
                "method": 'POST',
                "body": JSON.stringify({
                    "title": "새로운 문서",
                    "parent": null
                })
            })
        }
    })
}

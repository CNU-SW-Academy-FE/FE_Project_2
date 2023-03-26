// 사이드바를  담당하는 페이지
import { request } from "../../utils/api.js"
import PostList from "./PostList.js"

export default function PostsPage({ $target, initialState }) {
    const $postPage = document.createElement('div')
    $target.appendChild($postPage)

    const postList = new PostList({
        $target: $postPage,
        initialState: [],
    })

    this.state = initialState

    
    this.setState = nextState => {
        this.state = nextState
        this.render()
    }
    
    this.render = async () => {
        const postLists = await request('/documents', { method: 'GET' })
        console.log(postLists)
        postList.setState(postLists)
    }

    this.render()
}

// PageEdit 페이지의 역할은 무엇일까?
// 상황에 맞는 Editor를 출력하고, 데이터를 불러와서 보여주는 역할을 수행?
import { request } from "../../utils/api.js"
import { $creEle } from "../../utils/document.js"
import Editor from "./editor.js"

export default function PostEditPage({ $target, initialState }) {
    const $postEditPage = $creEle('div')
    $postEditPage.className += ' editorDiv'

    $target.appendChild($postEditPage)

    const editor = new Editor({
        $target: $postEditPage,
        initialState: {}
    })

    this.state = initialState

    this.setState = nextState => {
        this.state = nextState
        this.render()
    }
    
    const fetchPost = (posts) => {
        
    }

    this.render = async () => {
        const posts = await request(`/documents/${this.state.currentPost}`, { method: 'GET' })
        editor.setState({
            title: posts.title,
            content: posts.content
        })
    }

    this.render()



    // let postLocalSaveKey = `temp-post-${this.state.postId}`

    // const post = getItem(postLocalSaveKey, {
    //     title: '',
    //     content: ''
    // })

    // let timer = null

    // const editor = new Editor({ 
    //     $target: $page, 
    //     initialState: post,
    //     onEditing: (post) => {
    //         if(timer !== null) {
    //             clearTimeout(timer)
    //         }
    //         timer = setTimeout(async () => {

    //             setItem(postLocalSaveKey, {
    //                 ...post,
    //                 tempSaveDate: new Date()
    //             })
                
    //             const isNew = this.state.postId === 'new'
    //             if (isNew) {
    //                 const createdPost = await request('/posts', {
    //                     method: 'POST',
    //                     body: JSON.stringify(post)
    //                 })
    //                 history.replaceState(null, null, `/posts/${createdPost.id}`)
    //                 removeItem(postLocalSaveKey)

    //                 this.setState({
    //                     postId: createdPost.id
    //                 })
    //             } else {
    //                 await  request(`/posts/${post.id}`, {
    //                     method: 'PUT',
    //                     body: JSON.stringify(post)
    //                 })
    //                 removeItem(postLocalSaveKey)
    //             }
    //         }, 1000)
    //     }
    // })

    // this.setState = async nextState => {
        
    //     if (this.state.postId !== nextState.postId) {
    //         postLocalSaveKey = `temp-post-${nextState.postId}`
    //         this.state = nextState

    //         if (this.state.postId === 'new') {
    //             const post = getItem(postLocalSaveKey, {
    //                 title: '',
    //                 content: ''
    //             })
    //             this.render()
    //             editor.setState(post)
    //         } else {
    //             await fetchPost()
    //         }
    //         return
    //     }
        
    //     this.state = nextState
    //     this.render()

    //     editor.setState(this.state.post || {
    //         title: '',
    //         content: ''
    //     })
    // }

    // this.render = () => {
    //     $target.appendChild($page)
    // }
    
    
    // const fetchPost = async () => {
    //     const { postId } = this.state
    //     if (postId !== 'new') {
    //         const post = await request(`/posts/${postId}`)

    //         const tempPost = getItem(postLocalSaveKey, {
    //             title: '',
    //             content: ''
    //         })
            
    //         if (tempPost.tempSaveDate && tempPost.tempSaveDate > post.updated_at) {
    //             if (confirm('저장되지 않은 임시 데이터가 있습니다. 불러올까요?')) {
    //                 this.setState({
    //                     ...this.state,
    //                     post: tempPost
    //                 })
    //                 return
    //             }
    //         }


    //         this.setState({
    //             ...this.state,
    //             post
    //         })
    //     }
    // }

    // new LinkButton({
    //     $target: $page,
    //     initialState: {
    //         text: '목록으로 이동',
    //         link: '/'
    //     }
    // })
    
}

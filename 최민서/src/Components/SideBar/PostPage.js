import PostList from "./PostList.js"

// 옵셔널 체이닝(?.) : 선택적 체이닝 연산자로, 객체의 속성을 접근하는 경우 사용
export default function PostPage(posts) {
    return `
        <ul>
            ${posts.map(post => `
                <li data-id='${post.id}' name='list'>
                    ${post.title}
                    <button name='button' data-id='${post.id}'>+ Add</button>
                    ${post.documents?.length ? PostPage(post.documents) : ''}
                </li>
            `).join('')}
        </ul>
    `
    const $postPage = document.createElement('div')
    $postPage.className = 'documentDiv'

    const postList = new PostList({ 
        $target: $postPage, 
        initialState: [],
        onAttach: () => {

        },
        onDelete: () => {

        }
    })

    this.setState = async () => {
        const posts = await request('/documents')
        postList.setState(posts)
        this.render()
    }
    this.render = () => {
        $target.appendChild($postPage)
    }
}
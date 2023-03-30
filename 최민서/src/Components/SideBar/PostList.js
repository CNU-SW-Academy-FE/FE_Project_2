import PostPage from "./PostPage.js"

export default function PostList({ $target, initialState }) {
    const $postList = document.createElement('div')
    $postList.className = 'postList'
    $target.appendChild($postList)

    this.state = initialState

    this.setState = nextState => {
        this.state = nextState
        this.render()
    }

    this.render = () => {
        $postList.innerHTML = `
            <button>+ Add</button>
            ${PostPage(this.state)}
        `
    }

    // this.render = () => {
    //     $postList.innerHTML = `
    //         <ul>
    //             ${this.state.map(post => `
    //                 <li class='dataList' data-id='${post.id}'>
    //                     ${post.title}
    //                     <button class='addButton' data-id='${post.id}'>+</button>
    //                     <button class='deleteButton' data-id='${post.id}'>
    //                         <i class='fas ta-trash-alt'></i>
    //                     </button>
    //                 </li>
    //             `).join('')}
    //         </ul>
    //     `
    // }

    this.render()

    $postList.addEventListener('click', e => {
        const { id } = e.target.dataset
        const { className } = e.target
        const $li = e.target.closest('li')

        switch (className) {
            case 'addButton':
                onAttach(id)
                break
            case 'deleteButton':
                onDelete(id)
                break
            case 'dataList':
                if ($li) {
                    const { id } = $li.dataset
                }
        }
    })
}
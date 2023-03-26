

export default function PostList({ $target, initialState }) {
    const $postList = document.createElement('div')
    $target.appendChild($postList)

    this.state = initialState

    // new LinkButton({
    //     $target: $page,
    //     initialState: {
    //         text: 'New Post',
    //         link: '/posts/new'
    //     }
    // })
    
    this.setState = nextState => {
        this.state = nextState
        this.render()
    }
    
    this.render = () => {
        this.state.map((({ id, title }) => console.log(id, title)))
        $postList.innerHTML = `
            <ul>
                ${this.state.map(({ id, title, documents}) => `
                    <li data-id="${id}">
                        id : ${id} | title : ${title} | content : ${documents}
                    </li>
                `).join('')}
            </ul>
        `
    }

    this.render()

    // $postList.addEventListener('click', (e) => {
    //     const $li = e.target.closest('li')

    //     if ($li) {
    //         const { id } = $li.dataset
    //         push(`/posts/${id}`)
    //     }
    // })
}
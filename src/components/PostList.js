import { pushUrl } from '../utils/router.js'

export default function PostList({ $target, initialState, onAdd, onDelete }) {
  const $postListDiv = document.createElement('div')
  $postListDiv.className = 'postListDiv'
  $target.appendChild($postListDiv)

  this.state = initialState

  this.setState = nextState => {
    this.state = nextState
    this.render()
  }

  this.postListTree = data => {
    let tree = ''

    data.forEach(element => {
      if(element.documents.length) {
        tree += `
          <li class="postList" data-id="${element.id}">
            📄${element.title}
            <button class="addBtn" data-id="${element.id}">+</button>
            <button class="deleteBtn" data-id=${element.id}">X</button>
            <ul>${this.postListTree(element.documents)}</ul>
          </li>
        `
      } else {
        tree += `
          <li class="postList" data-id="${element.id}">
            📄${element.title}
            <button class="addBtn" data-id="${element.id}">+</button>
            <button class="deleteBtn" data-id="${element.id}">X</button>
          </li>
        `
      }
    })

    return tree

  }

  this.render = () => {
    $postListDiv.innerHTML = `
      <ul>
        ${this.state.map(post => 
          `
            <li class="postList" data-id="${post.id}">
              📄${post.title}
              <button class="addBtn" data-id="${post.id}">+</button>
              <button class="deleteBtn" data-id="${post.id}">x</button>
            </li>
            ${post.documents ? `<ul>${this.postListTree(post.documents)}</ul>` : ''}
          `
        ).join('')}
      </ul>
    `
  }

  this.render()

  $postListDiv.addEventListener('click', e => {
    const { id } = e.target.dataset
    console.log(id)
    const { className } = e.target
    const $li = e.target.closest('li')

    if(className === 'addBtn') {
      onAdd(id)
    } else if(className === 'deleteBtn'){
      onDelete(id)
    } else {
      if($li) {
        const { id } = $li.dataset
        pushUrl(`/documents/${id}`)
      }
    }
  })
}
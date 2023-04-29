import PostList from './PostList.js'
import { pushUrl } from '../utils/router.js'
import { request } from '../utils/api.js'

export default function PostPage({ $target }) {
  const $page = document.createElement('div')
  $page.className = 'documentDiv';

  const $checkbox = document.createElement('input')
  $checkbox.className = 'checkbox'
  $checkbox.type = 'checkbox'
  
  $page.appendChild($checkbox)

  $checkbox.addEventListener('click', e => {
    if(e.target.checked) {
      document.documentElement.setAttribute('color-theme', 'dark')
    } else {
      document.documentElement.setAttribute('color-theme', 'light')
    }
  })

  const $titleDiv = document.createElement('div')
  $titleDiv.innerHTML = `
    <h2>Notion Cloning</h2>
  `

  $page.appendChild($titleDiv)

  const postList = new PostList({
    $target: $page,
    initialState: [],
    onAdd: async id => {
      await request('/documents', {
        method: 'POST',
        body: JSON.stringify({
          title: 'untitled',
          parent: id,
        }),
      })

      this.setState()
    },
    onDelete: async (id) => {
      await request(`/documents/${id}`, {
        method: 'DELETE',
      })

      pushUrl('/')

      this.setState()
    }
  })

  const $linkButton = document.createElement('button')
  $linkButton.textContent = '+ new page'
  $linkButton.className = 'addNewPageBtn'

  $page.appendChild($linkButton)

  $linkButton.addEventListener('click', () => {
    pushUrl(`/documents/new`)
  })

  this.setState = async () => {
    const posts = await request('/documents')
    postList.setState(posts)
    this.render()
  }

  this.render = async () => {
    $target.appendChild($page)
  }
}
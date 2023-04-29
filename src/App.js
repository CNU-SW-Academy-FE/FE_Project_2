import PostPage from './components/PostPage.js'
import PostEditPage from './components/PostEditPage.js'
import { catchTitle, initRouter, popUrl } from './utils/router.js'

export default function App({ $target }) {
  const $postListContainer = document.createElement('div')
  $postListContainer.className = 'postListContainer'
  
  const $postMainContainer = document.createElement('div')
  $postMainContainer.className = 'postMainContainer'
  
  $target.appendChild($postListContainer)
  $target.appendChild($postMainContainer)

  const postPage = new PostPage({
    $target: $postListContainer,
  })

  const postEditPage = new PostEditPage({
    $target: $postMainContainer,
    initialState: {
      postId: 'new',
      post: {
        title: '',
        content: '',
      },
    },
  })

  this.route = () => {
    const { pathname } = window.location

    if (pathname.indexOf('/documents/') === 0) {
      const [, , postId] = pathname.split('/')
      postEditPage.setState({ postId })
    }

    postPage.setState()
  }

  this.route()

  initRouter(() => this.route())
  popUrl(() => this.route())
  catchTitle(() => postPage.setState())
}

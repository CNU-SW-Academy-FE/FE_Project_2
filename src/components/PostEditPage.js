import { getItem, removeItem, setItem } from '../utils/storage.js'
import { request } from '../utils/api.js'
import Editor from './Editor.js'

export default function PostEditPage({ $target, initialState }) {
  const $page = document.createElement('div')

  this.state = initialState

  let postStorageSaveKey = `temp-post-${this.state.postId}`

  const post = getItem(postStorageSaveKey, {
    title: '',
    content: ''
  })

  let timer = null
  
  const editor = new Editor({
    $target: $page,
    initialState: post,
    onEditing: async post => {
      if(timer !== null) {
        clearTimeout(timer)
      }

      timer = setTimeout(async () => {
        setItem(postStorageSaveKey, {
          ...post,
          saveDate: new Date()
        })

        const isNew = this.state.postId === 'new'

        if(isNew) {
          const newPost = await request('/documents', {
            method: 'POST',
            body: JSON.stringify(post)
          })

          if(post.content) {
            await request(`/documents/${newPost.id}`, {
              method: 'PUT',
              body: JSON.stringify(post),
            })
          }

          history.replaceState(null, null, `/documents/${newPost.id}`)
          removeItem(postStorageSaveKey)

          this.setState({
            postId: newPost.id
          })
        } else{
          await request(`/documents/${post.id}`, {
            method: 'PUT',
            body: JSON.stringify(post),
          })
          removeItem(postStorageSaveKey)
        }
      }, 1000)
    }
  })

  this.setState = async nextState => {
    if(nextState === undefined) {
      return 
    }

    if(this.state.postId !== nextState.postId) {
      this.state = nextState
      postStorageSaveKey = `temp-post-${this.state.postId}`

      if(this.state.postId === 'new'){
        const post = getItem(postStorageSaveKey, {
          title: '',
          content: ''
        })

        editor.setState(post)
        this.render()
      } else {
        await fetchPost()
      }

      return
    }

    const isOverClick = nextState.post === undefined ? true : false

    if (!isOverClick) {
      this.state = nextState
    }

    editor.setState(
      this.state.post || {
        title: '',
        content: '',
      },
    )
    this.render()
  }

  this.render = () => {
    $target.appendChild($page)
  }

  const fetchPost = async () => {
    const { postId } = this.state

    if (postId !== 'new') {
      const post = await request(`/documents/${postId}`)

      const tempPost = getItem(postStorageSaveKey, {
        title: '',
        content: '',
      })

      if (tempPost.saveDate && post.created_at < tempPost.saveDate) {
        if (confirm('저장되지 않은 데이터가 있습니다. 불러올까요?')) {
          this.setState({
            ...this.state,
            post: tempPost,
          })
          return
        }
      }

      this.setState({
        ...this.state,
        post,
      })
    }
  }
}
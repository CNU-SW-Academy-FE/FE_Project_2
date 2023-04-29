import { throwTitle } from '../utils/router.js'

export default function Editor({
  $target,
  initialState = {
    title: '',
    content: '',
  },
  onEditing,
}) {
  const $editor = document.createElement('div');
  $editor.className ='editor'
  $target.appendChild($editor)

  let isInitialized = false

  this.state = initialState

  this.setState = nextState => {
    this.state = nextState
    $editor.querySelector('[id=editorTitle]').value = this.state.title
    $editor.querySelector('[id=editorContent]').value = this.state.content
  }

  this.render = () => {
    if(!isInitialized) {
      $editor.innerHTML = `
        <input type="text" name="title" id="editorTitle" value="${this.state.title}" placeholder="제목을 입력해주세요." autofocus>
        <textarea name="content" id="editorContent" placeholder="내용을 입력해주세요." autofocus>${this.state.content}</textarea>
      `

      isInitialized = true
    }
  }

  this.render()

  $editor.addEventListener('keyup', (e) => {
    const { target } = e
    const { title } = this.state
    const name = target.getAttribute('name')

    if (title !== target.value) {
      throwTitle(target.value)
    }

    const nextState = {
      ...this.state,
      [name]: target.value,
    }

    this.setState(nextState)
    onEditing(this.state)
  })
}  
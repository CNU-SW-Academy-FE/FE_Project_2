export default function Editor({ 
    $target, 
    initialState = {
        title: '',
        content: ''
    },
    onEditing
}) {
    const $editor = document.createElement('div')
    $editor.className = 'editorDiv'
    $target.appendChild($editor)

    this.state = initialState

    this.setState = nextState => {
        this.state = nextState
        $editor.querySelector('[name=title]').value = this.state.title
        $editor.querySelector('[name=content]').value = this.state.content
        this.render()
    }

    this.render = () => {

    }

    this.render()

    
}
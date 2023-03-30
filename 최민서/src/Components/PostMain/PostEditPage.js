export default function PostEditPage({ $target, initialState }) {
    $editPage = document.createElement('div')
    $editPage.className = 'editPage'

    this.state = initialState

    this.setState = nextState => {
        this.state = nextState
        this.render()
    }

    this.render = () => {
        
    }
}
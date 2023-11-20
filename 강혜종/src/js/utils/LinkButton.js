// import { push } from "./router.js"
import { $creEle } from "./document.js"

export default function LinkButton({
    $target,
    initialState
}) {
    this.state = initialState
    const $linkButton = $creEle('button')
    
    $target.appendChild($linkButton)

    this.render = () => {
        $linkButton.textContent = this.state.text
    }

    this.render()

    $linkButton.addEventListener('click', () => {
        // push(this.state.link)
    })
}
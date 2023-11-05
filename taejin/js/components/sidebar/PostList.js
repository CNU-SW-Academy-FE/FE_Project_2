export default function PostList ({ $target }) {
    const $postList = document.createElement("div")

    $target.appendChild($postList)

    this.render = () => {
        $postList.innerHTML = `
            <ul>
                <li>아이템1</li>
                <li>아이템2</li>
            </ul>
        `
    }

    this.render()
}
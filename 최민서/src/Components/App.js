import PostPage from "./SideBar/PostPage";

export default function App({ $target, initialState }) {
    const $listContainer = document.createElement('div')
    $listContainer.className = 'listContainer';

    const $rendingContainer = document.createElement('div')
    $rendingContainer.className = 'rendingContainer';

    $target.appendChild($listContainer)
    $target.appendChild($rendingContainer)

    new PostPage({ $target: $listContainer })
}
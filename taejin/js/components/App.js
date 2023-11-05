import Editor from "./postMain/Editor.js";
import PostPage from "./sidebar/PostPage.js";

export default function App({ $target }) {
    new PostPage({ $target })

    new Editor({ $target })
}
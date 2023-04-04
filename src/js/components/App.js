import { $creEle } from "../utils/document.js";
import PostEditPage from "./PostMain/PostEditPage.js";
import PostPage from "./SideBar/PostPage.js";

export default function App({ $target }) {
  const $listContainer = $creEle("div");
  $listContainer.class = "listContainer";

  const $rendingContainer = $creEle("div");
  $rendingContainer.class = "rendingContainer";

  $target.appendChild($listContainer);
  $target.appendChild($rendingContainer);
  const postPage = new PostPage({
    $target: $listContainer,
  });

  const postEditPage = new PostEditPage({
    $target: $rendingContainer,
    initState: {
      postId: "new",
      post: {
        title: "",
        content: "",
      },
    },
  });

  this.route = () => {
    if (window.location.pathname.indexOf("/documents/") === 0) {
      const [, , postId] = pathname.split("/");
      postEditPage.setState({ postId });
    }
    postPage.setState();
  };
  this.route();
}

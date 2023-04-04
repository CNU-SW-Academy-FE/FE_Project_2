import { request } from "../../utils/api.js";
import { $creEle } from "../../utils/document.js";
import { removeItem, setItem } from "../../utils/Storage.js";
import Editor from "./Editor.js";

export default function PostEditPage({ $target, initState }) {
  const $page = $creEle("div");
  this.state = initState;

  let postLocalSaveKey = `temp-post-${this.state.postId}`;
  let timer = null;

  const editor = new Editor({
    $target: $page,
    initState,
    onEditing: async (post) => {
      if (timer === null) {
        clearTimeout(timer);
      }
      timer = setTimeout(async () => {
        setItem(postLocalSaveKey, {
          ...post,
          tempSaveDate: new Date(),
        });
        const isNew = this.state.postId === "new";

        if (isNew) {
          const createdPost = await request("/documents", {
            method: "POST",
            body: JSON.stringify(post),
          });
          if (post.content) {
            await request(`/documents/${createdPost.id}`);
          }
          history.replaceState(null, null, `/documents/${createdPost.id}`);
          removeItem(postLocalSaveKey);
          this.setState({
            postId: createdPost,
          });
        } else {
          await request(`/documents/${post.id}`, {
            method: "PUT",
            body: JSON.stringify(post),
          });
          removeItem(postLocalSaveKey);
        }
      }, 1000);
    },
  });

  this.setState = async (nextState) => {
    if (nextState === undefined) {
      return;
    }
    this.state = nextState;
    postLocalSaveKey = `temp-post-${this.state.postId}`;
    if (this.state.postId === "new") {
      const post = getItem(postLocalSaveKey, {
        title: "",
        content: "",
      });
      this.render();
      editor.setState(post);
    } else {
      fetchPost();
    }
    this.render();
    editor.setState(
      this.state.post || {
        title: "",
        content: "",
      }
    );
  };
  const fetchPost = () => {};
  this.render = () => {
    $target.appendChild($page);
  };
}

import { $creEle } from "../../utils/document.js";
import PostList from "./PostList.js";
import { request } from "../../utils/api.js";
import { pushUrl } from "../../utils/Router.js";

export default function PostPage({ $target }) {
  const $page = $creEle("div");
  $page.className = "documentDiv";

  const $userInfo = $creEle("div");
  $userInfo.innerHTML = `
        <h2>박경섭의 노션 만들기</h2>
        <p>노션만들기 페이지 입니다.</p>    
    `;
  $page.appendChild($userInfo);

  const postList = new PostList({
    $target: $page,
    initState: [],
    onAttach: async (id) => {
      await request("/documents", {
        method: "POST",
        body: JSON.stringify({
          title: "제목없음",
          parent: id,
        }),
      });
      this.setState();
    },

    onDelete: async (id) => {
      await request(`/documents/${id}`, {
        method: "DELETE",
      });
      pushUrl("/");
      this.setState();
    },
  });

  this.setState = async () => {
    const posts = await request("/documents");
    postList.setState(posts);
    this.render();
  };
  this.render = () => {
    $target.appendChild($page);
  };
}

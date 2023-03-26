import { request } from "../utils/api.js"
import { $creEle } from "../utils/document.js"
import PostEditPage from "./PostMain/PostEditPage.js"
import PostsPage from "./SideBar/PostPage.js"

export default function App({ $target }) {

  const postPage = new PostsPage({
    $target,
    initialState: {
      postList: []
    }
  })

  const postEditPage = new PostEditPage({
    $target,
    initialState: {
      post: []
    }
  })

  







  // 새 문서 하는 법
  // const json = async () => await request('/documents', {
  //   method: 'POST',
  //   body: JSON.stringify({
  //     "title": "첫번째 문서",
  //     "parent": null
  //   })
  // })

  // const {id, title, createdAt, updatedAt } = json()
  // console.log(id, title, createdAt, updatedAt)
  // $temp.innerHTML = `<li>${id} | ${title} | ${createdAt} | ${updatedAt}</li>`

}
import { $creEle } from "../utils/document.js"
import PostEditPage from "./PostMain/PostEditPage.js"
import PostsPage from "./SideBar/PostPage.js"

export default function App({ $target }) {

  this.state = {
    name: 'khj',
    currentPost: '182'
  }

  const postPage = new PostsPage({
    $target,
    initialState: {
      postList: []
    },
    onClick: (id) => {
      this.setState({
        ...this.state,
        currentPost: id
      })
    }
  })

  const postEditPage = new PostEditPage({
    $target,
    initialState: {
      currentPost: this.state.currentPost,
      post: []
    }
  })

  this.setState = nextState => {
    this.state = nextState
    postEditPage.setState({
      currentPost: this.state.currentPost,
      post: [] // web storage에 있으면 불러오기
    })
  }


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
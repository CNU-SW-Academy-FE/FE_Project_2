import { $creEle } from "../../utils/document.js";

export default function Editor({
  $target,
  initState = { title: "", content: "" },
  onEditing,
}) {
  const $editor = $creEle("div");
  $editor.className = "editorDiv";
  $target.appendChild($editor);
  let isInit = false;
  this.state = initState;
  this.setState = (nextState) => {
    this.state = nextState;
    $editor.querySelector("[name=title]").value = this.state.title;
    $editor.querySelector("[name=content]").value = this.state.content;
    this.render();
  };
  this.render = () => {
    if (!isInit) {
      $editor.innerHTML = `
        <input type='text' name = 'title' class = 'editorClass' value ='${this.state.title}' placeholder = '제목을 입력하세요'/>
        <textarea name = 'content' class = 'editorContent' placeholder = '내용을 입력하세요'>${this.state.content}</textarea>
    `;
    }
    isInit = true;
  };

  this.render();

  $editor.addEventListener("keyup", (e) => {
    const name = e.target.getAttribute("name");

    if (this.setState.title !== e.target.value) {
      console.log("제목이 다름");
    }

    const nextState = {
      ...this.setState,
      [name]: e.target.value,
    };
    this.setState(nextState);
    onEditing(this.state);
  });
}

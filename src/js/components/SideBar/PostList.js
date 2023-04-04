import { $creEle } from "../../utils/document.js";
import { pushUrl } from "../../utils/Router.js";
export default function PostList({ $target, initState, onAttach, onDelete }) {
  const $postList = $creEle("div");
  $postList.className = "postList";
  $target.appendChild($postList);

  this.state = initState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.createTreeView = (data) => {
    let str = "";
    for (const key in data) {
      if (data[key].documents.length) {
        str += `<li class ='dataList' data-id="${data[key].id}">${
          data[key].title
        }
                            <button class = "addBtn" data-id="${
                              data[key].id
                            }">+</button>
                            <button class = "delBtn" data-id="${
                              data[key].id
                            }">-</button>
                            <ul>${this.createTreeView(data[key].documents)}</ul>
                
                        </li>`;
      } else {
        str += `<li class ='dataList' data-id="${data[key].id}">
                            ${data[key].title}
                            <button class = "addBtn" data-id="${data[key].id}">+</button>
                            <button class = "delBtn" data-id="${data[key].id}">-</button>
                        
                
                        </li>`;
      }
    }
    return str;
  };
  this.render = () => {
    $postList.innerHTML = `
            <ul>
                ${this.state
                  .map(
                    (post) => `
                    <li class = "dataList" data-id="${post.id}">
                        ${post.title}
                        <button class = "addBtn" data-id="${post.id}">+</button>
                        <button class = "delBtn" data-id="${post.id}">X</button>
                    </li>
                    ${
                      post.documents
                        ? `<ul>${this.createTreeView(post.documents)}</ul>`
                        : ""
                    }
                    `
                  )
                  .join("")}
            </ul>
        
        `;
  };
  this.render();
  $postList.addEventListener("click", (e) => {
    const { id } = e.target.dataset;
    const { className } = e.target;

    const $li = e.target.closest("li");

    switch (className) {
      case "addBtn":
        onAttach(id);
        break;
      case "delBtn":
        onDelete(id);
        break;
      case "dataList":
        if ($li) {
          const { id } = $li.dataset;
          pushUrl(`/documents/${id}`);
        }
        break;
    }
  });
}

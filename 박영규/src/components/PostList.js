import { displayList } from "./displayList.js";

export default function PostList ({ $target, initialState }) {
    const $postList = document.createElement('div');
    $target.appendChild($postList);

    this.state = initialState;

    this.setState = nextState => {
        this.state = nextState;
        this.render();
    };

    this.render = () => {
        $postList.innerHTML = `
            <Button>+Add</Button>
            ${displayList(this.state)}
        `
    };

    this.render();
}
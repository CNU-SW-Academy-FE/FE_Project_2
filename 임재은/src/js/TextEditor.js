export default function TextEditor({ $target, initialState = "" }) {
    const $page = document.createElement('div');
    $target.appendChild($page);

    const $title = document.createElement('input');
    $title.style.width = '598px';
    $title.style.height = '30px';
    $title.style.display = 'block';
    
    const $body = document.createElement('textarea');
    $body.style.width = '600px';
    $body.style.height = '600px';

    $page.appendChild($title);
    $page.appendChild($body);
    const state = initialState;
    
    this.render = () => {
        $page.textContent = "";
    }
}
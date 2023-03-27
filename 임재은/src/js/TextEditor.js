export default function TextEditor({ $target, onChange, signalDelete }) {
    const $page = document.createElement('div');
    $page.style.margin = "0 auto";
    $target.appendChild($page);

    this.state = null;

    const $title = document.createElement('input');
    $title.style.width = '598px';
    $title.style.height = '30px';
    $title.style.display = 'block';
    $title.style.fontWeight = 'bold';
    $title.style.fontSize = '32px';
    $title.setAttribute('disabled', true);
    
    const $body = document.createElement('textarea');
    $body.style.width = '600px';
    $body.style.height = '600px';
    $body.setAttribute('disabled', true);

    $page.appendChild($title);
    $page.appendChild($body);
    
    this.render = () => {
        $title.value = this.state.title;
        $body.value = this.state.content;
        $title.removeAttribute('disabled');
        $body.removeAttribute('disabled');
    }

    this.setState = (newState) => {
        this.state = newState;
        this.render();
    }

    let timer = null;

    $title.addEventListener('keyup', (e) => {
        handleChange();
    })

    $body.addEventListener('keyup', (e) => {
        handleChange();
    })
    
    this.signalDelete = (documentId) => {
        if (parseInt(documentId) === this.state?.id) {
            clearTimeout(timer);
            $title.setAttribute('disabled', true);
            $body.setAttribute('disabled', true);
            $title.value = "";
            $body.value = "";
        }
    };

    const handleChange = async () => {
        clearTimeout(timer);
        timer = setTimeout(async () => {
            this.state.title = $title.value;
            this.state.content = $body.value;
            onChange(this.state);
        }, 1000)
    }
}
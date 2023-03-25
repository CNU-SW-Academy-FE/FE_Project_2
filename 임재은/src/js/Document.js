import { fetchData } from "../api/api.js";

export default function DocumentList({
    $target,
    initialState
}) {
    const $page = document.createElement('div');
    $page.style.display = 'inline-block';
    $page.style.border = '1px solid black';
    $page.style.padding = '0px 12px';
    const $ul = document.createElement('ul');
    $page.appendChild($ul);
    $target.appendChild($page);

    const $addRootButton = document.createElement('button');
    $addRootButton.textContent = '루트 문서 추가';
    $addRootButton.style.position = 'relative';
    $addRootButton.style.top = '0px';
    $page.appendChild($addRootButton);

    this.state = initialState;
    this.setState = (newState) => {
        this.state = newState;
    }

    const fetchDocument = async () => {
        const data = await fetchData('/documents', {
            method: 'GET',
        });

        console.log(data);
        this.setState(data);
        this.render();
    }

    const deleteDocument = async ( documentId ) => {
        await fetchData(`/documents/${documentId}`, {
            method: 'DELETE'
        });
    }

    this.render = () => {
        const recursiveDocument = (docs) => {
            const $ul = document.createElement('ul');
            $ul.innerHTML = `
                ${docs.map(({ id, title, documents }) => `
                    <li data-documentid="${id}"><span>${title}</span><button class="addDocument">+</button><button class="deleteButton">-</button></li>
                    ${documents.length > 0 ? recursiveDocument(documents) : ""}`
                ).join('')}
            `;
            return $ul.outerHTML;
        };
        
        $ul.innerHTML = `
            ${this.state.map(({ id, title, documents }) => `
                <li data-documentid="${id}"><span>${title}</span><button class="addDocument">+</button><button class="deleteButton">-</button></li>
                ${documents.length > 0 ? recursiveDocument(documents) : ""}`
            ).join('')}
        `;


        document.querySelectorAll('.deleteButton').forEach((button) => button.addEventListener('click', async (e) => {
            const $li = e.target.closest('li');
            await deleteDocument($li.dataset.documentid);
            this.render();
        }))
    }


    const setState = (newState) => {
        state = { ...state, newState };
    }

    fetchDocument();
}
export function ListView (posts) {
    return `
        <ul>
            ${posts.map(post => `
                <li data-id="${post.id}">
                    ${post.id}
                    <button class="addBtn addNew">+</button>
                    <button class="delBtn addNew">x</button>
                    ${post.documents?.length > 0 ? ListView(post.documents) : ''}
                </li>
            `).join('')}
        </ul>
    `
}
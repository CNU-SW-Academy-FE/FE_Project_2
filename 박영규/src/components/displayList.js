export function displayList (posts) {
    return `
        <ul>
            ${posts.map (post => 
                `<li data-id="${post.id}" name="list">
                    ${post.title}
                    <button name="button" data-id="${post.id}">+ADD</button>
                    ${post.documents?.length ? displayList(post.documents) : ''}
                </li>`
                )}
        </ul>
    `
}
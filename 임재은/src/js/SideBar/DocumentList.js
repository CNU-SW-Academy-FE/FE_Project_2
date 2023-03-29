export default function DocumentList(
    documents
) {
   return (
    `
        <ul>
            ${documents.map(({ id, title, documents }) => `
                <li data-documentid="${id}"><span>${title}</span><button class="createButton">+</button><button class="deleteButton">-</button></li>
                ${documents.length > 0 ? DocumentList(documents) : ""}
            `).join("")}
        </ul>
    `
   );
}
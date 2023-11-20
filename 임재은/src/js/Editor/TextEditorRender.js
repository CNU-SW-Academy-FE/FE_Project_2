export default function TextEditorRenderer({
    id,
    title = "",
    content = "",
}) {

    return `
        <div class="textEditor">
            <input class="editorTitle" type="text" value="${title}" ${!id && 'disabled'} />
            <div class="editorBody" contenteditable=${id ? true : false}>${content}</div>
        </div>
    `;
}
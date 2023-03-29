import { request } from "../../api/request.js";

export const fetchDocuments = async () => {
    const documents = await request("/documents", {
        method: "GET",
    });

    return documents;
}

      
export const fetchDocument = async (documentId) => {
    const document = await request(`/documents/${documentId}`, {
      method: "GET",
    });

    return document;
};

export const updateDocument = async (id, title, content, fn) => {
    if (id) {
        const jsonData = JSON.stringify({ title, content });
    
        await request(`/documents/${id}`, {
            method: "PUT",
            body: jsonData
        });

        fn && fn();
    }
}

export const deleteDocument = async (documentId) => {
    await request(`/documents/${documentId}`, {
        method: "DELETE"
    });
}

export const createDocument = async (documentId) => {
    await request("/documents", {
        method: "POST",
        body: JSON.stringify({
            title: "untitled",
            parent: documentId
        })
    })
}
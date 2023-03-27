export const API_END_POINT = "https://cnu1.notion.edu-api.programmers.co.kr/documents"

export const request = async (url = "", method = "GET", body) => {
    try {
        const res = await fetch(`${ENDPOINT}${url}`, {
            method,
            headers: {
                "Content-type": "application/json",
                "x-username": "Bzeromo",
            },
            body: JSON.stringify(body),
        });
        if (!res.ok) {
            throw new Error("API 호출 오류");
        }
        return await res.json();
    } catch (error) {
        alert(error.message);
    }
};
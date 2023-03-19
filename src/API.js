const ENDPOINT = "https://cnu1.notion.edu-api.programmers.co.kr/documents";

export const request = async (url = "", options = {}) => {
    try {
        const res = await fetch(`${ENDPOINT}${url}`, options);
        if (!res.ok) {
            throw new Error("API 호출 오류");
        }
        return await res.json();
    } catch (error) {
        console.log(error.message);
    }
};

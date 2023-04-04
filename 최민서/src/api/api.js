export const API_END_POINT = "https://cnu1.notion.edu-api.programmers.co.kr/documents";

export const request = async (url, options = {}) => {
  try {
    const res = await fetch(`${API_END_POINT}${url}`, {
      ...options,
      headers: {
        "x-username": "minseo",
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      return await res.json();
    }
    console.log(res);

    throw new Error("!!!API ERROR!!!");
  } catch (e) {
    alert(e.message);
  }
};

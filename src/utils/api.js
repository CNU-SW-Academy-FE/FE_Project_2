export const API_END_POINT = 'https://cnu1.notion.edu-api.programmers.co.kr';

export const request = async (url, options = {}) => {
  try {
    const res = await fetch(`${API_END_POINT}${url}`, {
      ...options,
      headers: {
        'x-username': 'test',
        'Content-Type': 'application/json',
      },
    });

    if (res.ok) {
      return await res.json();
    }

    throw new Error('API 호출 오류');
  } catch (e) {
    alert(e.message);
  }
}
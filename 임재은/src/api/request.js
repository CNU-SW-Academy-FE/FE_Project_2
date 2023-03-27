const API_ENDPOINT = 'https://cnu1.notion.edu-api.programmers.co.kr';
const X_USERNAME = 'JEL666';

export async function request(path, options = {}) {
    options = {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            'x-username': X_USERNAME
        }
    }
    try {
        const res = await fetch(`${API_ENDPOINT}${path}`, options);

        if (res.ok) {
            return await res.json();
        }

        throw new Error(`fetch Error path=${API_ENDPOINT}${path}, res=${res.data}`);
        
    } catch (e) {
        console.warn(e);
        return;
    }
}
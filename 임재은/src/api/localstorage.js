
export const TEMPSAVE_ID_KEY = "NOTIONCLONING_ID";
export const TEMPSAVE_TITLE_KEY = "NOTIONCLONING_TITLE";
export const TEMPSAVE_BODY_KEY = "NOTIONCLONING_BODY";

export const setItem = (key, value) => {
    localStorage.setItem(key, value);
}

export const getItem = (key) => {
    return localStorage.getItem(key);
}

export const removeItem = (key) => {
    localStorage.removeItem(key);
}

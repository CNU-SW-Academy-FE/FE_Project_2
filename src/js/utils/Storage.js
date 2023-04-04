const storage = window.localStorage;

export const getItem = (key, defaultVlaue) => {
  const storageValue = storage.getItem(key);
  return storageValue ? JSON.parse(storageValue) : defaultVlaue;
};

export const setItem = (key, value) => {
  storage.setItem(key, JSON.stringify(value));
};

export const removeItem = (key) => {
  storage.removeItem(key);
};

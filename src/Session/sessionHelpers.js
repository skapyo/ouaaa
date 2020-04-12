import config from './../config.json';

export const removeItemsFromLS = () => {
    localStorage.removeItem(config.SESSION_STORAGE.AUTH_TOKEN);
    localStorage.removeItem(config.SESSION_STORAGE.REFRESH_TOKEN);
    localStorage.removeItem(config.SESSION_STORAGE.SUB);
    localStorage.removeItem(config.SESSION_STORAGE.ROLE);
    localStorage.removeItem(config.SESSION_STORAGE.PERSISTENT_CO);
};
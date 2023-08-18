const API_BASE_URL = "http://localhost:4000";

export const getPostEmail = (email) => `${API_BASE_URL}/email/${email}`;
export const getPostMenus = (menu) => `${API_BASE_URL}/menus/${menu}`;
export const deletePostKey = (key) => `${API_BASE_URL}/delete-key/email/${key}`;
export const getPostRecord = (key) => `${API_BASE_URL}/record/${key}`;
export const getPostComments = () => `${API_BASE_URL}/comments`;
export const createNewPostDelivery = () => `${API_BASE_URL}/detailBuyDelivery`;
export const createNewPostRestaurant = () => `${API_BASE_URL}/detailPurchaseRestaurant`;
export const createNewPostComments = () => `${API_BASE_URL}/addComments`;
export const createNewPostLogin = () => `${API_BASE_URL}/login`;
export const getUserFromLocalStorage = () => JSON.parse(sessionStorage.getItem("user_logged"));
export const getAllMenu = () => `${API_BASE_URL}/menu`;
export const getProductsStorage = () => JSON.parse(sessionStorage.getItem("add_products"));
export const getDeleteProductsStorage = () => sessionStorage.removeItem("add_products");

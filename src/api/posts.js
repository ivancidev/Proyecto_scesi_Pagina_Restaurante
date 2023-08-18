
const API_BASE_URL = "http://localhost:4000";

export const getPostEmail = (email) => {
    return `${API_BASE_URL}/email/${email}`
};

export const getPostMenus = (menu) => {
  return `${API_BASE_URL}/menus/${menu}`;
};

export const deletePostKey = (key) => {
  return `${API_BASE_URL}/delete-key/email/${key}`;
};

export const getPostComments = () => {
  return `${API_BASE_URL}/comments`;
};

export const createNewPostDelivery = () => {
  return `${API_BASE_URL}/detailBuyDelivery`;
};

export const createNewPostRestaurant = () => {
  return `${API_BASE_URL}/detailPurchaseRestaurant`;
};

export const createNewPostComments = () => {
  return `${API_BASE_URL}/addComments`;
};

export const createNewPostLogin = () => {
  return `${API_BASE_URL}/login`;
};

export const getUserFromLocalStorage = () => {
  return JSON.parse(sessionStorage.getItem("user_logged"));
}


export const getAllMenu = () =>{
  return `${API_BASE_URL}/menu`;
}

export const getProductsStorage = () => {
  return JSON.parse(sessionStorage.getItem("add_products"));
}

export const getDeleteProductsStorage = () => {
  sessionStorage.removeItem("add_products");
}





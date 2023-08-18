
const API_BASE_URL = "http://localhost:4000";

export const getPostEmail = (email) => {
    return `${API_BASE_URL}/email/${email}`
};

export const getPostMenuFried = (menu) => {
  return `${API_BASE_URL}/menus/${menu}`;
};

export const createNewPostLogin = () => {
  return `${API_BASE_URL}/login`;
};

export const getUserFromLocalStorage = () => {
  return JSON.parse(sessionStorage.getItem("user_logged"));
}




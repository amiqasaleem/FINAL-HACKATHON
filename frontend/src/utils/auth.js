export const isLoggedIn = () => {
    return !!localStorage.getItem("token");
  };
  
  export const getToken = () => {
    return localStorage.getItem("token");
  };
// authUtils.js
import { jwtDecode } from 'jwt-decode';

export const getCookie = (name) => {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

export const setCookie = (name, value, days) => {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/; Secure; SameSite=None";
};

export const deleteCookie = (name) => {
  switch (name) {
    case "user":
      document.cookie = "dgf-user-token=; Max-Age=0; path=/; Secure; SameSite=None";
      document.cookie = "dgf-user-details=; Max-Age=0; path=/; Secure; SameSite=None";
      break;
    case "farmer":
      document.cookie = "dgf-farmer-token=; Max-Age=0; path=/; Secure; SameSite=None";
      document.cookie = "dgf-farmer-details=; Max-Age=0; path=/; Secure; SameSite=None";
      break;
    case "admin":
      document.cookie = "dgf-admin-token=; Max-Age=0; path=/; Secure; SameSite=None";
      document.cookie = "dgf-admin-details=; Max-Age=0; path=/; Secure; SameSite=None";
      break;
  }
};


// Updated function to check if the user is authenticated
export const isUserAuthenticated = () => {
  const token = getCookie('dgf-user-token');
  const userDetails = getCookie('dgf-user-details');

  if (token && userDetails) {
    try {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp * 1000 > Date.now()) {
        return true;
      }
    } catch (error) {
      console.error("Failed to decode user token:", error);
    }
  }
  return false;
};

// Updated function to check if the admin is authenticated
export const isFarmerAuthenticated = () => {
  const token = getCookie('dgf-farmer-token');
  const farmerDetails = getCookie('dgf-farmer-details');

  if (token && farmerDetails) {
    try {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp * 1000 > Date.now()) {
        return true;
      }
    } catch (error) {
      console.error("Failed to decode farmer token:", error);
    }
  }
  return false;
};

// Updated function to check if the admin is authenticated
export const isAdminAuthenticated = () => {
  const token = getCookie('dgf-admin-token');
  const adminDetails = getCookie('dgf-admin-details');

  if (token && adminDetails) {
    try {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp * 1000 > Date.now()) {
        return true;
      }
    } catch (error) {
      console.error("Failed to decode admin token:", error);
    }
  }
  return false;
};


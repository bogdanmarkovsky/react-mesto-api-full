import { apiUtils } from "./utils";

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`${res.status}`);
  }
}

export const register = (email, password) => {
  return fetch(`${apiUtils.serverUrl}/signup`, {
    method: "POST",
    headers: apiUtils.headers,
    body: JSON.stringify({ password, email }),
  })
    .then((res) => checkResponse(res))
};

export const login = (email, password) => {
  return fetch(`${apiUtils.serverUrl}/signin`, {
    method: "POST",
    headers: apiUtils.headers,
    credentials: "include",
    body: JSON.stringify({ password, email }),
  })
    .then((res) => checkResponse(res))
};

export const logout = () => {
  return fetch(`${apiUtils.serverUrl}/signout`, {
    method: "DELETE",
    headers: apiUtils.headers,
    credentials: "include"
  })
    .then((res) => checkResponse(res))
};

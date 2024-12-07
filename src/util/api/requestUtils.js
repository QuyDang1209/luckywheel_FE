import axios from "axios";

export const mainUrl = "http://localhost:8085";

axios.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error)
);

export function callApi(url, method, data = {}) {
  const token = localStorage.getItem("token") || "";
  console.log("Token:", token);
  return axios({
    method,
    url: url || `${mainUrl}`,
    data,
    headers: token ? {
      Authorization:  `Bearer ${token}`,
    } : {}
  }).catch((e) => {
    console.log("error", e);
  if (e.response && (e.response.status === 401 || e.response.status === 403)) {
    localStorage.setItem("token", "");
    alert("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
    if (token) {
      return window.location.reload();
    }
  }
  return Promise.reject(e);
  });
}

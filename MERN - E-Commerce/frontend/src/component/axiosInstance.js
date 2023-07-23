// axiosInstance.js

import axios from "axios";

const instance = axios.create({
  baseURL: "https://mkcommerce.onrender.com/api/v1", // Replace "abc" with your Render subdomain
  // Other configurations...
});

export default instance;

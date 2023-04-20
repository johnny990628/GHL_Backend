const axios = require("axios");
const instance = axios.create({
  baseURL: process.env.WORKLIST_API_URL,
  headers: {
    Accept: "application/dicom+json",
    "Content-Type": "application/dicom+json",
  },
  withCredentials: true,
});

instance.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    if (error.response) {
      switch (error.response.status) {
        case 403:
          return Promise.reject(error);

        default:
          return Promise.reject(error);
      }
    }
  }
);

module.exports = { instance };

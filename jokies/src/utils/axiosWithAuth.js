import axios from "axios";

export const axiosWithAuth = () => {
  const token = localStorage.getItem("token");

  return axios.create({
    baseURL: "http://localhost:3300",
    headers: {
      Authorization: "bearer " + token,
    },
  });
};

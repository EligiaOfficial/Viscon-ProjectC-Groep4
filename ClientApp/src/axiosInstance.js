import axios from "axios";

export const axiosInstance = () => {
  return axios.create({
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
};

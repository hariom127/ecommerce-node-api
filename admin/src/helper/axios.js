import axios from "axios";
import { api } from "./urlConfig";

// create Intance of axios
const axiosInc = axios.create({
  baseURL: api,
});

export default axiosInc;

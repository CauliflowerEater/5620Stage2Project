import axios from "axios";

export default axios.create({
  //在这里填入API的根目录
  baseURL: "http://localhost:5000/api/",
  params: {},
});

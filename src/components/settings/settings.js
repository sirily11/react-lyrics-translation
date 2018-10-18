import { func } from "prop-types";

let settings = {
  getURL: path => {
    let baseURL = "https://api.mytranshelper.com/api/";
    let testURL = "http://127.0.0.1:8000/";
    return testURL + path;
  }
};

export default settings;

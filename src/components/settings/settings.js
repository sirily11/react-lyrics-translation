let settings = {
  getURL: path => {
    let baseURL = "https://api.mytranshelper.com/api/";
    let testURL = `http://${window.location.hostname}/api_translator/`;
    return testURL + path;
  }
};

export default settings;

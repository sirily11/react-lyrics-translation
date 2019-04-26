let settings = {
  getURL: path => {
    let production = `https://sirileepage.com/api_translator/`;
    let test = `https://0.0.0.0:80/api_translator/`;
    return production + path;
  }
};

export default settings;

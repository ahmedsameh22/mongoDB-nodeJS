const https = require("https");

const apiUrl = "https://jsonplaceholder.typicode.com/users";
const getData = (apiUrl, cb) => {
  const req = https.request(apiUrl, (res) => {
    let result = "";
    res.on("data", (data) => {
      result += data.toString();
    });
    res.on("end", () => {
      cb(JSON.parse(result), false);
    });
  });
  req.on("error", (err) => {
    cb(false, err);
  });
  req.end();
};
getData(apiUrl);

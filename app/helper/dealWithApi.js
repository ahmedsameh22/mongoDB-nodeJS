const https = require("https");
const getData = (apiUrl, cb) => {
  const req = https.request(apiUrl, (res) => {
    let resualt = "";
    res.on("data", (data) => {
      resualt += data.toString();
    });
    res.on("end", () => {
      cb(JSON.parse(resualt), false);
    });
  });
  req.on("error", (e) => {
    cb(false, e);
  });
  req.end();
};
module.exports = { getData };

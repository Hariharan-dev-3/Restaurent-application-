const http = require("http");
const controllers = require("./controllers");
const protocol = "http://";
let host = "localhost";
let baseUrl = "";
const server = http.createServer((req, res) => {
  //host = req.headers.host;
  if (req.url === "/api/v1/navbar") {
    controllers.renderNavs(res);
  } else if (req.url === "/api/v1/menuitems") {
    controllers.renderMenuitems(res);
    // } else if (req.url.startswith("/Images/")) {
    //   controllers.loadImage(req, res);
  } else {
    controllers.renderError(res);
  }
});
const port = 5000;
server.listen(port, () => {
  console.log(`server is running at ${protocol}${host}:${port}`);
});

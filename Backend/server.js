const http = require("http");
const controllers = require("./controllers");
const backendData = require("./dataModels/backendData");
// const frontendData = require("./dataModels/frontendData");
const protocol = "http://";
let host = "localhost";
let baseUrl = "";
const server = http.createServer(async (req, res) => {
  //host = req.headers.host;
  if (req.url === "/api/v1/navbar") {
    res.writeHead(200, {
      "Content-Type": backendData.contentType.APPJSON,
      "Access-Control-Allow-Origin": "*",
    });
    const response = await controllers.renderNavs();
    console.log(response);
    res.end(JSON.stringify(response));
  } else if (req.url === "/api/v1/menuitems") {
    controllers.renderMenuitems(res);
  } else if (req.url.startsWith("/Images/")) {
    controllers.loadImage(req, res);
  } else {
    controllers.renderError(res);
  }
});
const port = 5000;
server.listen(port, () => {
  console.log(`server is running at ${protocol}${host}:${port}`);
});

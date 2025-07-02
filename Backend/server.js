const backendData = require("./dataModels/backendData");
const frontendData = require("./dataModels/frontendData");
const http = require("http");
const protocol = "http://";
let host = "localhost";
let baseUrl = "";
const server = http.createServer((req, res) => {
  //host = req.headers.host;
  res.writeHead(200, { "Content-Type": backendData.contentType.TEXTPLAIN });
  res.end(JSON.stringify(frontendData.navBar));
});
const port = 5000;
server.listen(port, () => {
  console.log(`server is running at ${protocol}${host}:${port}`);
});

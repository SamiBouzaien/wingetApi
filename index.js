const Express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const servicewinget = require("./services/service-winget");
const config = require("config");
// Get server configurations
const port = config.get("server.port");
const host = config.get("server.host");
// Initiate Express
const app = Express();
app.use(Express.urlencoded({ extended: true }));
app.use(Express.json());
// Configure API endpoints
app.post("/winget/install", (req, res) => {
  var appname = req.body.applicationname;
  var computername = req.body.computername;
  var isvalid = servicewinget.install(appname, computername);
  console.log("isvalid => " + isvalid);
  var message = "";
  if (isvalid) {
    message =
      "l'application " +
      appname +
      " a été installée sur le poste " +
      computername +
      " avec succes";
  } else {
    message =
      "Echec d'installation de l'application " +
      appname +
      "  sur le poste " +
      computername;
  }
  res.status(200).send(message);
});
// Configure swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
//Initiate a listener
const server = app.listen(port, host, (err) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  console.log(`Server is running on ${host}:${server.address().port}`);
});

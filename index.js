const Express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const servicewinget = require("./services/service-winget");
const app = Express();
app.use(Express.urlencoded({ extended: true }));
app.use(Express.json());
const port = 5100;

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
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.listen(port, () => {
  console.log("server running at http://localhost:" + port);
  console.log("swagger running at http://localhost:" + port + "/api-docs");
});

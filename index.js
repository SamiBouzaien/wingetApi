import Express from "express";
import Shell from "node-powershell";

function installapp(appname, computername) {
  const ps = new Shell({
    executionPolicy: "Bypass",
    noProfile: true,
  });
  ps.addCommand("$session = New-PSSession -ComputerName " + computername);
  ps.addCommand(
    "Invoke-Command -Session $session -ScriptBlock {winget install '" +
      appname +
      "' --accept-package-agreements --accept-source-agreements }"
  );
  ps.addCommand("Remove-PSSession $session");
  ps.invoke()
    .then((output) => {
      console.log(output);
    })
    .catch((error) => {
      console.log(error);
    });
}

const app = Express();
app.use(Express.urlencoded({ extended: true }));
app.use(Express.json());
const port = 5100;

app.post("/winget/install", (req, res) => {
  console.log(req);
  var appname = req.body.applicationname;
  var computername = req.body.computername;
  installapp(appname, computername);
  res.send(
    "l'application " +
      appname +
      " a été installée sur le poste " +
      computername +
      " avec succes"
  );
});

app.listen(port, () => {
  console.log("listening on port " + port);
});

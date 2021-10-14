import Express from "express";
import Shell from "node-powershell";

function ShellCommand() {
  const ps = new Shell({
    executionPolicy: "Bypass",
    noProfile: true,
  });
  var res = "";
  // ps.addCommand(
  //   "Get-WmiObject -Class Win32_Product -ComputerName 192.168.2.20 | select __SERVER , Name, Version -ErrorAction SilentlyContinue"
  // );
  ps.addCommand(
    "Invoke-Command -ComputerName 192.168.2.20 -ScriptBlock { Start-Process c:\\install_source\notepad_install   -Wait}"
  );
  ps.invoke()
    .then((output) => {
      console.log(output);
      res = output;
    })
    .catch((error) => {
      console.log(error);
      res = error;
    });
  return res;
}

const app = Express();
const port = 5100;

app.get("/", (req, res) => {
  var info = ShellCommand();
  res.json(info);
});

app.listen(port, () => {
  console.log("listening on port " + port);
});

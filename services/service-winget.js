const Shell = require("node-powershell");

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
  var isvalidtemp = false;
  ps.invoke()
    .then((output) => {
      isvalidtemp = true;
      console.log(output);
    })
    .catch((error) => {
      isvalidtemp = false;
      console.log(error);
    });
  return isvalidtemp;
}

module.exports = { install: installapp };

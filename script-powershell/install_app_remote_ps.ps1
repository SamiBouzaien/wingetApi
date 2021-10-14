$computers= Get-Content C:\Temp\computers.txt

$source="c:\install_source"

$dest="c$"

$testPath="c:\install_source\notepad_install.exe"

foreach($computer in $computers){

if(Test-Connection -Cn $computer -quiet){

Copy-Item $source -Destination \\$computer\$dest\client -Recurse -Force

if(Test-Path -Path $testPath){

Invoke-Command -ComputerName $computer -ScriptBlock {powershell.exe c:\Install\notepad_install.exe /sAll /msi /norestart ALLUSERS=1 EULA_ACCEPT=YES}

Write-Host -ForegroundColor Green "Installation avec succes sur $computer "

}

}
else{

Write-Host -ForegroundColor Red "$computer est non connecte ou l'installation a echoue"

}

}

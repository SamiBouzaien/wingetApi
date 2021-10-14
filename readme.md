> WinRM quickconfig

> WinRM get winrm/config/client

> Set-Item WSMan:localhost\client\trustedhosts -value \*

> Invoke-Command -ComputerName 192.168.2.20 -ScriptBlock {powershell.exe c:Install\notepad_install.exe /sAll /msi /norestart ALLUSERS=1 EULA_ACCEPT=YES}

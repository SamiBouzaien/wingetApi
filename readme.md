### configuration de WinRM sur un poste client

```powershell
 WinRM quickconfig

WinRM get winrm/config/client

 Set-Item WSMan:localhost\client\trustedhosts -value \*
```

### Utilisation de session powershell pour lancer la commande d'installation winget sur un poste client

```powershell
 $session = New-PSSession -ComputerName 192.168.2.20

 Invoke-Command -Session $session -ScriptBlock {winget install 'Visual Code Editor' --accept-package-agreements --accept-source-agreements }

 Remove-PSSession $session
```

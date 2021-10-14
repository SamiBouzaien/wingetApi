
$session = New-PSSession -ComputerName 192.168.2.20
Copy-Item -Path c:\Install_source\notepad_install.exe -ToSession $session -Destination 'c:\Temp\installer.exe'

Invoke-Command -Session $session -ScriptBlock {
    Start-Process c:\Temp\installer.exe -Wait
}
Remove-PSSession $session
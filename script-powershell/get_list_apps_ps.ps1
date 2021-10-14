
#Software Installed

$computers=Get-Content C:\Temp\computers.txt

ForEach($computer in $computers){

Write-Host "Processing Server $computer"

Get-WmiObject -Class Win32_Product -ComputerName $computer | select __SERVER , Name, Version -ErrorAction SilentlyContinue

}
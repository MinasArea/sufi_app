$ErrorActionPreference = 'Stop'
Write-Host ''
Write-Host '=========================================='
Write-Host '          MAQAM MOBILE INSTALLER         '
Write-Host '=========================================='
if (-not (Get-Command node -ErrorAction SilentlyContinue)) { Write-Host 'ERROR: Node.js was not found. Install Node.js LTS and reopen PowerShell.' -ForegroundColor Red; exit 1 }
Write-Host "Node: $(node --version)"
npm install
Write-Host ''
Write-Host 'Installation complete.' -ForegroundColor Green
Write-Host 'Start with: npx expo start'

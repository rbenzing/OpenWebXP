# PowerShell script to convert PSD icons to PNG format
# This script requires ImageMagick to be installed

param(
    [string]$SourceDir = "public\assets\icons",
    [string]$OutputDir = "public\assets\icons\png",
    [int]$Size = 32
)

# Check if ImageMagick is available
try {
    $null = & magick -version 2>&1
    if ($LASTEXITCODE -ne 0) {
        throw "ImageMagick not found"
    }
    Write-Host "ImageMagick found" -ForegroundColor Green
} catch {
    Write-Host "ImageMagick is not installed or not in PATH" -ForegroundColor Red
    Write-Host "Please install ImageMagick from https://imagemagick.org/script/download.php#windows" -ForegroundColor Yellow
    Write-Host "Alternative: Using online conversion service..." -ForegroundColor Yellow
    
    # Create a simple HTML file to help with manual conversion
    $htmlContent = @"
<!DOCTYPE html>
<html>
<head>
    <title>PSD to PNG Converter Helper</title>
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 20px; }
        .icon-list { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 10px; }
        .icon-item { border: 1px solid #ccc; padding: 10px; border-radius: 5px; }
        .convert-link { color: #0066cc; text-decoration: none; }
        .convert-link:hover { text-decoration: underline; }
    </style>
</head>
<body>
    <h1>Windows XP Icons - PSD to PNG Conversion Helper</h1>
    <p>Use online converters like <a href="https://convertio.co/psd-png/" target="_blank">Convertio</a> or <a href="https://www.zamzar.com/convert/psd-to-png/" target="_blank">Zamzar</a> to convert these PSD files:</p>
    <div class="icon-list">
"@
    
    # Check if source directory exists
    if (-not (Test-Path $SourceDir)) {
        Write-Host "Source directory not found: $SourceDir" -ForegroundColor Red
        exit 1
    }
    
    # Get all PSD files
    $psdFiles = Get-ChildItem -Path $SourceDir -Filter "*.psd" -Recurse
    foreach ($file in $psdFiles) {
        $relativePath = $file.FullName.Replace((Get-Location).Path + "\", "")
        $htmlContent += @"
        <div class="icon-item">
            <strong>$($file.BaseName)</strong><br>
            <small>$relativePath</small><br>
            <a href="https://convertio.co/psd-png/" target="_blank" class="convert-link">Convert Online</a>
        </div>
"@
    }
    
    $htmlContent += @"
    </div>
    <p><strong>Instructions:</strong></p>
    <ol>
        <li>Click "Convert Online" for each icon you want to convert</li>
        <li>Upload the PSD file to the converter</li>
        <li>Download the PNG result</li>
        <li>Save it to the <code>public\assets\icons\png\</code> folder</li>
        <li>Use the same filename but with .png extension</li>
    </ol>
</body>
</html>
"@
    
    $htmlContent | Out-File -FilePath "icon-conversion-helper.html" -Encoding UTF8
    Write-Host "Created icon-conversion-helper.html to help with manual conversion" -ForegroundColor Green
    exit 0
}

# Check if source directory exists
if (-not (Test-Path $SourceDir)) {
    Write-Host "Source directory not found: $SourceDir" -ForegroundColor Red
    exit 1
}

# Create output directory if it doesn't exist
if (-not (Test-Path $OutputDir)) {
    New-Item -ItemType Directory -Path $OutputDir -Force | Out-Null
    Write-Host "Created output directory: $OutputDir" -ForegroundColor Green
}

# Get all PSD files
$psdFiles = Get-ChildItem -Path $SourceDir -Filter "*.psd" -Recurse
$totalFiles = $psdFiles.Count
$converted = 0
$failed = 0

if ($totalFiles -eq 0) {
    Write-Host "No PSD files found in $SourceDir" -ForegroundColor Yellow
    exit 0
}

Write-Host "Found $totalFiles PSD files to convert" -ForegroundColor Cyan

foreach ($file in $psdFiles) {
    $outputFileName = $file.BaseName + ".png"
    $outputPath = Join-Path $OutputDir $outputFileName
    
    # Skip if PNG already exists
    if (Test-Path $outputPath) {
        Write-Host "Skipping $($file.Name) - PNG already exists" -ForegroundColor Yellow
        continue
    }
    
    try {
        Write-Host "Converting $($file.Name)..." -ForegroundColor White
        
        # Convert PSD to PNG using ImageMagick
        $magickArgs = @(
            "$($file.FullName)[0]"
            "-flatten"
            "-resize"
            "${Size}x${Size}"
            "-background"
            "transparent"
            "$outputPath"
        )
        
        & magick $magickArgs 2>&1 | Out-Null
        
        if ($LASTEXITCODE -eq 0 -and (Test-Path $outputPath)) {
            $converted++
            Write-Host "Converted: $outputFileName" -ForegroundColor Green
        } else {
            throw "ImageMagick conversion failed (exit code: $LASTEXITCODE)"
        }
    } catch {
        $failed++
        Write-Host "Failed to convert $($file.Name): $($_.Exception.Message)" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "Conversion Summary:" -ForegroundColor Cyan
Write-Host "Total files: $totalFiles" -ForegroundColor White
Write-Host "Converted: $converted" -ForegroundColor Green
Write-Host "Failed: $failed" -ForegroundColor Red

if ($converted -gt 0) {
    Write-Host ""
    Write-Host "PNG icons saved to: $OutputDir" -ForegroundColor Green
}
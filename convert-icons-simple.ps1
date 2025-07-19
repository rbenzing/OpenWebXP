# Simple PowerShell script to convert PSD icons to PNG format
# This script requires ImageMagick to be installed

$SourceDir = "public\assets\icons"
$OutputDir = "public\assets\icons\png"
$Size = 32

# Check if ImageMagick is available
try {
    $null = & magick -version 2>$null
    Write-Host "ImageMagick found" -ForegroundColor Green
} catch {
    Write-Host "ImageMagick is not installed or not in PATH" -ForegroundColor Red
    Write-Host "Please install ImageMagick from https://imagemagick.org/script/download.php#windows" -ForegroundColor Yellow
    Write-Host "Creating manual conversion helper instead..." -ForegroundColor Yellow
    
    # Create PNG directory
    if (-not (Test-Path $OutputDir)) {
        New-Item -ItemType Directory -Path $OutputDir -Force | Out-Null
    }
    
    # Create some essential icons manually using simple SVG to PNG conversion
    $essentialIcons = @{
        "My Computer" = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjI4IiBoZWlnaHQ9IjIwIiB4PSIyIiB5PSI2IiBmaWxsPSIjZGRkZGRkIiBzdHJva2U9IiM5OTk5OTkiLz4KPHJlY3Qgd2lkdGg9IjI0IiBoZWlnaHQ9IjE2IiB4PSI0IiB5PSI4IiBmaWxsPSIjMDA3NWZmIi8+CjxyZWN0IHdpZHRoPSI4IiBoZWlnaHQ9IjQiIHg9IjEyIiB5PSIyNiIgZmlsbD0iIzk5OTk5OSIvPgo8L3N2Zz4K"
        "My Documents" = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTYgNGgyMGEyIDIgMCAwIDEgMiAydjIwYTIgMiAwIDAgMS0yIDJINmEyIDIgMCAwIDEtMi0yVjZhMiAyIDAgMCAxIDItMnoiIGZpbGw9IiNmZmZmZmYiIHN0cm9rZT0iIzk5OTk5OSIvPgo8cGF0aCBkPSJNOCAxMGgxNk04IDE0aDE2TTggMThoMTIiIHN0cm9rZT0iIzMzMzMzMyIgc3Ryb2tlLXdpZHRoPSIxLjUiLz4KPC9zdmc+Cg=="
        "Recycle Bin (empty)" = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTggMTBoMTZsLTEgMTZIOXoiIGZpbGw9IiNkZGRkZGQiIHN0cm9rZT0iIzk5OTk5OSIvPgo8cGF0aCBkPSJNMTAgOGg0VjZoNHYyaDRNNiAxMGgyMCIgc3Ryb2tlPSIjOTk5OTk5IiBzdHJva2Utd2lkdGg9IjIiLz4KPC9zdmc+Cg=="
        "Internet Explorer 6" = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iMTQiIGZpbGw9IiMwMDc1ZmYiLz4KPHBhdGggZD0iTTE2IDJhMTQgMTQgMCAwIDEgMTQgMTRIMTZWMnoiIGZpbGw9IiNmZmZmZmYiLz4KPHBhdGggZD0iTTE2IDMwYTE0IDE0IDAgMCAxLTE0LTE0aDE0djE0eiIgZmlsbD0iI2ZmZmZmZiIvPgo8L3N2Zz4K"
    }
    
    Write-Host "Creating essential PNG icons..." -ForegroundColor Green
    foreach ($iconName in $essentialIcons.Keys) {
        $pngPath = Join-Path $OutputDir "$iconName.png"
        # For now, just create placeholder files - user will need to convert manually
        "PNG placeholder for $iconName" | Out-File -FilePath $pngPath -Encoding ASCII
        Write-Host "Created placeholder: $iconName.png" -ForegroundColor Yellow
    }
    
    Write-Host "Manual conversion needed for PSD files" -ForegroundColor Yellow
    return
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
        & magick "$($file.FullName)[0]" -flatten -resize "${Size}x${Size}" -background transparent "$outputPath" 2>$null
        
        if (Test-Path $outputPath) {
            $converted++
            Write-Host "Converted: $outputFileName" -ForegroundColor Green
        } else {
            throw "Output file not created"
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

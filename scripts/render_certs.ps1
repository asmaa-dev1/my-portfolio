Add-Type -AssemblyName System.Drawing
[Windows.Data.Pdf.PdfDocument, Windows.Data.Pdf, ContentType = WindowsRuntime] | Out-Null
[Windows.Storage.StorageFile, Windows.Storage, ContentType = WindowsRuntime] | Out-Null

function Convert-PdfToImage {
    param([string]$pdfPath, [string]$pngPath)
    
    $fullPdfPath = [System.IO.Path]::GetFullPath($pdfPath)
    $fullPngPath = [System.IO.Path]::GetFullPath($pngPath)
    
    if (-not (Test-Path $fullPdfPath)) {
        Write-Warning "File not found: $fullPdfPath"
        return
    }

    $asyncOp = [Windows.Storage.StorageFile]::GetFileFromPathAsync($fullPdfPath)
    while ($asyncOp.Status -eq 'Started') { Start-Sleep -Milliseconds 30 }
    $file = $asyncOp.GetResults()
    
    $docOp = [Windows.Data.Pdf.PdfDocument]::LoadFromFileAsync($file)
    while ($docOp.Status -eq 'Started') { Start-Sleep -Milliseconds 30 }
    $doc = $docOp.GetResults()
    
    $page = $doc.GetPage(0)
    
    $targetDir = [System.IO.Path]::GetDirectoryName($fullPngPath)
    $fileName = [System.IO.Path]::GetFileName($fullPngPath)
    $folderOp = [Windows.Storage.StorageFolder]::GetFolderFromPathAsync($targetDir)
    while ($folderOp.Status -eq 'Started') { Start-Sleep -Milliseconds 30 }
    $folder = $folderOp.GetResults()
    
    $createOp = $folder.CreateFileAsync($fileName, [Windows.Storage.CreationCollisionOption]::ReplaceExisting)
    while ($createOp.Status -eq 'Started') { Start-Sleep -Milliseconds 30 }
    $outFile = $createOp.GetResults()
    
    $streamOp = $outFile.OpenAsync([Windows.Storage.FileAccessMode]::ReadWrite)
    while ($streamOp.Status -eq 'Started') { Start-Sleep -Milliseconds 30 }
    $stream = $streamOp.GetResults()
    
    $renderOp = $page.RenderToStreamAsync($stream)
    while ($renderOp.Status -eq 'Started') { Start-Sleep -Milliseconds 30 }
    
    $flushOp = $stream.FlushAsync()
    while ($flushOp.Status -eq 'Started') { Start-Sleep -Milliseconds 30 }
    $stream.Dispose()
    
    Write-Output "Successfully rendered: $fileName"
}

$certs = @(
    @{ pdf = "public/certificates/scrum-foundation.pdf"; png = "public/certificates/scrum-foundation.png" },
    @{ pdf = "public/certificates/business-intelligence-foundation.pdf"; png = "public/certificates/business-intelligence-foundation.png" },
    @{ pdf = "public/certificates/cisco-python-essentials.pdf"; png = "public/certificates/cisco-python-essentials.png" },
    @{ pdf = "public/certificates/cisco-javascript-essentials.pdf"; png = "public/certificates/cisco-javascript-essentials.png" }
)

foreach ($c in $certs) {
    Convert-PdfToImage -pdfPath $c.pdf -pngPath $c.png
}

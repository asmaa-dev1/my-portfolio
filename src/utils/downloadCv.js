/**
 * Utility to reliably download CV PDF files across all devices and browsers (Chrome, Safari, iOS, Android)
 * Uses Blob fetching to guarantee the browser prompts a native file download with the specified filename
 */
export async function downloadCvFile(pdfUrl, filename = 'CV_Asmaa_Elhint.pdf') {
  try {
    const response = await fetch(pdfUrl, { cache: 'no-cache' });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const blob = await response.blob();
    const blobUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => {
      window.URL.revokeObjectURL(blobUrl);
    }, 2000);
    return true;
  } catch (error) {
    console.warn('Blob download failed, falling back to direct navigation:', error);
    // Fallback: direct anchor download
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = filename;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return false;
  }
}

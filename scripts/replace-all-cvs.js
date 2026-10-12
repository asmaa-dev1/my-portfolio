import fs from 'fs';
import path from 'path';
import puppeteer from 'puppeteer-core';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const uploadedPdf = 'C:\\Users\\elhin\\.gemini\\antigravity\\brain\\efe33941-9a71-4df9-b703-fcac57a155c9\\.user_uploaded\\media_1791838364400.pdf';
const desktopDir = 'c:\\Users\\elhin\\OneDrive\\Desktop';
const artifactDir = 'C:\\Users\\elhin\\.gemini\\antigravity\\brain\\efe33941-9a71-4df9-b703-fcac57a155c9';

if (!fs.existsSync(uploadedPdf)) {
  console.error('Uploaded PDF not found at:', uploadedPdf);
  process.exit(1);
}

const pdfBuffer = fs.readFileSync(uploadedPdf);
console.log(`Found uploaded PDF (${pdfBuffer.length} bytes). Replacing all CV PDFs in public/...`);

const targets = [
  path.join(rootDir, 'public', 'cv_asmaa_elhint_fr.pdf'),
  path.join(rootDir, 'public', 'cv_asmaa_elhint_en.pdf'),
  path.join(rootDir, 'public', 'cv_asmaa_elhint_de.pdf')
];

for (const target of targets) {
  fs.writeFileSync(target, pdfBuffer);
  console.log(`✓ Replaced: ${target}`);
}

const desktopTargets = [
  path.join(desktopDir, 'cv_asmaa_elhint_fr.pdf'),
  path.join(desktopDir, 'cv_asmaa_elhint_en.pdf'),
  path.join(desktopDir, 'cv_asmaa_elhint_de.pdf'),
  path.join(desktopDir, 'CV_Asmaa_Elhint.pdf')
];

for (const target of desktopTargets) {
  try {
    fs.writeFileSync(target, pdfBuffer);
    console.log(`✓ Copied to Desktop: ${target}`);
  } catch (e) {
    console.warn(`Could not copy to ${target}:`, e.message);
  }
}

// Now render a screenshot of this PDF to update the preview images
const executablePath = fs.existsSync('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe')
  ? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
  : 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

async function updatePreviews() {
  console.log('Rendering screenshots of the new PDF for previews...');
  const browser = await puppeteer.launch({
    executablePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 794, height: 1123, deviceScaleFactor: 2 });
  
  // Navigate to the file URL of the PDF or use Chrome's PDF viewer / canvas
  // Since Chrome headless can render the PDF file directly:
  const pdfUrl = `file://${targets[0].replace(/\\/g, '/')}`;
  await page.goto(pdfUrl, { waitUntil: 'networkidle0' });

  const previewArtifact = path.join(artifactDir, 'cv_preview_new.png');
  await page.screenshot({ path: previewArtifact, fullPage: false });
  console.log(`✓ Screenshot preview saved to: ${previewArtifact}`);

  await browser.close();
}

updatePreviews().catch(err => {
  console.log('Preview note (non-critical):', err.message);
}).then(() => {
  console.log('ALL CVs have been successfully replaced with the user-uploaded PDF!');
});

import puppeteer from 'puppeteer-core';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const executablePath = fs.existsSync('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe')
  ? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
  : 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

async function generatePdfs() {
  console.log(`Using browser executable: ${executablePath}`);

  const browser = await puppeteer.launch({
    executablePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const artifactDir = 'C:\\Users\\elhin\\.gemini\\antigravity\\brain\\efe33941-9a71-4df9-b703-fcac57a155c9';
  const desktopDir = 'c:\\Users\\elhin\\OneDrive\\Desktop';
  if (!fs.existsSync(artifactDir)) {
    fs.mkdirSync(artifactDir, { recursive: true });
  }

  const files = [
    {
      lang: 'fr',
      html: path.join(rootDir, 'src', 'templates', 'cv_fr.html'),
      pdf: path.join(rootDir, 'public', 'cv_asmaa_elhint_fr.pdf'),
      previewArtifact: path.join(artifactDir, 'cv_preview_fr.png'),
      previewDesktop: path.join(desktopDir, 'cv_asmaa_elhint_preview_fr.png')
    },
    {
      lang: 'en',
      html: path.join(rootDir, 'src', 'templates', 'cv_en.html'),
      pdf: path.join(rootDir, 'public', 'cv_asmaa_elhint_en.pdf'),
      previewArtifact: path.join(artifactDir, 'cv_preview_en.png'),
      previewDesktop: path.join(desktopDir, 'cv_asmaa_elhint_preview_en.png')
    },
    {
      lang: 'de',
      html: path.join(rootDir, 'src', 'templates', 'cv_de.html'),
      pdf: path.join(rootDir, 'public', 'cv_asmaa_elhint_de.pdf'),
      previewArtifact: path.join(artifactDir, 'cv_preview_de.png'),
      previewDesktop: path.join(desktopDir, 'cv_asmaa_elhint_preview_de.png')
    }
  ];

  for (const item of files) {
    console.log(`Generating PDF and preview for: ${item.html}`);
    const page = await browser.newPage();
    await page.setViewport({ width: 794, height: 1123, deviceScaleFactor: 2 });
    
    const htmlContent = fs.readFileSync(item.html, 'utf-8');
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

    await page.pdf({
      path: item.pdf,
      format: 'A4',
      printBackground: true,
      preferCSSPageSize: true,
      margin: {
        top: '0mm',
        right: '0mm',
        bottom: '0mm',
        left: '0mm'
      }
    });

    await page.screenshot({
      path: item.previewArtifact,
      fullPage: false,
      clip: { x: 0, y: 0, width: 794, height: 1123 }
    });

    if (fs.existsSync(desktopDir)) {
      fs.copyFileSync(item.previewArtifact, item.previewDesktop);
    }

    console.log(`✓ Successfully created: ${item.pdf} and preview: ${item.previewArtifact}`);
    await page.close();
  }

  await browser.close();
  console.log('All CV PDFs and previews generated successfully!');
}

generatePdfs().catch((err) => {
  console.error('Error generating PDFs:', err);
  process.exit(1);
});

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

  const files = [
    {
      html: path.join(rootDir, 'src', 'templates', 'cv_en.html'),
      pdf: path.join(rootDir, 'public', 'cv_asmaa_elhint_en.pdf')
    },
    {
      html: path.join(rootDir, 'src', 'templates', 'cv_fr.html'),
      pdf: path.join(rootDir, 'public', 'cv_asmaa_elhint_fr.pdf')
    },
    {
      html: path.join(rootDir, 'src', 'templates', 'cv_de.html'),
      pdf: path.join(rootDir, 'public', 'cv_asmaa_elhint_de.pdf')
    }
  ];

  for (const item of files) {
    console.log(`Generating PDF for: ${item.html}`);
    const page = await browser.newPage();
    
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

    console.log(`✓ Successfully created: ${item.pdf}`);
    await page.close();
  }

  await browser.close();
  console.log('All CV PDFs (EN, FR, DE) generated successfully!');
}

generatePdfs().catch((err) => {
  console.error('Error generating PDFs:', err);
  process.exit(1);
});

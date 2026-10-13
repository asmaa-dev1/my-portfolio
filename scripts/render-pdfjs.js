import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

async function main() {
  const executablePath = fs.existsSync('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe')
    ? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
    : 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

  const browser = await puppeteer.launch({ executablePath, headless: true });
  const page = await browser.newPage();

  const pdfBytes = fs.readFileSync('C:\\Users\\elhin\\.gemini\\antigravity\\brain\\24607839-2c25-445c-af5f-1064e122be59\\.user_uploaded\\media_1791848195779.pdf');
  const pdfB64 = pdfBytes.toString('base64');

  const html = `
  <!DOCTYPE html>
  <html>
  <head>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js"></script>
    <style>body { margin:0; padding:0; background:white; overflow:hidden; }</style>
  </head>
  <body>
    <canvas id="pdfCanvas"></canvas>
    <script>
      pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
      const pdfData = atob('${pdfB64}');
      const loadingTask = pdfjsLib.getDocument({ data: pdfData });
      window.rendered = false;
      loadingTask.promise.then(pdf => {
        return pdf.getPage(1);
      }).then(page => {
        const viewport = page.getViewport({ scale: 2.0 });
        const canvas = document.getElementById('pdfCanvas');
        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        return page.render({ canvasContext: context, viewport: viewport }).promise;
      }).then(() => {
        window.rendered = true;
      }).catch(err => {
        window.renderError = err.message;
      });
    </script>
  </body>
  </html>
  `;

  await page.setContent(html);
  await page.waitForFunction('window.rendered === true || !!window.renderError', { timeout: 30000 });

  const canvasSize = await page.evaluate(() => {
    const canvas = document.getElementById('pdfCanvas');
    return { width: canvas.width, height: canvas.height };
  });

  await page.setViewport({ width: canvasSize.width, height: canvasSize.height });
  const outPath = 'C:/Users/elhin/.gemini/antigravity/brain/24607839-2c25-445c-af5f-1064e122be59/canva_exact_canvas.png';
  await page.screenshot({
    path: outPath,
    clip: { x: 0, y: 0, width: canvasSize.width, height: canvasSize.height }
  });

  await browser.close();
  console.log('Successfully rendered exact canvas:', canvasSize, outPath);
}

main().catch(console.error);

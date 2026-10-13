import puppeteer from 'puppeteer-core';
import fs from 'fs';

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
  </head>
  <body>
    <script>
      pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
      const pdfData = atob('${pdfB64}');
      pdfjsLib.getDocument({ data: pdfData }).promise.then(pdf => pdf.getPage(1)).then(page => {
        window.viewport = page.getViewport({ scale: 1.0 });
        return page.getTextContent();
      }).then(content => {
        window.items = content.items.map(it => ({
          str: it.str,
          x: Math.round(it.transform[4]),
          y: Math.round(window.viewport.height - it.transform[5]),
          fontSize: Math.round(it.transform[0] * 10) / 10,
          fontName: it.fontName
        })).filter(it => it.str.trim().length > 0);
        window.done = true;
      }).catch(err => {
        window.err = err.message;
      });
    </script>
  </body>
  </html>
  `;

  await page.setContent(html);
  await page.waitForFunction('window.done === true || !!window.err', { timeout: 30000 });

  const result = await page.evaluate(() => ({
    viewport: window.viewport,
    items: window.items,
    err: window.err
  }));

  if (result.err) {
    console.error('Error from page:', result.err);
  } else {
    console.log('PDF Page Dimensions (pt):', result.viewport.width, 'x', result.viewport.height);
    console.log('Total text elements:', result.items.length);
    console.log('--- ALL KEY TEXT ELEMENTS WITH EXACT COORD & FONT SIZE ---');
    for (const it of result.items) {
      console.log(`[${it.fontSize}pt] (x:${it.x}, y:${it.y}) -> "${it.str}"`);
    }
  }

  await browser.close();
}

main().catch(console.error);

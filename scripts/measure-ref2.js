import puppeteer from 'puppeteer-core';
import fs from 'fs';

async function analyze() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true
  });
  const page = await browser.newPage();
  const b64 = fs.readFileSync('C:/Users/elhin/.gemini/antigravity/brain/efe33941-9a71-4df9-b703-fcac57a155c9/.user_uploaded/media_1791836643082.png').toString('base64');
  await page.setContent(`<html><body style="margin:0"><img id="ref" src="data:image/png;base64,${b64}"/></body></html>`);
  const res = await page.evaluate(() => {
    const img = document.getElementById('ref');
    const c = document.createElement('canvas');
    c.width = img.naturalWidth;
    c.height = img.naturalHeight;
    const ctx = c.getContext('2d');
    ctx.drawImage(img, 0, 0);
    const d = ctx.getImageData(0, 0, c.width, c.height).data;
    
    // Find black bar:
    let blackBarY = 0, blackBarBottom = 0;
    for(let y=50; y<200; y++) {
      let isBlack = true;
      for(let x=100; x<200; x++) {
        let i = (y*c.width + x)*4;
        if(d[i] > 30 || d[i+1] > 30 || d[i+2] > 30) { isBlack = false; break; }
      }
      if(isBlack && blackBarY === 0) blackBarY = y;
      if(blackBarY > 0 && !isBlack && blackBarBottom === 0) blackBarBottom = y;
    }
    
    // Find photo bounds: (x: 5 to 130, y: 0 to blackBarY)
    let minX=999, minY=999, maxX=0, maxY=0;
    for(let y=10; y<blackBarY; y++) {
      for(let x=5; x<130; x++) {
        let i = (y*c.width + x)*4;
        let r=d[i], g=d[i+1], b=d[i+2];
        if(r < 235 || g < 235 || b < 235) {
          if(x<minX) minX=x;
          if(x>maxX) maxX=x;
          if(y<minY) minY=y;
          if(y>maxY) maxY=y;
        }
      }
    }
    
    return {
      w: c.width,
      h: c.height,
      blackBarY,
      blackBarHeight: blackBarBottom - blackBarY,
      photo: { minX, minY, maxX, maxY, pw: maxX-minX+1, ph: maxY-minY+1 },
      photoWidthPct: ((maxX-minX+1)/c.width)*100,
      photoHeightPct: ((maxY-minY+1)/c.height)*100,
      photoAspect: (maxX-minX+1) / (maxY-minY+1),
      gapToBlackBar: blackBarY - maxY
    };
  });
  console.log('MEASUREMENT=' + JSON.stringify(res, null, 2));
  await browser.close();
}

analyze().catch(console.error);

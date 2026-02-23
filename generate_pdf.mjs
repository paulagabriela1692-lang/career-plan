import puppeteer from 'puppeteer';
import { resolve } from 'path';
import { pathToFileURL } from 'url';

const htmlPath = resolve('/Users/paula/Career/resume_airbnb.html');
const pdfPath  = resolve('/Users/paula/Career/Paula_Hernandez_Resume_Airbnb.pdf');

const browser = await puppeteer.launch({ headless: true });
const page    = await browser.newPage();

await page.goto(pathToFileURL(htmlPath).href, { waitUntil: 'networkidle0' });

// Wait for Google Fonts to load
await new Promise(r => setTimeout(r, 2000));

await page.pdf({
  path: pdfPath,
  format: 'A4',
  printBackground: true,
  margin: { top: '0', right: '0', bottom: '0', left: '0' },
  preferCSSPageSize: false,
});

await browser.close();
console.log('PDF saved to:', pdfPath);

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const { google } = require('googleapis');

// === Google API Auth ===
async function authorizeGoogle() {
  const auth = new google.auth.GoogleAuth({
    keyFile: 'credentials.json',
    scopes: ['https://www.googleapis.com/auth/spreadsheets', 'https://www.googleapis.com/auth/drive.file'],
  });
  return await auth.getClient();
}

// === Upload image to Drive ===
async function uploadToDrive(auth, filePath, name) {
  const drive = google.drive({ version: 'v3', auth });
  const fileMetadata = { name };
  const media = {
    mimeType: 'image/jpeg',
    body: fs.createReadStream(filePath),
  };
  const res = await drive.files.create({
    resource: fileMetadata,
    media,
    fields: 'id, webViewLink',
  });
  return res.data.webViewLink;
}

// === Write to Google Sheet ===
async function appendToSheet(auth, data) {
  const sheets = google.sheets({ version: 'v4', auth });
  const sheetId = '1uHjyScrCPfws4lImuJ6-7QZqWrg9sPpUqiudeoCf7Yg'; // Replace with your Sheet ID
  await sheets.spreadsheets.values.append({
    spreadsheetId: sheetId,
    range: 'Sheet1!A1',
    valueInputOption: 'USER_ENTERED',
    resource: {
      values: data,
    },
  });
}

// === Main Scraper ===
(async () => {
  const auth = await authorizeGoogle();
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  await page.goto('https://www.swagathstores.com/shop/Snacks', { waitUntil: 'networkidle2' });

  const productLinks = await page.$$eval('.product-card a', links =>
    links.map(link => link.href)
  );

  const rows = [['Name', 'Price', 'Description', 'Variants', 'Image URL', 'Drive Link']];

  for (const link of productLinks) {
    try {
      await page.goto(link, { waitUntil: 'networkidle2' });

      const name = await page.$eval('.product-title', el => el.textContent.trim());
      const price = await page.$eval('.price', el => el.textContent.trim());
      const description = await page.$eval('.product-description', el => el.textContent.trim());
      const imgUrl = await page.$eval('.product-image img', img => img.src);

      let variants = 'N/A';
      try {
        variants = await page.$$eval('select[name="variant"] option', opts =>
          opts.map(opt => opt.textContent.trim()).join(', ')
        );
      } catch {}

      // Download image
      const imgPath = path.join(__dirname, `${name.replace(/[^a-z0-9]/gi, '_')}.jpg`);
      const viewSource = await page.goto(imgUrl);
      fs.writeFileSync(imgPath, await viewSource.buffer());

      // Upload to Drive
      const driveLink = await uploadToDrive(auth, imgPath, path.basename(imgPath));

      rows.push([name, price, description, variants, imgUrl, driveLink]);

      console.log(`✔️ ${name} scraped and uploaded`);
    } catch (e) {
      console.log(`❌ Failed to scrape: ${link}`, e.message);
    }
  }

  // Upload all to Google Sheets
  await appendToSheet(auth, rows);
  await browser.close();
})();

const fs = require('fs');
const cheerio = require('cheerio');

// 讀取 HTML 檔案
const html = fs.readFileSync('a.html', 'utf8');
const $ = cheerio.load(html);

const result = [];

$('._2g-qq').each((i, el) => {
  const vn = $(el).find('h3').text().trim();
  const en = $(el).find('p').text().trim();

  if (vn && en) {
    result.push({
      vn,
      zh: "(中文)",
      en,
      sentence: "(例句)",
      translation: "(例句翻譯)"
    });
  }
});

// 輸出為 result.json
fs.writeFileSync('result.json', JSON.stringify(result, null, 2), 'utf8');
console.log(`✅ 已成功輸出 ${result.length} 筆資料到 result.json`);

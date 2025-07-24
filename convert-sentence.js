const fs = require('fs');
const cheerio = require('cheerio');

// 讀取 HTML 檔案
const html = fs.readFileSync('b-sentence.html', 'utf8');
const $ = cheerio.load(html);

const result = [];

$('._1m5OF').each((i, el) => {
  const type = $(el).find('._1tkEU').text().trim();
  const vn = $(el).find('._2rQ0F').text().trim();
  const word = 'you hear';
  console.log(type);
  if (type.includes(word)) {
    result.push({
      vn,
      zh: "(中文)",
      en: "(英文)"
    });
  }
});

// 輸出為 result.json
fs.writeFileSync('result-sentence.json', JSON.stringify(result, null, 2), 'utf8');
console.log(`✅ 已成功輸出 ${result.length} 筆資料到 result-sentence.json`);

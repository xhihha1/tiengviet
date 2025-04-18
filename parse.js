const fs = require('fs');
const cheerio = require('cheerio');

// 讀取 index_new.html
const rawHTML = fs.readFileSync('index_new.html', 'utf8');
const $ = cheerio.load(rawHTML);

// 解析所有的 li.word-item
const words = [];

$('li.word-item').each((i, elem) => {
  const item = $(elem);
  
  const vn = item.find('h3.vn').text().trim();
  const zh = item.find('p.zh').text().trim();
  const en = item.find('p.en').text().trim();
  const sentence = item.find('p.sentence').text().trim();
  const translation = item.find('p.translation').text().trim();

  words.push({
    vn: vn,
    zh: zh,
    en: en,
    sentence: sentence,
    translation: translation
  });
});

// 儲存成 lang.json
fs.writeFileSync('lang.json', JSON.stringify(words, null, 2), 'utf8');
console.log('✅ lang.json 已成功產生！');

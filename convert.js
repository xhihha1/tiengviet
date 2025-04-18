const fs = require('fs');
const cheerio = require('cheerio');

// 讀取 index.html
const inputFile = 'index.html';
const outputFile = 'index_new.html';

const rawHTML = fs.readFileSync(inputFile, 'utf8');
const $ = cheerio.load(rawHTML);

// 建立一個新的容器
const newList = $('<ul class="word-list"></ul>');

// 處理所有 li._2g-qq
$('li._2g-qq').each((i, elem) => {
  const item = $(elem);

  const vnText = item.find('h3').text().trim();
  const enText = item.find('p').first().text().trim();

  const newLi = $(`
    <li class="word-item">
      <button class="voice"><i class="fa-solid fa-volume-high"></i></button>
      <div class="word-content">
        <div class="row">
          <h3 class="vn">${vnText}</h3>
          <p class="zh">（預留中文）</p>
          <p class="en">${enText}</p>
        </div>
        <div class="row">
          <p class="sentence">（預留例句）</p>
          <p class="translation">（預留翻譯）</p>
        </div>
      </div>
    </li>
  `);

  newList.append(newLi);
});

// 替換原本的 <ul> 或是插入到 body 裡
$('body').empty().append(newList);

// 寫出新檔案
fs.writeFileSync(outputFile, $.html(), 'utf8');
console.log(`✅ 轉換完成！輸出檔案：${outputFile}`);

const fs = require('fs');

// 讀取 lang.json
const data = JSON.parse(fs.readFileSync('lang.json', 'utf8'));

const errors = [];

data.forEach(item => {
  const vn = item.vn?.trim().toLowerCase();
  const sentence = item.sentence?.toLowerCase() || "";

  if (!vn || !sentence.includes(vn)) {
    errors.push(item);
  }
});

// 寫入錯誤資料到 error.json
fs.writeFileSync('error.json', JSON.stringify(errors, null, 2), 'utf8');

console.log(`檢查完成，${errors.length} 筆資料未在 sentence 中包含 vn 單字，已存至 error.json`);

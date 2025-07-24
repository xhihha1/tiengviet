const fs = require('fs');

// 讀取 result.json
const resultData = JSON.parse(fs.readFileSync('result-sentence.json', 'utf8'));

// 讀取 lang.json
const langData = JSON.parse(fs.readFileSync('sentence.json', 'utf8'));

// 確保兩者都是陣列
if (!Array.isArray(resultData)) {
  console.error('result-sentence.json 應該是一個陣列');
  process.exit(1);
}
if (!Array.isArray(langData)) {
  console.error('sentence.json 應該是一個陣列');
  process.exit(1);
}

// 合併陣列：將 resultData 插入到 langData 的最前面
const mergedData = [...resultData, ...langData];

// 寫回 lang.json
fs.writeFileSync('sentence.json', JSON.stringify(mergedData, null, 2), 'utf8');

console.log('合併完成，sentence.json 已更新。');
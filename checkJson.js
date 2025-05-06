const fs = require('fs');
const path = require('path');

// 目錄路徑
const dirPath = path.join(__dirname, 'language');

// 欲檢查並補齊的欄位與預設值
const defaultFields = {
  vn: '(越南語)',
  zh: '(中文)',
  en: '(英文)',
  sentence: '(越南語造句)',
  translation: '(中文翻譯)'
};

// 讀取資料夾內容
fs.readdirSync(dirPath).forEach(file => {
  if (file.endsWith('.json')) {
    const filePath = path.join(dirPath, file);
    try {
      const rawData = fs.readFileSync(filePath, 'utf8');
      let json = JSON.parse(rawData);

      let modified = false;

      if (Array.isArray(json)) {
        json = json.map(entry => {
          const newEntry = { ...entry };
          for (const key in defaultFields) {
            if (!(key in newEntry)) {
              newEntry[key] = defaultFields[key];
              modified = true;
            }
          }
          return newEntry;
        });

        if (modified) {
          fs.writeFileSync(filePath, JSON.stringify(json, null, 2), 'utf8');
          console.log(`✅ 補齊欄位：${file}`);
        } else {
          console.log(`✅ 已完整：${file}`);
        }
      } else {
        console.warn(`⚠️ 檔案 ${file} 並非 JSON 陣列格式`);
      }
    } catch (e) {
      console.error(`❌ 無法處理 ${file}：${e.message}`);
    }
  }
});

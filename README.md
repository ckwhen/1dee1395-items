# Items

> 商品搜尋與列表展示

## 技術規劃

| 項目         | 技術                           |
|--------------|--------------------------------|
| Frameworks | React |
| UI | Tailwind CSS |
| API 通訊     | Axios |
| Routing      | React Router |
| 建構工具     | Vite: react-ts |
| 型別, Coding Style 管理     | TypeScript / ESLint |

## API 資料結構

```json
{
  // /items
  "items": [
    {
      "name": "Item 1",
      "category": "A",
      "price": 459,
      "inStock": false,
      "id": "fac533d9-662f-4854-887d-6099edac568d"
    }
  ],
  // /params
  "params": [
    {
      "id": "980ed1f4-ba97-4f36-a54b-9fdd1be5ae7a",
      "label": "A",
      "value": "A",
      "type": 0
    },
    {
      "id": "1fc2784b-4650-4274-88bf-80ec1ac621ef",
      "label": "有庫存",
      "value": 1,
      "type": 1
    }
  ],
}
```

## 安裝與啟動 (Installation & Usage)

```bash
# 安裝依賴
npm install

# 啟動開發伺服器
npm run dev

# 如果 ./server 下沒有 ./db.json 資料
# 請執行
npm run gen-data
```

## 設計說明
- 手機尺寸 (< 640px)：單欄卡片列表
- 平板尺寸 (< 1024px)：雙欄卡片列表
- 桌機尺寸 (>= 1024px)：Table 表格展示

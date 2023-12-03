# 物流追踪系統

這個專案是一個簡單的物流追踪系統，使用 Node.js 和 Sequelize ORM 來管理資料庫。
使用Mysql和Redise富存資料存取。
使用cron設定排成生成report。
使用Nginx反向代理web server。

提供兩個API:
1. Query API: 
api/query?sno={$sno}
查詢對應sno物流單
2. fake API: 
api/fake?num={$num}
新增指定數量fake物流單

## 如何開始

以下是一些基本的步驟，以設定和運行這個專案。

### 安裝

在開始之前，請確保已經安裝 [Node.js](https://nodejs.org/) 和 [npm](https://www.npmjs.com/)。

```bash
sudo apt update
audo apt install git 

git clone https://github.com/yukiew/logistics-tracking.git

sudo chmod +x logistics-tracking/script.sh
sudo logistics-tracking/script.sh
```

### 啟動應用程式

```bash
cd logistics-tracking
node index.js
```
請確保 `index.js` 的實際路徑。

應用程式將在 `http://localhost:3000` 上運行。

### 設定定期執行報表程式

1. 編輯 crontab。

```bash
crontab -e
```

2. 下行以每天的 0:00、08:00 和 16:00 執行一次。

```bash
0 0,8,16 * * * node /home/ubuntu/logistics-tracking/report-script.js
```
請確保 `report-script.js` 的實際路徑。


#!/bin/bash

# 部署腳本 - 編譯並上傳到遠端伺服器，同時備份原有內容

# 預設變數值
LOCAL_DIST="./dist"   # 本地編譯後的目錄 (nuxt generate 產生的目錄)

# 從 .env 讀取變數 (如果存在)
if [ -f .env ]; then
  echo "正在從 .env 讀取設定..."
  source .env
else
  echo "警告: 找不到 .env 檔案，將使用命令行參數"
fi

# 檢查命令行參數 (優先於 .env 中的設定)
if [ "$#" -eq 3 ]; then
  SSH_USER="$1"
  SSH_HOST="$2"
  REMOTE_DIR="$3"
elif [ "$#" -ne 0 ]; then
  echo "用法: $0 [SSH_USER SSH_HOST REMOTE_DIR]"
  exit 1
fi

# 檢查必要變數是否已設定
if [ -z "$SSH_USER" ] || [ -z "$SSH_HOST" ] || [ -z "$REMOTE_DIR" ]; then
  echo "錯誤: SSH_USER, SSH_HOST 和 REMOTE_DIR 必須在 .env 檔案中設定或通過命令行提供"
  echo "請建立 .env 檔案並加入以下內容:"
  echo "SSH_USER=\"使用者名稱\""
  echo "SSH_HOST=\"主機位址\""
  echo "REMOTE_DIR=\"遠端目錄\""
  exit 1
fi

# 確認部署資訊
echo "====================== 部署資訊 ======================"
echo "SSH 使用者: $SSH_USER"
echo "SSH 主機: $SSH_HOST"
echo "遠端目錄: $REMOTE_DIR"
echo "====================================================="
echo ""

# 測試是否能連接到目標主機
echo "正在測試與目標主機的連接..."
echo "若需要密碼登入，請輸入目標主機密碼"
ssh -q -o ConnectTimeout=5 ${SSH_USER}@${SSH_HOST} exit
if [ $? -ne 0 ]; then
  echo "錯誤: 無法連接到目標主機 ${SSH_USER}@${SSH_HOST}"
  echo "請確認您的網路連接、SSH 設定和目標主機是否正常運行"
  exit 1
fi
echo "成功連接到目標主機"
echo ""

# 確認是否繼續
read -p "是否繼續部署? (y/n): " -n 1 -r
echo ""
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
  echo "部署已取消"
  exit 0
fi

# 編譯專案
echo "正在編譯專案..."
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
nvm use 22
npm run generate

# 檢查編譯是否成功
if [ $? -ne 0 ]; then
  echo "編譯失敗，部署已中止"
  exit 1
fi
echo "編譯完成"

# 產生時間戳記做為備份目錄名稱
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
# 將備份目錄設定在遠端目錄的上一層
PARENT_DIR=$(dirname "${REMOTE_DIR}")
BASE_NAME=$(basename "${REMOTE_DIR}")
BACKUP_DIR="${PARENT_DIR}/${BASE_NAME}_backup_${TIMESTAMP}"

echo "正在備份遠端目錄..."
echo "若需要密碼登入，請輸入目標主機密碼"
# 在伺服器上建立備份
ssh ${SSH_USER}@${SSH_HOST} "if [ -d ${REMOTE_DIR} ]; then cp -r ${REMOTE_DIR} ${BACKUP_DIR}; echo '備份已建立: ${BACKUP_DIR}'; else echo '遠端目錄不存在，將建立新目錄'; fi"

echo "正在上傳檔案到伺服器..."
echo "若需要密碼登入，請輸入目標主機密碼"
# 使用 rsync 上傳編譯後的檔案
rsync -avz --delete ${LOCAL_DIST}/ ${SSH_USER}@${SSH_HOST}:${REMOTE_DIR}/

echo "部署完成!"
echo "備份目錄: ${BACKUP_DIR}"
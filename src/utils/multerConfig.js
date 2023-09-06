const multer = require("multer");
const path = require("path");

// 1. 주 애플리케이션의 절대 경로를 얻습니다.
const appRoot = path.dirname(require.main.filename);

// 2. 위의 경로를 기반으로 'uploads' 디렉토리의 절대 경로를 생성합니다.
const uploadDir = path.join(appRoot, "uploads");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir); // 이전에 계산한 'uploads' 디렉토리의 절대 경로를 사용합니다.
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

module.exports = upload;

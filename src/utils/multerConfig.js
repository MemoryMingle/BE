const multer = require('multer');
const path = require('path');

// 1. 주 애플리케이션의 절대 경로를 얻습니다.
const appRoot = path.dirname(require.main.filename);

// 2. 위의 경로를 기반으로 'uploads' 디렉토리의 절대 경로를 생성합니다.
const uploadDir = path.join(appRoot, 'uploads');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log('Multer destination function called');
        cb(null, uploadDir);  // 이전에 계산한 'uploads' 디렉토리의 절대 경로를 사용합니다.
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

// const fileFilter = (req, file, cb) => {
//     // 파일 형식을 검사하여 이미지만 허용하는 경우
//     if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
//         cb(null, true);  // 이미지인 경우, 파일 저장 허용
//     } else {
//         cb(null, false);  // 이미지가 아닌 경우, 파일 저장 거부
//     }
// };

// const upload = multer({
//     storage: storage,
//     limits: {
//         fileSize: 1024 * 1024 * 5  // 5MB로 파일 크기 제한
//     },
//     fileFilter: fileFilter
// });


const upload = multer({ storage: storage });


module.exports = upload;


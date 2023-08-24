const cloudinary = require('cloudinary').v2;
const fs = require('fs');  // 파일 시스템 모듈
require('dotenv').config();

// Cloudinary 설정
cloudinary.config({
    cloud_name: process.env.YOUR_CLOUD_NAME,
    api_key: process.env.YOUR_API_KEY,
    api_secret: process.env.YOUR_API_SECRET
});

const uploadToProfile = async (filePath) => {
    // Cloudinary에 이미지 업로드
    const result = await cloudinary.uploader.upload(filePath, {
        folder: 'TEST',
        transformation: [
            {
                crop: 'fill',
                gravity: 'face',
                width: 300,
                height: 300
            }
        ],
        format: 'webp',     // 확장자를 WebP로 변경
        quality: 'auto'     // 품질 자동 최적화
    });

    // 업로드가 성공하면 서버의 임시 파일 삭제
    fs.unlink(filePath, (err) => {
        if (err) {
            console.error("임시 저장 이미지 삭제 실패.", err);
        } else {
            console.log("임시 저장 이미지 삭제 완료.");
        }
    });

    return result.url;  // Cloudinary에서의 이미지 URL 반환
}

module.exports = uploadToProfile;

const cloudinary = require('cloudinary').v2;
require('dotenv').config();

// Cloudinary 설정
cloudinary.config({
    cloud_name: process.env.YOUR_CLOUD_NAME,
    api_key: process.env.YOUR_API_KEY,
    api_secret: process.env.YOUR_API_SECRET
});

const generateSignedUploadParams = async () => {
    // 사인을 위한 타임스탬프 생성
    const timestamp = Math.round((new Date()).getTime() / 1000);

    // 사인 생성
    const signature = cloudinary.utils.api_sign_request({ timestamp }, process.env.YOUR_API_SECRET);

    // 사인과 타임스탬프를 반환
    return {
        signature,
        timestamp
    };
}

module.exports = generateSignedUploadParams;

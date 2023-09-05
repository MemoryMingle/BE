const express = require("express");
const router = express.Router();
const authMiddleware = require("../utils/authMiddleware");
const asyncHandler = require("../utils/asyncHandler");
const generateSignedUploadParams = require("../utils/signedUpload")

router.get('/', authMiddleware, asyncHandler(async (req, res) => {
    const { signature, timestamp } = await generateSignedUploadParams();
    res.status(200).json({
        success: true,
        signature,
        timestamp
    });
}));

module.exports = router
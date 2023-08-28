const MemoryService = require("../services/memory.service")
const uploadImageToCloudinary = require('../utils/uploadToCloudinary');
const CustomError = require('../utils/error');


class MemoryController {
    memoryService = new MemoryService()

    createMemory = async (req, res, next) => {
        const userId = res.locals.user;
        const { groupId } = req.params;
        const { title } = req.body; // imageUrl을 여기에서 제거
        let imageUrl;  // 이미지 URL 초기화
        if (req.file) {
            // 이미지 업로드 및 URL 받아오기
            imageUrl = await uploadImageToCloudinary(req.file.path);
        } else {
            throw new CustomError("이미지 업로드 중 문제 발생", 400)
        }
        const createMemoryData = await this.memoryService.createMemory(userId, groupId, title, imageUrl)
        res.status(200).json({
            success: true,
            message: "Memory를 생성하였습니다."
        });

    };

    findOneMemory = async (req, res, next) => {
        const userId = res.locals.user;
        const { groupId, memoryId } = req.params;
        const [findOneMemoryData, memoryComments] = await this.memoryService.findOneMemory(userId, groupId, memoryId)
        res
            .status(200)
            .json({
                userId,
                memory: findOneMemoryData,
                comments: memoryComments
            })
    }
    findUpdateMemory = async (req, res, next) => {
        // null인 경우와 그룹 유저 검사할건지에 대한 확인이 필요함
        const userId = res.locals.user;
        const { memoryId } = req.params;
        const findUpdateMemoryData = await this.memoryService.findUpdateMemory(userId, memoryId)
        res
            .status(200)
            .json({
                data: findUpdateMemoryData
            })
    }
    updateMemory = async (req, res, next) => {
        const userId = res.locals.user;
        const { memoryId } = req.params;
        const { title } = req.body
        let imageUrl;  // 이미지 URL 초기화
        if (req.file) {
            // 이미지 업로드 및 URL 받아오기
            imageUrl = await uploadImageToCloudinary(req.file.path);
        } else {
            throw new CustomError("이미지 업로드 중 문제 발생", 400)
        }
        const updateMemoryData = await this.memoryService.updateMemory(userId, memoryId, title, imageUrl)
        res
            .status(200)
            .json({
                success: true,
                message: "Memory를 수정하였습니다."
            })
    }
    deleteMemory = async (req, res, next) => {
        const userId = res.locals.user;
        const { memoryId } = req.params;
        const deleteMemoryData = await this.memoryService.deleteMemory(userId, memoryId)
        res
            .status(200)
            .json({
                success: true,
                message: "Memory를 삭제하였습니다."
            })
    }
}

module.exports = MemoryController
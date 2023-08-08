const MemoryService = require("../services/memory.service")

class MemoryController {
    memoryService = new MemoryService()

    createMemory = async (req, res, next) => {
        try {
            const { userId } = res.locals.user;
            const { groupId } = req.params;
            const { title, imageUrl } = req.body;

            const createMemoryData = await this.memoryService.createMemory(userId, groupId, title, imageUrl);

            res
                .status(200)
                .json({
                    success: true,
                    message: "Memory를 생성하였습니다."
                })
        } catch (error) {
            next(error);
        }
    }
    findOneMemory = async (req, res, next) => {
        try {
            const { userId } = res.locals.user;
            const { groupId, memoryId } = req.params;

            const [findOneMemoryData, MemoryComments] = await this.memoryService.findOneMemory(userId, groupId, memoryId)

            res
                .status(200)
                .json({
                    memory: findOneMemoryData,
                    comments: MemoryComments
                })
        } catch (error) {
            next(error);
        }
    }
    findUpdateMemory = async (req, res, next) => {
        try {
            // null인 경우와 그룹 유저 검사할건지에 대한 확인이 필요함
            const { userId } = res.locals.user;
            const { groupId, memoryId } = req.params;

            const findUpdateMemoryData = await this.memoryService.findUpdateMemory(memoryId)
            res
                .status(200)
                .json({
                    data: findUpdateMemoryData
                })
        } catch (error) {
            next(error);
        }
    }
    updateMemory = async (req, res, next) => {
        try {
            const { userId } = res.locals.user;
            const { memoryId } = req.params;
            const { title, imageUrl } = req.body

            const updateMemoryData = await this.memoryService.updateMemory(userId, memoryId, title, imageUrl)

            res
                .status(200)
                .json({
                    success: true,
                    message: "Memory를 수정하였습니다."
                })
        } catch (error) {
            next(error);
        }
    }
    deleteMemory = async (req, res, next) => {
        try {
            const { userId } = res.locals.user;
            const { memoryId } = req.params;

            const deleteMemoryData = await this.memoryService.deleteMemory(userId, memoryId)

            res
                .status(200)
                .json({
                    success: true,
                    message: "Memory를 삭제하였습니다."
                })
        } catch (error) {
            next(error);
        }
    }
}

module.exports = MemoryController
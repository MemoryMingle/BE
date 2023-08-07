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
                .status(201)
                .json({
                    success: true, message: "Memory를 생성하였습니다."
                })
        } catch (error) {
            next(error);
        }
    }


}

module.exports = MemoryController
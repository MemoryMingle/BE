const MemoryRepository = require("../repositories/memory.repository")
const CustomError = require('../utils/error');
class MemoryService {
    memoryRepository = new MemoryRepository()

    createMemory = async (userId, groupId, title, imageUrl) => {
        const createMemoryData = await this.memoryRepository.createMemory(userId, groupId, title, imageUrl)
        return createMemoryData
    }
    findOneMemory = async (userId, groupId, memoryId) => {
        const findOneMemoryData = await this.memoryRepository.findOneMemory(memoryId)
        if (findOneMemoryData.groupId !== Number(groupId)) {
            throw new CustomError("잘못된 접근입니다.", 400)
        }
        const findCommentData = await this.memoryRepository.findComment(memoryId)
        const findOneUserData = await this.memoryRepository.findOneUser(userId)
        return [findOneMemoryData, findCommentData, findOneUserData]
    }
    findUpdateMemory = async (userId, groupId, memoryId) => {
        const findUpdateMemoryData = await this.memoryRepository.findUpdateMemory(memoryId)
        if (findUpdateMemoryData.userId !== Number(userId) || findUpdateMemoryData.groupId !== Number(groupId)) {
            throw new CustomError("잘못된 접근입니다.", 400);
        }
        return findUpdateMemoryData
    }
    updateMemory = async (userId, groupId, memoryId, title, imageUrl) => {
        const memoryCheckData = await this.memoryRepository.memoryCheck(memoryId)
        if (memoryCheckData.userId !== Number(userId) || memoryCheckData.groupId !== Number(groupId)) {
            throw new CustomError("잘못된 접근입니다.", 400);
        }
        const updateMemoryData = await this.memoryRepository.updateMemory(memoryId, title, imageUrl)
        return updateMemoryData
    }
    deleteMemory = async (userId, memoryId) => {
        const memoryCheckData = await this.memoryRepository.memoryCheck(memoryId)
        if (memoryCheckData.userId !== userId) {
            throw new CustomError("글쓴이가 아닙니다.", 400);
        }
        const deleteMemoryData = await this.memoryRepository.deleteMemory(memoryId)
        return deleteMemoryData
    }
}

module.exports = MemoryService
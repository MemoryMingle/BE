const MemoryRepository = require("../repositories/memory.repository")
const CustomError = require('../utils/error');
class MemoryService {
    memoryRepository = new MemoryRepository()

    createMemory = async (userId, groupId, title, imageUrl) => {
        const createMemoryData = await this.memoryRepository.createMemory(userId, groupId, title, imageUrl)
        return createMemoryData
    }
    findOneMemory = async (userId, groupId, memoryId) => {
        const participantCheckData = await this.memoryRepository.participantCheck(userId, groupId)
        if (!participantCheckData) {
            throw new CustomError("참여자가 아닙니다.", 400);
        }
        const findOneMemoryData = await this.memoryRepository.findOneMemory(memoryId)
        return findOneMemoryData
    }
    findUpdateMemory = async (memoryId) => {
        const findUpdateMemoryData = await this.memoryRepository.findUpdateMemory(memoryId)
        if (findUpdateMemoryData.userId !== userId) {
            throw new CustomError("글쓴이가 아닙니다.", 400);
        }
        return findUpdateMemoryData
    }
    updateMemory = async (userId, memoryId, title, imageUrl) => {
        const memoryCheckData = await this.memoryRepository.memoryCheck(memoryId)
        if (memoryCheckData.userId !== userId) {
            throw new CustomError("글쓴이가 아닙니다.", 400);
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
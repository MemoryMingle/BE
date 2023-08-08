const MemoryRepository = require("../repositories/memory.repository")

class MemoryService {
    memoryRepository = new MemoryRepository()

    createMemory = async (userId, groupId, title, imageUrl) => {
        const createMemoryData = await this.memoryRepository.createMemory(userId, groupId, title, imageUrl)
        return createMemoryData
    }
    findOneMemory = async (userId, groupId, memoryId) => {
        const participantCheckData = await this.memoryRepository.participantCheck(userId, groupId)
        if (!participantCheckData) {
            const error = new Error("참여자가 아닙니다.");
            error.status = 404
            throw error;
        }
        const findOneMemoryData = await this.memoryRepository.findOneMemory(userId, groupId, memoryId)
        return findOneMemoryData
    }
    findUpdateMemory = async (memoryId) => {
        const findUpdateMemoryData = await this.memoryRepository.findUpdateMemory(memoryId)
        return findUpdateMemoryData
    }
    updateMemory = async (userId, memoryId, title, imageUrl) => {
        const memoryCheckData = await this.memoryRepository.memoryCheck(memoryId)
        if (memoryCheckData.userId !== userId) {
            const error = new Error("글쓴이가 아닙니다.");
            error.status = 404
            throw error;
        }
        const updateMemoryData = await this.memoryRepository.updateMemory(memoryId, title, imageUrl)
        return updateMemoryData
    }
    deleteMemory = async (userId, memoryId) => {
        const memoryCheckData = await this.memoryRepository.memoryCheck(memoryId)
        if (memoryCheckData.userId !== userId) {
            const error = new Error("글쓴이가 아닙니다.");
            error.status = 404
            throw error;
        }
        const deleteMemoryData = await this.memoryRepository.deleteMemory(memoryId)
        return deleteMemoryData
    }
}

module.exports = MemoryService
const MemoryRepository = require("../repositories/memory.repository")

class MemoryService {
    memoryRepository = new MemoryRepository()

    createMemory = async (userId, groupId, title, imageUrl) => {
        const createMemoryData = await this.memoryRepository.createMemory(userId, groupId, title, imageUrl)
        return createMemoryData
    }
}

module.exports = MemoryService
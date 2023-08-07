const { Memories } = require("../models")

class MemoryRepository {
    createMemory = async (userId, groupId, title, imageUrl) => {
        const createMemoryData = await Memories.create({
            userId,
            groupId: Number(groupId),
            title,
            imageUrl
        });
        return createMemoryData
    }

}

module.exports = MemoryRepository
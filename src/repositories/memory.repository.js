const { Users, Memories, Comments, Participants } = require("../models")
const { Op } = require("sequelize");

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

    participantCheck = async (userId, groupId) => {
        console.log(Participants)
        const participantCheckData = await Participants.findOne({
            where: { [Op.and]: [{ userId, groupId: Number(groupId) }] }
        })
        return participantCheckData
    }

    findOneMemory = async (userId, groupId, memoryId) => {
        const findOneMemoryData = await Memories.findAll({
            where: { memoryId },
            attributes: ["memoryId", "title", "imageUrl"],
            raw: true,
            include: [
                {
                    model: Users,
                    attributes: ["nickname", "profileUrl"],
                }
            ]
        })
        const MemoryComments = await Comments.findAll({
            where: { memoryId },
            attributes: ["commentId", "comment"],
            group: ["commentId"],
            raw: true,
            include: [
                {
                    model: Users,
                    attributes: ["userId", "nickname", "profileUrl"],
                }
            ]
        })
        return [findOneMemoryData, MemoryComments]
    }
    findUpdateMemory = async (memoryId) => {
        const findUpdateMemoryData = await Memories.findOne({
            where: { memoryId },
            attributes: ["memoryId", "title", "imageUrl"]
        })
        return findUpdateMemoryData
    }
    check = async (memoryId) => {
        const checkData = await Memories.findByPk(memoryId)
        return checkData
    }
    updateMemory = async (memoryId, title, imageUrl) => {
        const updateMemoryData = await Memories.update(
            { title, imageUrl },
            { where: { memoryId } }
        )
        return updateMemoryData
    }
    deleteMemory = async (memoryId) => {
        const deleteMemoryData = await Memories.destroy(
            { where: { memoryId } }
        )
        return deleteMemoryData
    }
}

module.exports = MemoryRepository
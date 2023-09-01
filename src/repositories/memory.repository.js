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
    findOneMemory = async (memoryId) => {
        const findOneMemoryData = await Memories.findOne({
            where: { memoryId },
            attributes: ["userId", "groupId", "memoryId", "title", "imageUrl", "createdAt"],
            raw: true,
            include: [
                {
                    model: Users,
                    attributes: ["nickname", "profileUrl"],
                }
            ]
        })
        return findOneMemoryData
    }
    findComment = async (memoryId) => {
        const findCommentData = await Comments.findAll({
            where: { memoryId },
            attributes: ["userId", "commentId", "comment", "createdAt"],
            group: ["commentId"],
            raw: true,
            order: [['createdAt', 'DESC']],
            include: [
                {
                    model: Users,
                    attributes: ["userId", "nickname", "profileUrl"],
                }
            ]
        })
        return findCommentData
    }
    findOneUser = async (userId) => {
        const findOneUserData = await Users.findOne({
            where: { userId },
            attributes: ["userId", "nickname", "profileUrl"],
        })
        return findOneUserData
    }
    findUpdateMemory = async (memoryId) => {
        const findUpdateMemoryData = await Memories.findOne({
            where: { memoryId },
            attributes: ["userId", "groupId", "memoryId", "title", "imageUrl"]
        })
        return findUpdateMemoryData
    }
    memoryCheck = async (memoryId) => {
        const checkData = await Memories.findOne({
            where: { memoryId },
            attributes: ["userId", "groupId"]
        })
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
const express = require('express');
const { Op } = require('sequelize');
const { Users, Groups, Memories, Comments, Participants } = require('../models');  // 모델 경로는 실제 프로젝트에 따라 다르므로 수정 필요
const router = express.Router();

router.get('/', async (req, res) => {
    const dummyData = [];

    for (let i = 151; i <= 200; i++) {
        dummyData.push({
            loginId: `${i}`,
            nickname: `${i}`,
            profileUrl: '1',
        });
    }

    try {
        await Users.bulkCreate(dummyData);
        res.status(200).send('Dummy data inserted successfully.');
    } catch (error) {
        console.error('Error inserting dummy data:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/', async (req, res) => {
    try {
        const [userId, groupName, thumbnailUrl, place, startDate, endDate] = [2, "그룹명", "thumbnailUrl", "장소", '2023-08-08', '2023-08-10']
        const [groupId, title, imageUrl] = [1, "제목", "사진"]
        const [memoryId, comment] = [1, "댓글"]
        const group = await Groups.create({
            userId, groupName, thumbnailUrl, place, startDate, endDate
        });
        const memory = await Memories.create({ userId, groupId, title, imageUrl })
        const comments = await Comments.create({ userId, memoryId, comment })
        const participant = await Participants.create({ userId, groupId })
        res.status(200).send(group, memory, comments, participant);
    } catch (error) {
        console.error('Error inserting dummy data:', error);
        res.status(500).send('Internal Server Error');
    }
})

router.delete('/', async (req, res) => {
    try {
        const deleteCount = await Users.destroy({
            where: {
                userId: {
                    [Op.between]: [151, 200]
                }
            }
        });
        res.status(200).json({
            message: `${deleteCount} records deleted successfully.`,
            deletedCount: deleteCount
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error deleting records',
            error: error.message
        });
    }
});

module.exports = router;

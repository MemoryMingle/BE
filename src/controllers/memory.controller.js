const MemoryService = require("../services/memory.service");
const CustomError = require("../utils/error");

class MemoryController {
  memoryService = new MemoryService();

  createMemory = async (req, res, next) => {
    const userId = res.locals.user;
    const { groupId } = req.params;
    const { title, imageUrl } = req.body; // imageUrl을 여기에서 제거
    const createMemoryData = await this.memoryService.createMemory(
      userId,
      groupId,
      title,
      imageUrl
    );
    res.status(200).json({
      success: true,
      message: "Memory를 생성하였습니다.",
    });
  };

  findOneMemory = async (req, res, next) => {
    const userId = res.locals.user;
    const { groupId, memoryId } = req.params;
    const [findOneMemoryData, findCommentData, findOneUserData] =
      await this.memoryService.findOneMemory(userId, groupId, memoryId);
    res.status(200).json({
      memory: findOneMemoryData,
      comments: findCommentData,
      user: findOneUserData,
    });
  };
  findUpdateMemory = async (req, res, next) => {
    // null인 경우와 그룹 유저 검사할건지에 대한 확인이 필요함
    const userId = res.locals.user;
    const { groupId, memoryId } = req.params;
    const findUpdateMemoryData = await this.memoryService.findUpdateMemory(
      userId,
      groupId,
      memoryId
    );
    res.status(200).json({
      data: findUpdateMemoryData,
    });
  };
  updateMemory = async (req, res, next) => {
    const userId = res.locals.user;
    const { groupId, memoryId } = req.params;
    const { title, imageUrl } = req.body;
    const updateMemoryData = await this.memoryService.updateMemory(
      userId,
      groupId,
      memoryId,
      title,
      imageUrl
    );
    res.status(200).json({
      success: true,
      message: "Memory를 수정하였습니다.",
    });
  };
  deleteMemory = async (req, res, next) => {
    const userId = res.locals.user;
    const { memoryId } = req.params;
    const deleteMemoryData = await this.memoryService.deleteMemory(
      userId,
      memoryId
    );
    res.status(200).json({
      success: true,
      message: "Memory를 삭제하였습니다.",
    });
  };
}

module.exports = MemoryController;

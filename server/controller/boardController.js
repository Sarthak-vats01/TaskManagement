import boardModel from "../model/boardModel.js";
import List from "../model/listModel.js";

async function fetchBoard(req, res) {
  const userId = req.query.userId;

  try {
    // Find all boards belonging to the user
    const boards = await boardModel.find({ boardUserId: userId });

    res.status(200).send(boards);
  } catch (error) {
    res.status(500).send(`Error fetching boards: ${error.message}`);
  }
}

async function createBoard(req, res) {
  const { name } = req.body;
  const userId = req.query.userId;

  try {
    if (!name || !userId) {
      return res.status(400).send("name or userId not mentioned");
    }

    const newBoard = new boardModel({
      name,
      boardUserId: userId,
    });

    await newBoard.save();

    const boardId = newBoard._id;

    res.status(200).send({ boardId });
  } catch (error) {
    res.status(400).send(`${error} in createBoard`);
  }
}

async function deleteBoard(req, res) {
  const { boardId } = req.body;

  console.log(boardId);

  try {
    // Find the board by ID and delete it
    await boardModel.findByIdAndDelete(boardId);
    await List.deleteMany({ listBoardId: boardId });

    res.status(200).send("Board deleted successfully");
  } catch (error) {
    res.status(400).send(`${error} in deleteBoard`);
  }
}

export { createBoard, deleteBoard, fetchBoard };

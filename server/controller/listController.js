import List from "../model/listModel.js";

// Controller method to create a new list
async function createList(req, res) {
  const { listBoardId, name } = req.body;
  const listUserId = req.query.userId;

  try {
    const newList = new List({ listBoardId, listUserId, name });
    const savedList = await newList.save();
    return res.status(201).json(savedList);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function fetchLists(req, res) {
  const { boardId } = req.query;

  console.log("fetchList function", boardId);

  try {
    const lists = await List.find({ listBoardId: boardId });
    return res.json(lists);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function createTask(req, res) {
  const { listId } = req.body;
  const { name } = req.body;

  try {
    const list = await List.findById(listId);
    if (!list) {
      return res.status(404).json({ message: "List not found" });
    }

    list.tasks.push({ name });
    const savedList = await list.save();
    return res.status(201).json(savedList);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function editTask(req, res) {
  const { listId, taskId } = req.body;
  const { name } = req.body;
  console.log(listId, taskId, name);

  try {
    const list = await List.findById(listId);
    if (!list) {
      return res.status(404).json({ message: "List not found" });
    }

    const task = list.tasks.id(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    task.name = name;
    const savedList = await list.save();
    return res.json(savedList);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function deleteTask(req, res) {
  const { listId, taskId } = req.body;
  console.log(listId);

  try {
    const updatedList = await List.findByIdAndUpdate(
      listId,
      { $pull: { tasks: { _id: taskId } } },
      { new: true }
    );

    if (!updatedList) {
      return res.status(404).json({ message: "List not found" });
    }

    return res.json(updatedList);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function deleteList(req, res) {
  const { listId } = req.body;

  try {
    const deletedList = await List.findByIdAndDelete(listId);
    if (!deletedList) {
      return res.status(404).json({ message: "List not found" });
    }

    return res.json({ message: "List deleted successfully" });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export { createList, createTask, editTask, deleteTask, deleteList, fetchLists };

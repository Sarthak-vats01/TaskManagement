import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import "./board.css";
import { MdDeleteOutline } from "react-icons/md";
import axios from "axios";
import { BoardURL } from "../constants/constant.js";
import { CgPlayListAdd } from "react-icons/cg";

function Board({
  showForm,
  setShowForm,
  createBoard,
  fetchList,
  showDialog,
  setShowDialog,
  handleCreateList,
}) {
  const { id } = useParams();
  const userId = id.slice(1);
  const [boards, setBoards] = useState([]);
  const [boardName, setBoardName] = useState("");
  const [boardId, setBoardId] = useState("");
  const [listName, setListName] = useState("");

  const fetchBoards = useCallback(async () => {
    try {
      const res = await axios.get(`${BoardURL}/fetchBoard?userId=${userId}`);
      setBoards(res.data);
    } catch (error) {
      console.log(error);
    }
  }, [userId]);

  useEffect(() => {
    fetchBoards();
  }, [fetchBoards]);

  async function handleDelete(id) {
    try {
      await axios.delete(`${BoardURL}/deleteBoard`, { data: { boardId: id } });
      fetchBoards();
    } catch (error) {
      console.log(error);
    }
  }

  const handleAddListClick = () => {
    setShowDialog(true); // Open the dialog when "Add List" button is clicked
  };

  const handleCloseDialog = () => {
    setShowDialog(false); // Close the dialog when "Cancel" button is clicked
  };

  const handleAddListWithId = (id) => {
    setBoardId(id); // Set the boardId state
    handleAddListClick(); // Call handleAddListClick to open the dialog
  };

  return (
    <div className="relative">
      <section className="border border-gray-300 max-h-40 overflow-x-auto flex flex-wrap p-4 hide-scrollbar bg-gray-100 ">
        {boards.map((item) => (
          <div
            className="relative w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-2"
            key={item._id}
            onClick={() => fetchList(item._id)}
          >
            <div className="bg-white border border-gray-300 shadow-md rounded-lg flex-shrink-0 h-24 flex items-center justify-center hover:bg-gray-600 group">
              <span className="text-gray-800 font-semibold group-hover:text-white">
                {item.name}
              </span>
              <div className="absolute top-0 right-0 p-2">
                <MdDeleteOutline
                  className="text-gray-800 group-hover:text-white "
                  onClick={() => handleDelete(item._id)}
                />
                <CgPlayListAdd
                  className="text-gray-800 group-hover:text-white"
                  onClick={() => handleAddListWithId(item._id)}
                />
              </div>
            </div>
          </div>
        ))}
      </section>
      {showForm && (
        <div className="absolute inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50 z-20">
          <form className="bg-white p-4 rounded-lg">
            <input
              type="text"
              placeholder="Enter board name"
              className="border border-gray-300 rounded-md p-2 mr-2 focus:outline-none focus:ring focus:border-blue-300"
              onChange={(e) => setBoardName(e.target.value)}
              value={boardName}
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
              onClick={() => createBoard(userId, boardName)}
            >
              Create
            </button>
            <button
              className="bg-blue-500 text-red-400 px-4 py-2 ml-4 rounded-md"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>
          </form>
        </div>
      )}
      {/* Dialog box for adding a new list */}
      {showDialog && (
        <div className="absolute inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50 z-20">
          <div className="bg-white p-4 rounded-lg">
            <input
              type="text"
              placeholder="Enter list name"
              className="border border-gray-300 rounded-md p-2 mr-2 focus:outline-none focus:ring focus:border-blue-300"
              onChange={(e) => setListName(e.target.value)}
              value={listName}
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md "
              onClick={() => handleCreateList(boardId, listName)}
            >
              Create
            </button>
            <button
              className="bg-blue-500 text-red-400 px-4 py-2 ml-4 rounded-md"
              onClick={handleCloseDialog}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Board;

import { useEffect, useState, useContext, useCallback } from "react";
import { useParams } from "react-router-dom";
import { AccountContext } from "../context/AccountProvider.jsx";
import Board from "../components/Board";
import Navbar from "../components/Navbar";
import Thought from "../components/Thought";
import MainList from "../components/ListComponent/MainList";

import axios from "axios";

import { BoardURL, ListURL } from "../constants/constant.js";

function Task() {
  const [showForm, setShowForm] = useState(false);
  const { setList } = useContext(AccountContext);
  const [showDialog, setShowDialog] = useState(false);

  const { id } = useParams();
  const userId = id.slice(1);

  async function createBoard(userId, boardName) {
    try {
      const response = await axios.post(
        `${BoardURL}/createBoard?userId=${userId}`,
        {
          name: boardName,
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  const fetchList = useCallback(async () => {
    console.log("fetchList-", userId);
    try {
      const response = await axios.get(`${ListURL}/fetchList?userId=${userId}`);
      setList(response.data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }, [userId, setList]);

  async function handleCreateList(boardId, listName) {
    try {
      await axios.post(`${ListURL}/createList?userId=${userId}`, {
        listBoardId: boardId,
        name: listName,
      });
      fetchList();
    } catch (error) {
      console.log(error);
    }
    setShowDialog(false);
  }

  useEffect(() => {
    fetchList();
  }, [fetchList]);

  return (
    <div className="App border border-black h-screen w-screen">
      <Navbar setShowForm={setShowForm} />
      <Board
        showForm={showForm}
        setShowForm={setShowForm}
        createBoard={createBoard}
        fetchList={fetchList}
        handleCreateList={handleCreateList}
        showDialog={showDialog}
        setShowDialog={setShowDialog}
      />
      <Thought />
      <MainList />
    </div>
  );
}

export default Task;

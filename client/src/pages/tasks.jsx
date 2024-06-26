import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AccountContext } from "../context/AccountProvider.jsx";
import Board from "../components/Board";
import Navbar from "../components/Navbar";
import Thought from "../components/Thought";
import MainList from "../components/ListComponent/MainList";
import axios from "axios";
import { BoardURL, ListURL } from "../constants/constant.js";

function Task({ onLogout }) {
  const [showForm, setShowForm] = useState(false);
  const { setList } = useContext(AccountContext);
  const [showDialog, setShowDialog] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const userId = id.slice(1);

  async function createBoard(userId, boardName) {
    try {
      const response = await axios.post(
        `${BoardURL}/createBoard?userId=${userId}`,
        { name: boardName }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchList(boardId) {
    console.log("fetchList", boardId);
    try {
      const response = await axios.get(
        `${ListURL}/fetchList?boardId=${boardId}`
      );
      setList(response.data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleCreateList(boardId, listName) {
    try {
      await axios.post(`${ListURL}/createList?userId=${userId}`, {
        listBoardId: boardId,
        name: listName,
      });
    } catch (error) {
      console.log(error);
    }
    setShowDialog(false);
  }

  useEffect(() => {
    fetchList();
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="App border border-black h-screen w-screen">
      <Navbar setShowForm={setShowForm} onLogout={onLogout} />
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

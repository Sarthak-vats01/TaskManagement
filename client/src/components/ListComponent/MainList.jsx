import React, { useState, useContext } from "react";
import { AccountContext } from "../../context/AccountProvider.jsx";
import axios from "axios";
import "./listmain.css";
import { MdDeleteOutline } from "react-icons/md";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { MdIncompleteCircle } from "react-icons/md";
import { IoAdd } from "react-icons/io5";
import { ListURL } from "../../constants/constant.js";
import { ImHammer2 } from "react-icons/im";
import { FcCancel } from "react-icons/fc";

function MainList() {
  const { list } = useContext(AccountContext);

  const [newTaskName, setNewTaskName] = useState(""); // State for new task input
  const [editSelected, setEditSelected] = useState(null); // State to track the task being edited
  const [editTask, setEditTask] = useState("");

  async function handleNewTaskChange(e) {
    setNewTaskName(e.target.value); // Update new task name as it's typed
  }

  async function handleCreateTask(listId) {
    console.log("Creating new task:", newTaskName);
    try {
      await axios.post(`${ListURL}/createTask`, {
        listId: listId,
        name: newTaskName,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteTask(listId, taskId) {
    console.log(listId, taskId);
    try {
      await axios.delete(`${ListURL}/deleteTask`, {
        data: { listId, taskId }, // Send data object containing listId and taskId
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteList(listId) {
    try {
      await axios.delete(`${ListURL}/deleteList`, {
        data: { listId },
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function handleEditTask(listId, taskId) {
    const name = editTask;
    console.log(listId, taskId, name);
    try {
      await axios.patch(`${ListURL}/editTask`, {
        listId,
        taskId,
        name,
      });
      setEditSelected(false);
    } catch (error) {
      console.log(error);
    }
  }

  function handleIoAddClick(listId) {
    handleCreateTask(listId);
    setNewTaskName("");
  }

  return (
    <div className="overflow-x-auto bg-gray-100 flex flex-nowrap p-4 hide-scrollbar mt-6 min-h-55">
      {Array.isArray(list) && list.length > 0 ? (
        <div className="flex ">
          {list.map((item) => (
            <div
              key={item._id}
              className="bg-gray-800 rounded-lg shadow-lg flex-shrink-0 mb-4 mr-4 transform transition-transform hover:scale-105 w-64 sm:w-auto"
            >
              <div className="p-4">
                <h2 className="text-base font-semibold mb-2 text-blue-500">
                  {item.name}
                </h2>
                <ul className="list-disc list-inside overflow-x-auto hide-scrollbar max-h-48">
                  {item.tasks.map((task) => (
                    <li
                      key={task._id}
                      className="text-gray-100 border-b border-gray-700 pb-2 flex justify-between text-xs sm:text-sm"
                    >
                      {editSelected === task._id ? (
                        <div className="flex justify-between w-full">
                          <input
                            type="text"
                            className="text-gray-100 border-b border-gray-700 bg-inherit"
                            value={editTask}
                            onChange={(e) => setEditTask(e.target.value)}
                          />
                          <ImHammer2
                            onClick={() => handleEditTask(item._id, task._id)}
                          />
                          <FcCancel onClick={() => setEditSelected(false)} />
                        </div>
                      ) : (
                        <p>{task.name}</p>
                      )}
                      <div>
                        {editSelected !== task._id && (
                          <>
                            <MdOutlineModeEditOutline
                              className="hover:text-red-300 cursor-pointer text-xs sm:text-sm"
                              onClick={() => setEditSelected(task._id)}
                            />
                            <MdIncompleteCircle
                              className="hover:text-red-300 cursor-pointer text-xs sm:text-sm"
                              onClick={() => deleteTask(item._id, task._id)}
                            />
                          </>
                        )}
                      </div>
                    </li>
                  ))}
                  <li className="text-gray-100 border-b border-gray-700 pt-2 flex justify-between items-center text-xs sm:text-sm">
                    <input
                      type="text"
                      placeholder="Enter task name"
                      value={newTaskName}
                      onChange={handleNewTaskChange}
                      className="border-none bg-gray-800 text-gray-100 flex-1"
                    />
                    <IoAdd onClick={() => handleIoAddClick(item._id)} />
                  </li>
                </ul>
              </div>
              <MdDeleteOutline
                className="text-xl ml-4 mb-2  text-red-600 transform transition-transform hover:scale-110 hover:text-gray-100"
                onClick={() => deleteList(item._id)}
              />
            </div>
          ))}
        </div>
      ) : (
        <div>Please choose your board . If choosen then create lists</div>
      )}
    </div>
  );
}

export default MainList;

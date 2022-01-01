import { useDispatch, useSelector } from "react-redux";
import Task from "./Task";

import { addTask, getTask } from "../actions/index";
import { useEffect, useState } from "react";
import axios from "axios";

const Todo = () => {
  const myTasks = useSelector((state) => state.change);
  const selectedBoard = useSelector((state) => state.changeBoardState);

  useEffect(() => {
    if (selectedBoard !== null) {
      getTasks();
    }
  }, [selectedBoard]);

  const dispatch = useDispatch();

  const [showDialog, setshowDialog] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [newTask, setnewTask] = useState({
    title: "",
    description: "",
    completed: false,
  });

  const getTasks = async () => {
    setisLoading(!isLoading);
    const response = await axios.get(`/api/v1/todo/${selectedBoard}`);
    dispatch(getTask(response.data.tasks.tasks));
    setisLoading(false);
  };

  const getCompletedTasksLength = () => {
    const l = myTasks.filter((element) => element.completed === false).length;
    return l;
  };

  const addNewTask = async () => {
    const response = await axios.post(`/api/v1/todo`, {
      task: newTask.title,
      description: newTask.description,
      board: selectedBoard,
    });
    dispatch(addTask(response.data.task));
    // console.log(selectedBoard);
    setshowDialog(!showDialog);
    setnewTask({
      title: "",
      description: "",
      completed: false,
    });
  };

  return (
    <div className="flex flex-col my-5 mx-3 w-8/12 min-h-full bg-[#f5fafb] rounded-lg py-5">
      <h2 className="m-4 text-3xl">To do</h2>

      {selectedBoard === null ? (
        <h1 className="mx-auto my-6 animate-bounce text-xl text-red-500">
          Please select board to view tasks
        </h1>
      ) : (
        <div
          className="h-12 w-11/12 mx-auto bg-[#dff3f3] hover:bg-[#c1ecec] rounded-lg text-center flex items-center justify-center cursor-pointer"
          onClick={() => {
            setshowDialog(!showDialog);
            // dispatch(addTask(newTask))
          }}
        >
          <p>Add Task</p>
        </div>
      )}

      {isLoading ? (
        <div className="mx-auto my-8">
          <div className=" mx-auto mt-5 h-20 w-20 border-b-2 border-black animate-spin rounded-full"></div>
          <p className="mx-auto my-6">Loading... Please wait</p>
        </div>
      ) : (
        <div></div>
      )}
      {getCompletedTasksLength() === 0 &&
      !isLoading &&
      selectedBoard !== null ? (
        <div className="flex flex-col justify-center items-center">
          <div class="mx-auto my-6 flex items-center justify-center h-12 w-12 rounded-full bg-green-200">
            <svg
              class="h-6 w-6 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          </div>
          <h2 className=" text-xl font-medium">All Done!! 🎉</h2>
          <p className=" my-3">
            Looks like you don't have any tasks left.{" "}
            <span
              className="text-blue-500 underline cursor-pointer"
              onClick={() => setshowDialog(!showDialog)}
            >
              Click here
            </span>{" "}
            to add one
          </p>
        </div>
      ) : !isLoading ? (
        myTasks.map((task, index) => {
          if (!task.completed) {
            return (
              <Task
                key={index}
                title={task.task}
                description={task.description}
                index={index}
                id={task.id}
              />
            );
          }
          return <div></div>;
        })
      ) : (
        <div></div>
      )}
      <div
        class={`fixed ${
          showDialog ? "" : "hidden"
        }  inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full`}
        id="my-modal"
      >
        <div class="relative top-20 mx-auto p-5 border w-6/12 shadow-lg rounded-md bg-white">
          <div class="mt-3 text-center">
            {/* <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
              <svg
                class="h-6 w-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            </div> */}
            <h3 class="text-2xl font-bold leading-6  text-gray-900">
              Add New Task
            </h3>
            <div class="mt-2 px-2 py-3 flex flex-col items-start">
              <label className="text-xl">Title</label>
              <input
                className="w-full border-2 rounded-lg p-3 my-4 focus:ring-red-300"
                type="text"
                value={newTask.title}
                onChange={(e) =>
                  setnewTask({
                    ...newTask,
                    title: e.target.value,
                  })
                }
              />

              <label className="text-xl">Description</label>
              <textarea
                className="w-full border-2 rounded-lg p-3 my-4 h-44 focus:ring-red-300"
                type="text"
                value={newTask.description}
                onChange={(e) =>
                  setnewTask({
                    ...newTask,
                    description: e.target.value,
                  })
                }
              />
            </div>
            <div class="flex items-center justify-between px-4 py-3">
              <button
                onClick={() => {
                  addNewTask();
                }}
                id="ok-btn"
                class="px-4 py-3 bg-green-500 text-white text-base font-medium rounded-lg w-5/12 shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
              >
                Add
              </button>
              <button
                onClick={() => setshowDialog(!showDialog)}
                id="ok-btn"
                class="px-4 py-3 bg-red-500 text-white text-base font-medium rounded-lg w-5/12  shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todo;

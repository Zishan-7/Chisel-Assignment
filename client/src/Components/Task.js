import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteTask, completeTask, editTask } from "../actions/index";

const Task = (props) => {
  const dispatch = useDispatch();

  const deleteOneTask = async () => {
    await axios.delete(`/api/v1/todo/${props.id}`);
    dispatch(deleteTask(props.index));
  };
  const completeOneTask = async () => {
    await axios.put(`/api/v1/todo/${props.id}`, {
      completed: true,
    });
    dispatch(completeTask(props.index));
  };

  const editoneTask = async () => {
    await axios.put(`/api/v1/todo/${props.id}`, {
      task: newData.task,
      description: newData.description,
    });

    dispatch(
      editTask({
        index: props.index,
        task: newData.task,
        description: newData.description,
      })
    );
    setshowDialog(false);
  };

  const [newData, setnewData] = useState({
    task: props.title,
    description: props.description,
  });

  const [showDialog, setshowDialog] = useState(false);

  return (
    <div className="w-11/12 min-h-48 bg-white mx-auto rounded-lg my-5 shadow-md flex flex-col p-3 ">
      <div className="flex justify-between items-start">
        <h1 className="text-3xl">{props.title}</h1>
        {/* <h1 className="text-3xl ">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </h1> */}
        <button
          className="text-lg hover:underline"
          onClick={() => setshowDialog(!showDialog)}
        >
          Edit{" "}
        </button>
      </div>
      <p className="mt-4">{props.description}</p>
      <div className=" w-full flex justify-between">
        <button
          className="my-5  bg-emerald-500 hover:bg-emerald-600 p-3 rounded-lg text-white"
          onClick={() => completeOneTask()}
        >
          Mark as completed
        </button>
        <button
          className="my-5  bg-red-600 hover:bg-red-700 p-3 rounded-lg text-white"
          onClick={() => deleteOneTask()}
        >
          Delete Task
        </button>
      </div>

      {/* Dialog  */}

      <div
        class={`fixed ${
          showDialog ? "" : "hidden"
        }  inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full`}
        id="my-modal"
      >
        <div class="relative top-20 mx-auto p-5 border w-6/12 shadow-lg rounded-md bg-white">
          <div class="mt-3 text-center">
            <h3 class="text-2xl font-bold leading-6  text-gray-900">
              Edit Task
            </h3>
            <div class="mt-2 px-2 py-3 flex flex-col items-start">
              <label className="text-xl">Title</label>
              <input
                className="w-full border-2 rounded-lg p-3 my-4 focus:ring-red-300"
                type="text"
                value={newData.task}
                onChange={(e) =>
                  setnewData({
                    ...newData,
                    task: e.target.value,
                  })
                }
              />

              <label className="text-xl">Description</label>
              <textarea
                className="w-full border-2 rounded-lg p-3 my-4 h-44 focus:ring-red-300"
                type="text"
                value={newData.description}
                onChange={(e) =>
                  setnewData({
                    ...newData,
                    description: e.target.value,
                  })
                }
              />
            </div>
            <div class="flex items-center justify-between px-4 py-3">
              <button
                onClick={() => {
                  editoneTask();
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

export default Task;

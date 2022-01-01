import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addBoard,
  changeBoard,
  initializeBoards,
  deleteBoard,
} from "../actions";
import { ReactComponent as Delete } from "../assets/Delete.svg";

const Sidebar = () => {
  useEffect(() => {
    getBoards();
  }, []);
  const selected = useSelector((state) => state.changeBoardState);

  const dispatch = useDispatch();

  const [showAdd, setshowAdd] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [boardName, setboardName] = useState("");

  let newBoard = {
    boardName,
  };

  const myBoards = useSelector((state) => state.boardData);

  const getBoards = async () => {
    setisLoading(true);
    const response = await axios.get(`/api/v1/board`);
    dispatch(initializeBoards(response.data.boards));
    setisLoading(false);
  };

  const addNewBoard = async () => {
    const response = await axios.post(`/api/v1/board`, newBoard);
    dispatch(addBoard(response.data.board));
    setshowAdd(!showAdd);
    setboardName("");
  };

  const deleteOneBoard = async (id, index) => {
    await axios.delete(`/api/v1/board/${id}`);
    dispatch(deleteBoard(index));
  };

  return (
    <div className="h-screen w-3/12 border-r-2 flex flex-col py-7 px-3 overflow-scroll sticky top-0">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold mb-6">Boards</h1>
        <button
          onClick={() => setshowAdd(!showAdd)}
          className="mb-6 px-7 py-1 bg-[#dff3f3] rounded-lg"
        >
          Add
        </button>
      </div>

      {isLoading ? (
        <p className="mx-auto animate-pulse text-2xl">Loading...</p>
      ) : (
        <div></div>
      )}

      {myBoards.map((board, index) => {
        return (
          <div
            className={`flex  justify-between text-xl p-2 ${
              selected === board.id ? "bg-[#dff3f3]" : ""
            } rounded-lg  px-7 cursor-pointer my-2`}
          >
            <p
              className="w-5/6"
              onClick={() => dispatch(changeBoard(board.id))}
            >
              {" "}
              {board.boardName}
            </p>

            <Delete
              className="w-4 z-50"
              onClick={() => deleteOneBoard(board.id, index)}
            />
          </div>
        );
      })}
      {showAdd ? (
        <div
          class={`fixed
    inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full`}
          id="my-modal"
        >
          <div class="relative top-20 mx-auto p-5 border w-4/12 shadow-lg rounded-md bg-white">
            <div class="mt-3 text-center">
              <h3 class="text-2xl font-bold leading-6  text-gray-900">
                Add Board
              </h3>
              <div class="mt-2 px-2 py-3 flex flex-col items-start">
                <label className="text-xl">Board Name</label>
                <input
                  className="w-full border-2 rounded-lg p-3 my-4 focus:ring-red-300"
                  type="text"
                  value={boardName.title}
                  onChange={(e) => setboardName(e.target.value)}
                />
              </div>
              <div class="flex items-center justify-between px-4 py-3">
                <button
                  onClick={() => {
                    // dispatch(addBoard(newBoard));
                    // setshowAdd(!showAdd);
                    // setboardName("");
                    addNewBoard();
                  }}
                  id="ok-btn"
                  class="px-4 py-3 bg-green-500 text-white text-base font-medium rounded-lg w-5/12 shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
                >
                  Add
                </button>
                <button
                  onClick={() => setshowAdd(!showAdd)}
                  id="ok-btn"
                  class="px-4 py-3 bg-red-500 text-white text-base font-medium rounded-lg w-5/12  shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Sidebar;

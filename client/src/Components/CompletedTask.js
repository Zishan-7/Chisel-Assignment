import axios from "axios";
import { useDispatch } from "react-redux";
import { deleteTask } from "../actions/index";
import { ReactComponent as Delete } from "../assets/Delete.svg";

const CompletedTask = (props) => {
  const dispatch = useDispatch();

  const deleteOneTask = async () => {
    await axios.delete(`/api/v1/todo/${props.id}`);
    dispatch(deleteTask(props.index));
  };

  return (
    <div className="w-11/12 min-h-48 bg-white mx-auto rounded-lg my-5 shadow-md flex flex-col p-3">
      <div className="w-full flex justify-between items-start">
        <h1 className="text-2xl">{props.title}</h1>
        <Delete className="w-4 cursor-pointer " onClick={deleteOneTask} />
      </div>
      <p className="mt-4 w-[21vw] truncate">{props.description}</p>
      <div className=" w-full flex justify-between">
        {/* <button
          className="my-5  bg-red-600 p-3 rounded-lg text-white"
          onClick={() => dispatch(deleteTask(props.index))}
        >
          Delete Task
        </button> */}
      </div>
    </div>
  );
};

export default CompletedTask;

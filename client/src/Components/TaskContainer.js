import Completed from "./Completed";
import Todo from "./Todo";

const TaskContainer = () => {
  return (
    <div className="h-full w-screen flex flex-col mx-4 my-7 ">
      <h1 className="text-3xl font-bold ">Tasks</h1>
      <div className="flex h-full">
        <Todo />
        <Completed />
      </div>
    </div>
  );
};

export default TaskContainer;

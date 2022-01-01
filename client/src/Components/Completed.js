import CompletedTask from "./CompletedTask";
import { useSelector } from "react-redux";
const Completed = () => {
  const myTasks = useSelector((state) => state.change);

  return (
    <div className="flex flex-col my-5 mx-3 w-4/12 h-2/4 bg-[#f5fafb] rounded-lg py-3">
      <h2 className="m-4 text-3xl">Completed</h2>

      {myTasks.map((task, index) => {
        if (task.completed) {
          return (
            <CompletedTask
              key={index}
              title={task.task}
              description={task.description}
              index={index}
              id={task.id}
            />
          );
        }
        return <div></div>;
      })}
    </div>
  );
};

export default Completed;

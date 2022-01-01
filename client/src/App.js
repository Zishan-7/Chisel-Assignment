import "./App.css";
import Sidebar from "./Components/Sidebar";
import TaskContainer from "./Components/TaskContainer";

function App() {
  return (
    <div className="flex">
      <Sidebar />
      <TaskContainer />
    </div>
  );
}

export default App;

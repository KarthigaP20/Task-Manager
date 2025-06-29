import React from "react";
import { useNavigate } from "react-router-dom";
import TaskTable from "../components/TaskTable";

function Home({ tasks, setTasks }) {
  const navigate = useNavigate();

  return (
    <div>
      <h2>TASK MANAGEMENT</h2>
      
      {/* Center the Add Task button */}
      <div className="add-task-container">
        <button onClick={() => navigate("/add")}>Add Task</button>
      </div>

      <TaskTable tasks={tasks} setTasks={setTasks} />
    </div>
  );
}

export default Home;

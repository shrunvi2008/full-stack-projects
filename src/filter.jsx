import { useState } from "react";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");

  const addTask = () => {
    if (task.trim() === "") return;

    setTasks([...tasks, { text: task, completed: false }]);
    setTask("");
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const toggleComplete = (index) => {
    const updatedTasks = tasks.map((t, i) =>
      i === index ? { ...t, completed: !t.completed } : t
    );
    setTasks(updatedTasks);
  };

  // ✅ Filter Logic
  const filteredTasks = tasks.filter((t) => {
    if (filter === "active") return !t.completed;
    if (filter === "completed") return t.completed;
    return true;
  });

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>My To-Do List 📝</h1>

      <input
        type="text"
        placeholder="Enter a task..."
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />

      <button onClick={addTask}>Add</button>

      {/* ✅ Filter Buttons */}
      <div style={{ margin: "20px" }}>
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("active")} style={{ marginLeft: "10px" }}>
          Active
        </button>
        <button onClick={() => setFilter("completed")} style={{ marginLeft: "10px" }}>
          Completed
        </button>
      </div>

      <ul style={{ listStyle: "none" }}>
        {filteredTasks.map((t, index) => (
          <li key={index} style={{ margin: "10px" }}>
            <input
              type="checkbox"
              checked={t.completed}
              onChange={() => toggleComplete(index)}
            />

            <span
              style={{
                marginLeft: "10px",
                color: t.completed ? "green" : "black",
                fontWeight: t.completed ? "bold" : "normal",
              }}
            >
              {t.text}
            </span>

            <button onClick={() => deleteTask(index)} style={{ marginLeft: "10px" }}>
              🗑️
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
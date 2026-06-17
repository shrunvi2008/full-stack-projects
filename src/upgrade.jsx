import { useState, useEffect } from "react";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });
  const [filter, setFilter] = useState("all");

  // 🌙 Dark Mode
  const [darkMode, setDarkMode] = useState(false);

  // 🔴 Priority
  const [priority, setPriority] = useState("medium");

  const addTask = () => {
    if (task.trim() === "") return;

    setTasks([...tasks, { text: task, completed: false, priority }]);
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

  // 💾 LocalStorage Save
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // 🔍 Filter Logic
  const filteredTasks = tasks.filter((t) => {
    if (filter === "active") return !t.completed;
    if (filter === "completed") return t.completed;
    return true;
  });

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "50px",
        backgroundColor: darkMode ? "#121212" : "#ffffff",
        color: darkMode ? "#ffffff" : "#000000",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <h1>My To-Do List 📝</h1>

      {/* 🌙 Dark Mode Button */}
      <button onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "Light Mode ☀️" : "Dark Mode 🌙"}
      </button>

      <br /><br />

      <input
        type="text"
        placeholder="Enter a task..."
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />

      {/* 🔴 Priority Dropdown */}
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        style={{ marginLeft: "10px" }}
      >
        <option value="high">High 🔴</option>
        <option value="medium">Medium 🟡</option>
        <option value="low">Low 🟢</option>
      </select>

      <button onClick={addTask} style={{ marginLeft: "10px" }}>
        Add
      </button>

      {/* 🔘 Filter Buttons */}
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

            {/* 🔴 Priority Indicator */}
            <span style={{ marginLeft: "10px" }}>
              {t.priority === "high" && "🔴"}
              {t.priority === "medium" && "🟡"}
              {t.priority === "low" && "🟢"}
            </span>

            <button
              onClick={() => deleteTask(index)}
              style={{ marginLeft: "10px" }}
            >
              🗑️
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
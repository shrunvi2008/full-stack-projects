import { useState, useEffect } from "react";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });
  const [filter, setFilter] = useState("all");
  const [priority, setPriority] = useState("medium");
  const [searchTerm, setSearchTerm] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedText, setEditedText] = useState("");
  const [dueDate, setDueDate] = useState("");
const addTask = () => {
  if (task.trim() === "") return;

  setTasks([
    ...tasks,
    {
      text: task,
      completed: false,
      priority,
      dueDate,
    },
  ]);

  setTask("");
  setDueDate("");
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
  const saveEdit = (index) => {
  if (editedText.trim() === "") return;

  const updatedTasks = tasks.map((task, i) =>
    i === index
      ? { ...task, text: editedText }
      : task
  );

  setTasks(updatedTasks);
  setEditingIndex(null);
  setEditedText("");
};

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const filteredTasks = tasks.filter((t) => {
  const matchesSearch = t.text
    .toLowerCase()
    .includes(searchTerm.toLowerCase());

  if (filter === "active")
    return !t.completed && matchesSearch;

  if (filter === "completed")
    return t.completed && matchesSearch;

  return matchesSearch;
});

  const completedCount = tasks.filter((t) => t.completed).length;
  const totalCount = tasks.length;
  const progress = totalCount === 0 ? 0 : (completedCount / totalCount) * 100;

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1> Task Management System </h1>

      <div style={{ width: "80%", margin: "20px auto" }}>
        <div
          style={{
            height: "10px",
            backgroundColor: "#ddd",
            borderRadius: "5px",
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              height: "100%",
              backgroundColor: "green",
              borderRadius: "5px",
            }}
          ></div>
        </div>
        <p>
          {completedCount} / {totalCount} Tasks Completed
        </p>
      </div>

      <input
        type="text"
        placeholder="Enter a task..."
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <input
  type="date"
  value={dueDate}
  onChange={(e) => setDueDate(e.target.value)}
  style={{ marginLeft: "10px" }}
/>

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
      <input
  type="text"
  placeholder="🔍 Search tasks..."
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
  style={{
    marginLeft: "10px",
    padding: "5px",
  }}
/>

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

            {editingIndex === index ? (
  <>
    <input
      value={editedText}
      onChange={(e) => setEditedText(e.target.value)}
      style={{ marginLeft: "10px" }}
    />

    <button
      onClick={() => saveEdit(index)}
      style={{ marginLeft: "5px" }}
    >
      Save
    </button>
  </>
) : (
  <span
    style={{
      marginLeft: "10px",
      color: t.completed ? "green" : "black",
      fontWeight: t.completed ? "bold" : "normal",
    }}
  >
    {t.text}
  </span>
)}

            <span style={{ marginLeft: "10px" }}>
              {t.priority === "high" && "🔴"}
              {t.priority === "medium" && "🟡"}
              {t.priority === "low" && "🟢"}
            </span>
            {t.dueDate && (
  <span
    style={{
      marginLeft: "10px",
      color: "gray",
      fontSize: "14px",
    }}
  >
    📅 {t.dueDate}
  </span>
)}
            <button
  onClick={() => {
    setEditingIndex(index);
    setEditedText(t.text);
  }}
  style={{ marginLeft: "10px" }}
>
  ✏️
</button>

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
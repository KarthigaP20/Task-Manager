import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function TaskTable({ tasks, setTasks }) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const tasksPerPage = 3;

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleSort = (key) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        return { key, direction: prev.direction === "asc" ? "desc" : "asc" };
      } else {
        return { key, direction: "asc" };
      }
    });
  };

  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedTasks = sortConfig.key
    ? [...filteredTasks].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      })
    : filteredTasks;

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = sortedTasks.slice(indexOfFirstTask, indexOfLastTask);
  const totalPages = Math.ceil(sortedTasks.length / tasksPerPage);

  const handleDelete = (indexToDelete) => {
    const updatedTasks = tasks.filter((_, index) => index !== indexToDelete);
    setTasks(updatedTasks);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search by title or description..."
        value={searchQuery}
        onChange={handleSearchChange}
        style={{ marginBottom: "10px", padding: "5px", width: "250px" }}
      />

      <table border="1" cellPadding="10" cellSpacing="0" width="80%">
        <thead>
          <tr>
            <th>S.NO</th>
            <th onClick={() => handleSort("title")} style={{ cursor: "pointer" }}>
              Title {sortConfig.key === "title" ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}
            </th>
            <th>Description</th>
            <th onClick={() => handleSort("status")} style={{ cursor: "pointer" }}>
              Status {sortConfig.key === "status" ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentTasks.length === 0 ? (
            <tr>
              <td colSpan="5">No tasks found</td>
            </tr>
          ) : (
            currentTasks.map((task, idx) => {
              const actualIndex = tasks.indexOf(task);
              return (
                <tr key={actualIndex}>
                  <td>{actualIndex + 1}</td>
                  <td>{task.title}</td>
                  <td>{task.description}</td>
                  <td>{task.status}</td>
                  <td>
                    <button onClick={() => navigate(`/edit/${actualIndex}`)}>Edit</button>{" "}
                    <button
                      className="delete-button"
                      onClick={() => handleDelete(actualIndex)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>

      {totalPages > 1 && (
        <div style={{ marginTop: "10px" }}>
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Previous
          </button>{" "}
          <span>Page {currentPage} of {totalPages}</span>{" "}
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default TaskTable;

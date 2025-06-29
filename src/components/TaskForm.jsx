import React from "react";

function TaskForm({
  title,
  setTitle,
  description,
  setDescription,
  status,
  setStatus,
  handleSubmit,
  buttonLabel
}) {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label>Description:</label>
        <textarea
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <label>Status:</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
      <br />
      <button type="submit">{buttonLabel}</button>
    </form>
  );
}

export default TaskForm;

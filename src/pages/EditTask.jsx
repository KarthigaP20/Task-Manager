import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditTask({ tasks, setTasks }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const index = parseInt(id);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Pending");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (tasks && tasks[index]) {
      setTitle(tasks[index].title);
      setDescription(tasks[index].description);
      setStatus(tasks[index].status);
    } else {
      navigate("/");
    }
  }, [index, tasks, navigate]);

  const validateForm = () => {
    const newErrors = {};
    if (!title.trim()) {
      newErrors.title = "Title is required";
    } else if (title.trim().length < 3) {
      newErrors.title = "Title must be at least 3 characters";
    } else if (title.trim().length > 50) {
      newErrors.title = "Title must be less than 50 characters";
    }

    if (!description.trim()) {
      newErrors.description = "Description is required";
    } else if (description.trim().length < 5) {
      newErrors.description = "Description must be at least 5 characters";
    } else if (description.trim().length > 200) {
      newErrors.description = "Description must be less than 200 characters";
    }

    if (!status) {
      newErrors.status = "Status is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const updatedTask = {
      title: title.trim(),
      description: description.trim(),
      status,
    };
    const updatedTasks = [...tasks];
    updatedTasks[index] = updatedTask;
    setTasks(updatedTasks);
    navigate("/");
  };

  return (
    <div>
      <h2>Edit Task</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title: </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {errors.title && <p style={{ color: "red" }}>{errors.title}</p>}
        </div>
        <div>
          <label>Description: </label>
          <textarea
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          {errors.description && <p style={{ color: "red" }}>{errors.description}</p>}
        </div>
        <div>
          <label>Status: </label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
          {errors.status && <p style={{ color: "red" }}>{errors.status}</p>}
        </div>
        <br />
        <button type="submit">Update Task</button>
      </form>
    </div>
  );
}

export default EditTask;

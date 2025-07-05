import { useEffect, useState } from "react";
import { auth } from "./firebase";

export default function Todo() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [sharedEmails, setSharedEmails] = useState(""); // ✅ New State
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [editId, setEditId] = useState(-1);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const apiUrl = "http://localhost:8000";
  const user = auth.currentUser;

  const handleLogout = () => {
    auth.signOut();
    window.location.href = "/";
  };

  // ✅ Submit a new Todo
  const handleSubmit = () => {
    setError("");
    if (title.trim() && description.trim() && user) {
      fetch(`${apiUrl}/todos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          status: "pending",
          userEmail: user.email,
          sharedWith: sharedEmails
            ? sharedEmails.split(",").map((email) => email.trim())
            : []
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            setTodos([...todos, data]);
            setTitle("");
            setDescription("");
            setSharedEmails(""); // ✅ clear shared emails
            setMessage("Item Added Successfully");
            setTimeout(() => setMessage(""), 3000);
          } else {
            setError("Unable to create Todo item");
          }
        })
        .catch(() => setError("Unable to create Todo item"));
    }
  };

  useEffect(() => {
    if (user) getItems();
  }, [user]);

  // ✅ Fetch todos
  const getItems = () => {
    fetch(`${apiUrl}/todos?email=${user.email}`)
      .then((res) => res.json())
      .then((res) => setTodos(res))
      .catch(() => setError("Failed to fetch todos"));
  };

  const handleEdit = (item) => {
    setEditId(item._id);
    setEditTitle(item.title);
    setEditDescription(item.description);
  };

  const handleUpdate = () => {
    setError("");
    if (editTitle.trim() && editDescription.trim()) {
      fetch(`${apiUrl}/todos/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: editTitle,
          description: editDescription,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            const updatedTodos = todos.map((item) =>
              item._id === editId
                ? { ...item, title: editTitle, description: editDescription }
                : item
            );
            setTodos(updatedTodos);
            setEditId(-1);
            setEditTitle("");
            setEditDescription("");
            setMessage("Item updated Successfully");
            setTimeout(() => setMessage(""), 3000);
          } else {
            setError("Unable to update Todo item");
          }
        })
        .catch(() => setError("Unable to update Todo item"));
    }
  };

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete?")) return;
    fetch(`${apiUrl}/todos/${id}`, { method: "DELETE" })
      .then((res) => {
        if (res.ok) {
          setTodos(todos.filter((item) => item._id !== id));
          setMessage("Item deleted successfully");
          setTimeout(() => setMessage(""), 3000);
        } else {
          setError("Unable to delete Todo item");
        }
      })
      .catch(() => setError("Unable to delete Todo item"));
  };

  const handleToggleStatus = (id, currentStatus) => {
    const newStatus = currentStatus === "pending" ? "completed" : "pending";
    fetch(`${apiUrl}/todos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    })
      .then((res) => res.json())
      .then((data) => {
        const updated = todos.map((item) =>
          item._id === id ? { ...item, status: newStatus } : item
        );
        setTodos(updated);
      });
  };

  const handleEditCancel = () => {
    setEditId(-1);
  };

  return (
    <>
      {/* Header */}
      <div className="p-3 bg-success text-light d-flex justify-content-between align-items-center">
        <h1 className="m-0">TODO LIST</h1>
        {user && (
          <div className="d-flex align-items-center gap-3">
            <span className="fw-bold">👤 {user.displayName}</span>
            <button className="btn btn-danger btn-sm" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </div>

      {/* Add Item */}
      <div className="row mt-4 px-3">
        <h3>Add Item</h3>
        {message && <p className="text-success">{message}</p>}
        <div className="form-group d-flex gap-2 flex-wrap">
          <input
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            className="form-control"
            type="text"
          />
          <input
            placeholder="Description"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            className="form-control"
            type="text"
          />
          <input
            placeholder="Share with (comma-separated emails)"
            onChange={(e) => setSharedEmails(e.target.value)}
            value={sharedEmails}
            className="form-control"
            type="text"
          />
          <button className="btn btn-dark" onClick={handleSubmit}>
            Submit
          </button>
        </div>
        {error && <p className="text-danger mt-2">{error}</p>}
      </div>

      {/* Task List */}
      <div className="row mt-4 px-3">
        <h3>Tasks</h3>
        <ul className="list-group">
          {todos.map((item) => (
            <li
              key={item._id}
              className="list-group-item d-flex justify-content-between align-items-center my-2 bg-light"
            >
              <div className="d-flex flex-column w-50">
                {editId === item._id ? (
                  <div className="form-group d-flex gap-2 flex-wrap">
                    <input
                      placeholder="Title"
                      onChange={(e) => setEditTitle(e.target.value)}
                      value={editTitle}
                      className="form-control"
                      type="text"
                    />
                    <input
                      placeholder="Description"
                      onChange={(e) => setEditDescription(e.target.value)}
                      value={editDescription}
                      className="form-control"
                      type="text"
                    />
                  </div>
                ) : (
                  <>
                    <span
                      className={`fw-bold ${
                        item.status === "completed" ? "text-decoration-line-through" : ""
                      }`}
                    >
                      {item.title}
                    </span>
                    <span
                      className={item.status === "completed" ? "text-decoration-line-through" : ""}
                    >
                      {item.description}
                    </span>
                    <span
                      className={`badge mt-1 ${
                        item.status === "completed" ? "bg-success" : "bg-warning text-dark"
                      }`}
                    >
                      {item.status}
                    </span>
                    {item.sharedWith && item.sharedWith.length > 0 && (
                      <small className="text-muted mt-1">
                        Shared with: {item.sharedWith.join(", ")}
                      </small>
                    )}
                  </>
                )}
              </div>
              <div className="d-flex gap-2 flex-wrap">
                <button
                  className={`btn btn-sm ${
                    item.status === "completed" ? "btn-secondary" : "btn-success"
                  }`}
                  onClick={() => handleToggleStatus(item._id, item.status)}
                >
                  {item.status === "completed" ? "Mark In Progress" : "Mark Complete"}
                </button>
                {editId === item._id ? (
                  <>
                    <button className="btn btn-success btn-sm" onClick={handleUpdate}>
                      Update
                    </button>
                    <button className="btn btn-secondary btn-sm" onClick={handleEditCancel}>
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button className="btn btn-warning btn-sm" onClick={() => handleEdit(item)}>
                      Edit
                    </button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(item._id)}>
                      Delete
                    </button>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

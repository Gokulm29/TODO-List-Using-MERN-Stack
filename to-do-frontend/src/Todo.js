import { useEffect, useState } from "react";

export default function Todo() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [todos, setTodos] = useState([]);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [editId, setEditId] = useState(-1);
    const [editTitle, setEditTitle] = useState("");
    const [editDescription, setEditDescription] = useState("");

    const apiUrl = "http://localhost:8000";

    // Add a new task
    const handleSubmit = () => {
        setError("");
        if (title.trim() && description.trim()) {
            fetch(`${apiUrl}/todos`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title, description })
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data) {
                        setTodos([...todos, data]);
                        setTitle("");
                        setDescription("");
                        setMessage("Item Added Successfully");
                        setTimeout(() => setMessage(""), 3000);
                    } else {
                        setError("Unable to create Todo item");
                    }
                })
                .catch(() => setError("Unable to create Todo item"));
        }
    };

    // Fetch todos from API
    useEffect(() => {
        getItems();
    }, []);

    const getItems = () => {
        fetch(`${apiUrl}/todos`)
            .then((res) => res.json())
            .then((res) => setTodos(res));
    };

    // Handle Edit Button Click
    const handleEdit = (item) => {
        setEditId(item._id);
        setEditTitle(item.title);
        setEditDescription(item.description);
    };

    // Handle Update Button Click
    const handleUpdate = () => {
        setError("");
        if (editTitle.trim() && editDescription.trim()) {
            fetch(`${apiUrl}/todos/${editId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title: editTitle, description: editDescription })
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data) {
                        const updatedTodos = todos.map((item) =>
                            item._id === editId ? { ...item, title: editTitle, description: editDescription } : item
                        );
                        setTodos(updatedTodos);
                        setEditTitle("");
                        setEditDescription("");
                        setMessage("Item updated Successfully");
                        setTimeout(() => setMessage(""), 3000);
                        setEditId(-1);
                    } else {
                        setError("Unable to update Todo item");
                    }
                })
                .catch(() => setError("Unable to update Todo item"));
        }
    };

    // Handle Delete Button Click with confirmation alert
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

    // Handle Cancel Edit
    const handleEditCancel = () => {
        setEditId(-1);
    };

    return (
        <>
            <div>
                
            </div>
            <div className="row p-3 bg-success text-light">
                <h1>TODO project with MERN stack</h1>
            </div>

            <div className="row">
                <h3>Add Item</h3>
                {message && <p className="text-success">{message}</p>}
                <div className="form-group d-flex gap-2">
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
                    <button className="btn btn-dark" onClick={handleSubmit}>Submit</button>
                </div>
                {error && <p className="text-danger">{error}</p>}
            </div>

            <div className="row mt-3">
                <h3>Tasks</h3>
                <ul className="list-group">
                    {todos.map((item) => (
                        <li key={item._id} className="list-group-item bg-info d-flex justify-content-between align-items-center my-2">
                            <div className="d-flex flex-column me-2">
                                {editId === item._id ? (
                                    <div className="form-group d-flex gap-2">
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
                                        <span className="fw-bold">{item.title}</span>
                                        <span>{item.description}</span>
                                    </>
                                )}
                            </div>
                            <div className="d-flex gap-2">
                                {editId === item._id ? (
                                    <>
                                        <button className="btn btn-success" onClick={handleUpdate}>Update</button>
                                        <button className="btn btn-danger" onClick={handleEditCancel}>Cancel</button>
                                    </>
                                ) : (
                                    <>
                                        <button className="btn btn-warning" onClick={() => handleEdit(item)}>Edit</button>
                                        <button className="btn btn-danger" onClick={() => handleDelete(item._id)}>Delete</button>
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
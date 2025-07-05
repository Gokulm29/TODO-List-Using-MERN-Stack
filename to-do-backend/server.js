require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Connection
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/mern-app';
mongoose.connect(mongoURI)
    .then(() => console.log('✅ MongoDB Connected'))
    .catch(err => console.error('❌ MongoDB Connection Error:', err));

// ✅ Updated Todo Schema (includes status & sharedWith)
const todoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    userEmail: { type: String, required: true },
    status: { type: String, enum: ['pending', 'completed'], default: 'pending' },
    sharedWith: [String] // ✅ NEW: array of email IDs the task is shared with
});

const Todo = mongoose.model('Todo', todoSchema);

// 🟢 Create a new Todo
app.post('/todos', async (req, res) => {
    try {
        const { title, description, userEmail, status, sharedWith } = req.body;
        if (!title || !description || !userEmail) {
            return res.status(400).json({ error: "Title, description, and userEmail are required" });
        }

        const newTodo = new Todo({
            title,
            description,
            userEmail,
            status: status || 'pending',
            sharedWith: sharedWith || []
        });

        await newTodo.save();
        res.status(201).json(newTodo);
    } catch (error) {
        console.error('Error in POST /todos:', error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// 🟡 Get todos for a user (owned or shared)
app.get('/todos', async (req, res) => {
    try {
        const { email } = req.query;
        if (!email) return res.status(400).json({ error: "Missing user email in query" });

        const todos = await Todo.find({
            $or: [
                { userEmail: email },
                { sharedWith: email }
            ]
        }).sort({ title: 1 });

        res.json(todos);
    } catch (error) {
        console.error('Error in GET /todos:', error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// 🔵 Update Todo (title, description, status, sharedWith)
app.put('/todos/:id', async (req, res) => {
    try {
        const { title, description, status, sharedWith } = req.body;
        const update = {};
        if (title) update.title = title;
        if (description) update.description = description;
        if (status) update.status = status;
        if (sharedWith) update.sharedWith = sharedWith;

        const updatedTodo = await Todo.findByIdAndUpdate(
            req.params.id,
            update,
            { new: true }
        );

        if (!updatedTodo) {
            return res.status(404).json({ error: "Todo not found" });
        }

        res.json(updatedTodo);
    } catch (error) {
        console.error('Error in PUT /todos:', error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// 🔴 Delete a Todo
app.delete('/todos/:id', async (req, res) => {
    try {
        const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
        if (!deletedTodo) {
            return res.status(404).json({ error: "Todo not found" });
        }

        res.json({ message: "Todo deleted successfully" });
    } catch (error) {
        console.error('Error in DELETE /todos:', error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// ✅ Toggle Status Only (optional route)
app.patch('/todos/:id/status', async (req, res) => {
    try {
        const { status } = req.body;
        if (!['pending', 'completed'].includes(status)) {
            return res.status(400).json({ error: "Invalid status" });
        }

        const updatedTodo = await Todo.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );

        if (!updatedTodo) {
            return res.status(404).json({ error: "Todo not found" });
        }

        res.json(updatedTodo);
    } catch (error) {
        console.error('Error in PATCH /todos/:id/status:', error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});

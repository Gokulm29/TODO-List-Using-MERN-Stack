require('dotenv').config(); // Load environment variables
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json()); // Middleware to parse JSON
app.use(cors()); // Enable CORS

// MongoDB Connection
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/mern-app';
mongoose.connect(mongoURI)
    .then(() => console.log('✅ MongoDB Connected'))
    .catch(err => console.error('❌ MongoDB Connection Error:', err));

// Define Todo Schema
const todoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true }
});

// Create Todo Model
const Todo = mongoose.model('Todo', todoSchema);

// 🟢 Create a new Todo
app.post('/todos', async (req, res) => {
    try {
        const { title, description } = req.body;
        if (!title || !description) {
            return res.status(400).json({ error: "Title and description are required" });
        }

        const newTodo = new Todo({ title, description });
        await newTodo.save();
        res.status(201).json(newTodo);
    } catch (error) {
        console.error('Error in POST /todos:', error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// 🟡 Get all Todos
app.get('/todos', async (req, res) => {
    try {
        const todos = await Todo.find().sort({ title: 1 });
        res.json(todos);
    } catch (error) {
        console.error('Error in GET /todos:', error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// 🔵 Update a Todo
app.put('/todos/:id', async (req, res) => {
    try {
        const { title, description } = req.body;
        const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, { title, description }, { new: true });

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

// Start Server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});

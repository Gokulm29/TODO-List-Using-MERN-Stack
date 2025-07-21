# TODO List Web App (MERN Stack)

This is a feature-rich TODO List application built using the MERN stack. It supports:
- User authentication (Email/Password & Google Sign-in)
- Task management (Create, Edit, Delete)
- Filters (Due Today, Overdue, Priority, Status)
- Task sharing with other users
- Fully responsive UI

## 🔗 Live Demo
https://todo-list-using-mern-stack.vercel.app/

## 🚀 Features
- Google and Email/Password Authentication using Firebase
- Create, edit, delete and toggle task status
- Task filter (due today, overdue, priority, status)
- Firebase Authentication + MongoDB storage
- Responsive and clean UI using Bootstrap
- Secure backend using Node.js + Express.js

## 🛠️ Tech Stack
- React.js
- Node.js
- Express.js
- MongoDB (Mongoose)
- Firebase Authentication
- Vercel (Frontend Hosting)
- Render / Railway / Cyclic (Backend Hosting)

## 📸 Architecture Diagram
![image](https://github.com/user-attachments/assets/0f8d98a0-88ce-4367-badb-0442e8e9ef26)

Login page
![image](https://github.com/user-attachments/assets/8def286d-627f-4405-b648-7a7efe5cf73d)

TODO page
![image](https://github.com/user-attachments/assets/c26e31a2-b598-482c-bb13-92f0f66311c3)

## 📌 Assumptions
- The app assumes every task must belong to one user (userEmail is mandatory)
- All tasks created via Google login are scoped only to that user's email
- Priority defaults to "low" unless set manually
- Shared task functionality allows read-only visibility for now

## 🧪 Running Locally

### Backend
```bash
cd server
npm install
npm run dev

**cd client**
npm install
npm start

This project is a part of a hackathon run by
https://www.katomaran.com



**by Gokul M**

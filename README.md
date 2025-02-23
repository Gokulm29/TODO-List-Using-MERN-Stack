# TODO List Using MERN Stack

## Overview
This is a simple TODO List application built using the MERN (MongoDB, Express, React, Node.js) stack. The application allows users to create, update, and delete tasks efficiently.

## Features
- Add new tasks
- Mark tasks as completed
- Edit existing tasks
- Delete tasks
- Responsive UI

## Tech Stack
- **Frontend:** React.js, HTML, CSS, Bootstrap
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose ORM)

## Installation

### Prerequisites
Ensure you have the following installed:
- Node.js
- MongoDB

### Steps to Run the Project

#### Clone the Repository
```sh
git clone https://github.com/Gokulm29/TODO-List-Using-MERN-Stack.git
cd TODO-List-Using-MERN-Stack
```

#### Backend Setup
1. Navigate to the `backend` folder:
   ```sh
   cd backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file and add the following (modify as needed):
   ```env
   MONGO_URI=your_mongodb_connection_string
   PORT=5000
   ```
4. Start the backend server:
   ```sh
   npm start
   ```

#### Frontend Setup
1. Navigate to the `frontend` folder:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the React app:
   ```sh
   npm start
   ```

### Running the Application
Once both frontend and backend servers are running, open your browser and navigate to:
```
frontend:
http://localhost:3000
backend:
http://localhost:8000
```

## API Endpoints
### Task Management
| Method | Endpoint      | Description          |
|--------|--------------|----------------------|
| GET    | `/tasks`     | Fetch all tasks      |
| POST   | `/tasks`     | Create a new task    |
| PUT    | `/tasks/:id` | Update a task        |
| DELETE | `/tasks/:id` | Delete a task        |

## Screenshots
![image](https://github.com/user-attachments/assets/e87beed6-3b3b-4a81-aab6-2b77c6dfbf6c)

![image](https://github.com/user-attachments/assets/039cc3c2-b726-4daf-9b54-8573add267fe)

![image](https://github.com/user-attachments/assets/a8257a52-306f-4237-8109-d6e9088c8c62)

![image](https://github.com/user-attachments/assets/ae8644b7-c9da-4cd5-aedf-672147160f21)


## Deployment
You can deploy the application using:
- Frontend: Vercel / Netlify
- Backend: Render / Heroku
- Database: MongoDB Atlas

## Contributing
Feel free to fork this repository and contribute by submitting a pull request.

## License
This project is licensed under the MIT License.

---

Happy Coding! 🚀

##GOKUL M - AI & DS


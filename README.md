# ProLearn Platform 🎓

A full-stack E-Learning platform built with the MERN stack (MongoDB, Express, React, Node.js). This platform allows users to browse courses, enroll, and track their progress, while administrators can manage course content.

![ProLearn Home Page](./frontend/src/assets/home.png) 
[ProLearn Home Page](./frontend/src/assets/home1.png) 
[ProLearn Home Page](./frontend/src/assets/signin.png) 
[ProLearn Home Page](./frontend/src/assets/signup.png) 
[ProLearn Home Page](./frontend/src/assets/userdashboard.png) 


## 🚀 Features

*   **Authentication**: Secure User Registration & Login (JWT & bcrypt).
*   **Role-Based Access Control (RBAC)**:
    *   **Admin**: Create, update, and manage courses.
    *   **User**: Browse courses, view details, and enroll.
*   **Course Management**: Create courses with details like price, thumbnail, and description.
*   **Enrollment System**: Users can enroll in courses and view them in their personal dashboard.
*   **Responsive UI**: Built with React, Vite, and Tailwind CSS for a modern, mobile-friendly design.
*   **RESTful API**: Robust backend API for managing data.

## 🛠️ Tech Stack

**Frontend:**
*   React.js
*   Vite
*   Tailwind CSS
*   Axios
*   React Router DOM

**Backend:**
*   Node.js
*   Express.js
*   MongoDB (Mongoose)
*   JWT (JSON Web Tokens)
*   Bcryptjs

## 📂 Project Structure

This project uses a **monorepo** structure:

*   `/frontend`: React application
*   `/backend`: Node.js/Express API

## 🏁 Getting Started

### Prerequisites
*   Node.js (v14+ recommended)
*   MongoDB Account (Atlas) or local instance

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/prolearn-platform.git
    cd prolearn-platform
    ```

2.  **Install Dependencies** (Root, Frontend, and Backend)
    ```bash
    npm install
    npm run install:all
    ```

3.  **Environment Configuration**

    *   **Backend**: Create `backend/.env`
        ```env
        PORT=5000
        MONGO_URI=your_mongodb_connection_string
        JWT_SECRET=your_strong_secret_key
        ```

    *   **Frontend**: Create `frontend/.env` (for local development)
        ```env
        VITE_API_URL=http://localhost:5000
        ```

### Running Locally

1.  **Start the Backend**
    ```bash
    npm run start:backend
    # Runs on http://localhost:5000
    ```

2.  **Start the Frontend** (in a new terminal)
    ```bash
    npm run start:frontend
    # Runs on http://localhost:5173
    ```

## 🌍 Deployment

See the [DEPLOYMENT.md](./DEPLOYMENT.md) file for detailed step-by-step instructions on how to deploy:
*   **Backend**: Render
*   **Frontend**: Vercel
** Demo**: https://elearning-platform.vercel.app/

## 🤝 Contributing

Contributions are welcome! Please fork the repository and create a pull request.

## 📄 License

This project is licensed under the MIT License.

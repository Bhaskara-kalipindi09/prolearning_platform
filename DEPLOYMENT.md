# Deployment Guide for ProLearn Platform

## 1. Push to GitHub

First, create a repository named `prolearn_platform` on GitHub if you haven't already.

Run these commands in your project root terminal:

```bash
# Initialize Git (if not done)
git init

# Add all files
git add .

# Commit your changes
git commit -m "Initial commit - ProLearn Platform"

# Link to your GitHub repo (Replace YOUR_USERNAME with your actual GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/prolearn_platform.git

# Push to GitHub
git push -u origin master
```

---

## 2. Deploy Backend (Render)

We will use **Render** (render.com) for the backend because it's free and supports Node.js well.

1.  **Sign up/Login** to [Render](https://dashboard.render.com/).
2.  Click **"New +"** -> **"Web Service"**.
3.  Connect your GitHub account and select the `prolearn_platform` repository.
4.  **Configure the service:**
    *   **Name:** `prolearn-backend`
    *   **Root Directory:** `backend` (Important!)
    *   **Runtime:** Node
    *   **Build Command:** `npm install`
    *   **Start Command:** `node index.js`
5.  **Environment Variables** (Scroll down to "Environment Variables"):
    *   Key: `MONGO_URI` | Value: (Paste your connection string from `.env`)
    *   Key: `JWT_SECRET` | Value: (Paste your secret from `.env`)
    *   Key: `PORT` | Value: `10000` (Render uses this port)
6.  Click **"Create Web Service"**.
7.  **Copy the URL** provided by Render (e.g., `https://prolearn-backend.onrender.com`). You will need this for the frontend!

---

## 3. Deploy Frontend (Vercel)

We will use **Vercel** for the frontend as it's optimized for React/Vite.

1.  **Prepare Frontend for Production:**
    *   In your code, you currently fetch data from `http://localhost:5000`. You need to change this to your new Backend URL.
    *   **Best Practice:** Create a file `frontend/.env.production`:
        ```
        VITE_API_URL=https://prolearn-backend.onrender.com
        ```
    *   Update your `axios` calls to use `import.meta.env.VITE_API_URL` instead of localhost.
2.  **Push these changes to GitHub.**
3.  **Sign up/Login** to [Vercel](https://vercel.com/).
4.  Click **"Add New..."** -> **"Project"**.
5.  Import your `prolearn_platform` repository.
6.  **Configure:**
    *   **Framework Preset:** Vite
    *   **Root Directory:** `frontend` (Click "Edit" and select the frontend folder).
7.  **Environment Variables:**
    *   Name: `VITE_API_URL` | Value: `https://prolearn-backend.onrender.com` (Your Render Backend URL)
8.  Click **"Deploy"**.

**Congratulations! Your ProLearn Platform is now live!**

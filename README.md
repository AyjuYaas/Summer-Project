# TheraFind: Therapist Recommendation System

**By:** Sayujya Satyal

---

## 📝 Overview

TheraFind is a **Therapist Recommendation System** designed to help users find the most suitable therapists based on their specific mental health concerns. The system uses **Machine Learning (ML)** to identify problems from user input and recommends therapists accordingly. It also facilitates communication between users and therapists.

---

## ✨ Key Features

- **Therapist Recommendation**: Recommends therapists based on user input and preferences.
- **Problem Identification using ML**: Utilizes machine learning to analyze and identify mental health concerns from user descriptions.
- **Communication with Therapist**: Enables seamless communication between users and therapists.

---

## 🛠️ Technologies Used

- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Machine Learning**: Flask, Python (Pandas, Scikit-learn, TensorFlow, Pickle)
- **Database**: MongoDB

---

### Step 1: Clone the Repository

Clone or download the project repository:

```bash
git clone https://github.com/AyjuYaas/Summer-Project.git
cd Summer-Project
```

---

### Step 2: Set Up the Frontend

1.  Navigate to the `frontend` directory:

    ```bash
    cd frontend
    ```

2.  Install dependencies:

    ```bash
    npm install
    ```

3.  Start the development server:

    ```bash
    npm run dev
    ```

4.  The frontend will be running at `http://localhost:5173` (or another port if specified).

---

### Step 3: Set Up the Backend (Node.js)

1. Open up a new terminal under the same Summer-Project directory

1. Navigate to the `backend` directory:

   ```bash
   cd ./backendNode
   ```

1. Rename `.env.example` to `.env` and fill in the required environment variables:

   ```bash
   mv .env.example .env
   ```

1. Install dependencies:

   ```bash
   npm install
   ```

1. Start the backend server:

   ```bash
   npm run dev
   ```

1. The backend will be running at `http://localhost:5000`.

---

### Step 4: Set Up the Flask ML Backend

1. Open up a new terminal under the same Summer-Project directory

1. Navigate to the `backendFlask` directory:

   ```bash
   cd ./backEndFlask
   ```

1. Install the required Python packages:

   ```bash
   pip install pandas scikit-learn tensorflow pickle
   ```

1. Start the Flask server:

   ```bash
   python app.py
   ```

1. The Flask server will be running at `http://localhost:5001`.

---

### Step 5: Set Up MongoDB

1.  Ensure MongoDB is installed and running on your system.
2.  Update the `MONGODB_URI` in the `.env` file to point to your MongoDB instance.

---

## 🔧 Environment Variables

### Node.js Backend (`.env`)

- PORT=5000
- MONGO_URL=mongodb://127.0.0.1:27017/TheraFind
- JWT_SECRET=your_jwt_secret
- NODE_ENV=production
- CLOUDINARY_CLOUD_NAME=Your_Cloudinary_Cloud_Name
- CLOUDINARY_API_KEY=Your_Cloudinary_API_KEY
- CLOUDINARY_API_SECRET=Your_Cloudinary_API_SECRET
- FLASK_URL=http://127.0.0.1:5002/predict

---

## 📧 Contact

For questions or feedback, feel free to reach out:

- **Email**: [021bim054@sxc.edu.np](https://mailto:021bim054@sxc.edu.np)
- **Email**: [sayujya57@gmail.com](https://mailto:sayujya57@gmail.com)
- **GitHub**: [Sayujya Satyal](https://github.com/AyjuYaas)

---

Enjoy using **TheraFind**! 🌟

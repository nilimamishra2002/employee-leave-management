🏢 Employee Leave Management System

A full-stack web application designed to automate employee leave requests, approvals, and tracking for small to mid-sized organizations.

This system provides role-based access for employees and managers, ensuring transparency, accuracy, and efficiency in leave management.

📌 Project Overview

The Employee Leave Management System simplifies the process of applying for and managing employee leaves by replacing manual workflows with a secure, centralized platform.

It supports:

Leave request submission

Manager approval workflows

Automatic leave balance tracking

Role-based dashboards

Designed for organizations with approximately 50 employees, the system is scalable and production-ready.

🎯 Key Objectives

Automate leave request and approval processes

Maintain accurate, user-specific leave balances

Provide managers with a centralized overview of leave activity

Ensure secure authentication and authorization

Improve transparency and operational efficiency

🚀 Features
🔐 User Authentication

Secure login and registration

Role-based access:

Employee

Manager

Session-based authentication using Passport.js

📝 Leave Request Submission (Employee)

Apply for leave with:

Leave type (Vacation / Sick)

Start date and end date

Optional reason

Input validation for accurate data

✅ Leave Approval Workflow (Manager)

View all pending leave requests

Approve or reject leave requests

Add optional manager comments

Real-time status updates

📊 Leave Balance Management

Yearly leave allocation:

Vacation Leave: 36 days

Sick Leave: 12 days

Leave balances are:

Maintained per employee

Automatically updated after approval

Employees can view:

Total leaves

Used leaves

Remaining balance

📅 Leave Tracking

Employees can track their approved leaves

Managers can view approved leaves of all employees

Leave status indicators:

Upcoming

Ongoing

Completed

👥 User Roles & Permissions
👤 Employee

Login / Logout

Apply for leave

View leave history

Track yearly leave balance

View approved leave calendar

👔 Manager

Login / Logout

View pending leave requests

Approve / Reject requests

Add approval comments

Track approved leaves across employees

🛠️ Technology Stack
Frontend

React.js (Vite)

Bootstrap (minimal UI styling)

Axios for API communication

Backend

Node.js

Express.js

Passport.js (session-based authentication)

Database

MongoDB Atlas (Cloud Database)

Deployment

Render (Backend + Frontend)

MongoDB Atlas for persistent storage

🧱 System Architecture
Frontend (React)
      ↓
REST APIs (Axios)
      ↓
Backend (Node.js + Express)
      ↓
MongoDB Atlas


Frontend handles UI & validation

Backend manages authentication, authorization, and business logic

Database stores users, leave requests, and balances

🔗 API Overview (High-Level)
Authentication

Register user

Login user

Logout user

Fetch logged-in user details

Leave Management

Apply for leave

View employee leave history

View pending leave requests (Manager)

Approve leave

Reject leave

View approved leaves

⚙️ Installation & Setup (Local)
Prerequisites

Node.js (v18+ recommended)

MongoDB Atlas account

1️⃣ Clone the repository
git clone https://github.com/your-username/employee-leave-management.git
cd employee-leave-management

2️⃣ Backend Setup
npm install


Create a .env file in the backend folder:

MONGO_URI=your_mongodb_atlas_uri
SESSION_SECRET=your_secure_random_string


Start the backend:

node backend/app.js

3️⃣ Frontend Setup
cd frontend
npm install
npm run dev

🌐 Deployment

Backend + Frontend deployed on Render

MongoDB Atlas used for cloud database

👉 Deployed Application:
https://employee-leave-management-0yia.onrender.com/


🧠 Challenges Faced & Solutions
Challenge: User-specific leave balances

Solution:
Leave balances are stored per user in the database and updated only after manager approval.

Challenge: Session handling after deployment

Solution:
Implemented secure session-based authentication with proper CORS and cookie configuration.

Challenge: Role-based access control

Solution:
Role checks are enforced at both backend API level and frontend routing level.


📌 Conclusion

The Employee Leave Management System demonstrates a complete full-stack implementation with real-world features such as authentication, authorization, approval workflows, and stateful data management.

It reflects practical experience in building secure, scalable, and maintainable web applications.

👩‍💻 Author

Nilima
Software Development Apprentice / Trainee Candidate
Full-Stack Web Development

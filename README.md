Employee Leave Management System

A full-stack web application to manage employee leave requests, approvals, and leave balances with role-based access for employees and managers.

✨ Features:

->Secure authentication (Employee & Manager roles)

->Apply for leave (Vacation / Sick)

->Manager approval & rejection with comments

->Automatic leave balance tracking

->Employee & Manager dashboards

->Approved leave tracking across organization

👥 Roles:
Employee:

->Apply for leave

-?View leave history

->Track yearly leave balance

->View approved leave calendar

Manager:

->View pending leave requests

->Approve / Reject requests

->Add optional comments

->Track approved leaves of all employees

🛠 Tech Stack:

Frontend:

->React (Vite)

->Bootstrap

->Axios

->Backend

->Node.js

->Express.js

->Passport.js (Session-based auth)

->Database

  -MongoDB Atlas

->Deployment

  -Render

🧱 Architecture
React (Frontend) -> Express REST APIs -> MongoDB Atlas

⚙️ Setup (Local)
git clone https://github.com/your-username/employee-leave-management.git
cd employee-leave-management
npm install


Create .env file:

MONGO_URI=your_mongodb_uri
SESSION_SECRET=your_secret_key


Run:

node backend/app.js

🌐 Links

Live App: https://employee-leave-management-0yia.onrender.com/

GitHub Repo: https://github.com/nilimamishra2002/employee-leave-management


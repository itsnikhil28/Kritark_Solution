👨‍💼 Kritark Solution – Smart Employee Management System
🌟 Overview

Kritark Solution is a modern Employee Management System built with Laravel + React (Inertia.js).
It simplifies daily HR operations — from attendance tracking to payroll — all within one intuitive dashboard.

Designed for companies that value efficiency, transparency, and data-driven workforce management, Kritark bridges the gap between teams and technology.

“A complete digital workspace for managing employees, tracking performance, and automating HR workflows.”

⚙️ Core Features
👥 Employee Profiles

Centralized management of employee details, roles, and documents.

⏰ Attendance Tracking

Monitor employee attendance and total working hours with real-time accuracy.

🗓️ Leave Management

Simplify leave requests, approvals, and balance tracking.

📊 Performance Reviews

Evaluate employee performance through metrics, reviews, and task progress.

💸 Payroll Integration

Automated payroll calculation and payslip generation with month-wise reports.

🛡️ Secure Authentication

Role-based access for Admins and Employees with protected routes.

🧰 Tech Stack
Layer	                    Technology
Backend	                  Laravel 12 (REST + Inertia)
Frontend	                React + Inertia.js + Tailwind CSS + ShadCN/UI
Database	                MySQL (via Eloquent ORM)
Charts & Reports	        Chart.js + DOMPDF + Maatwebsite Excel
Authentication	          Laravel Breeze + Sanctum
Build Tools	              Vite + PostCSS + Autoprefixer
Alerts & UI Enhancements	Lucide React Icons
🚀 Getting Started

    1️⃣ Clone the Repository
    git clone https://github.com/itsnikhil28/kritark_solution.git
    cd kritark-solution
    
    2️⃣ Install Dependencies
    composer install
    npm install
    
    3️⃣ Configure Environment
    cp .env.example .env
    php artisan key:generate
    
    
    Then update your .env file with database credentials and run:
    
    php artisan migrate --seed
    
    4️⃣ Run the Application
    npm run dev
    php artisan serve


Visit http://localhost:8000

🧱 System Modules
Module	            Description
Dashboard	          Centralized control for Admin and Employee analytics
Employees    	      Add, edit, and manage employee information
Attendance  	      Track presence, working hours, and late logs
Leaves      	      Apply, approve, or reject leave requests
Salary Management	  Generate monthly salaries with deductions or advances
Performance Metrics	Visual reports on productivity and utilization
Notifications	      Task updates, leave approvals, and payroll alerts

🧩 Dynamic Dashboards

Admin Dashboard → Salary trends, department utilization, upcoming milestones

Employee Dashboard → Task progress, attendance summary, monthly salary insights

Charts & Reports → Auto-generated from dynamic backend data

🔐 Security & Roles

Employee and Admin logins with restricted access

Session-based authentication (Sanctum)

Encrypted IDs with Hashids

CSRF & route protection

📄 License

Licensed under the MIT License — open for personal and organizational use.

🧠 About Kritark Solution

Kritark Solution is designed to make workforce management smarter and faster.
It combines powerful backend automation with a seamless React frontend — making HR processes efficient, transparent, and data-driven.

Empowering organizations with real-time insights, performance tracking, and payroll automation — all in one place.

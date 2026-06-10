# 🎫 Helpdesk Ticketing System

A Full Stack Role-Based Helpdesk Ticketing System built using React.js, Spring Boot, and PostgreSQL.

The application enables tenants to raise support requests, staff members to manage and resolve tickets, and administrators to oversee operations through role-based access control. It provides ticket tracking, status management, ticket history, customer feedback, and dashboard analytics in a centralized platform.

---

## 🚀 Features

- JWT Authentication & Authorization
- Role-Based Access Control (Admin, Staff, Tenant)
- Tenant Registration & Login
- Admin Staff Management
- Ticket Creation & Tracking
- Ticket Status Management
- Ticket History & Audit Trail
- Feedback & Rating System
- Dashboard Analytics
- Search & Filter Tickets
- Responsive User Interface

---

## 🛠️ Tech Stack

### Frontend
- React.js

### Backend
-Java Spring Boot

### Database
- PostgreSQL

### Security
- JWT Authentication
- Role-Based Access Control (RBAC)

---

## ⚙️ How to Run

1. Clone the repository.

```bash
git clone https://github.com/vigneshprabhu171/Helpdesk-Ticketing-System.git
```

2. Configure PostgreSQL and update the database credentials in:

 ```text
backend/src/main/resources/application.properties
```

3. Start the backend server.

```bash
cd backend
mvn spring-boot:run
```

4. Start the frontend application.

```bash
cd frontend
npm install
npm run dev
```

5. Open the application in your browser.

```text
http://localhost:5173
```

---

## 👤 Demo Credentials

### Admin

```text
Email    : admin@helpdesk.com
Password : admin123
```

### Staff

```text
Email    : staff1@helpdesk.com
Password : staff123
```

### Tenant

```text
Email    : vignesh@gmail.com
Password : tenant123
```

---

## 🔄 Ticket Workflow

```text
OPEN
  ↓
IN_PROGRESS
  ↓
RESOLVED
  ↓
CLOSED
  ↓
REOPENED (Optional)
```

---


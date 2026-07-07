
# 🚀 Bhavya Portfolio CMS

<div align="center">

### Modern Full Stack Developer Portfolio with a Secure Admin Dashboard

A production-ready portfolio platform built with **React**, **Node.js**, **Express.js**, **MySQL**, **Prisma ORM**, and **Cloudinary**.

[![Live Demo](https://img.shields.io/badge/🌐%20Live%20Demo-bhavyafolio.vercel.app-blue?style=for-the-badge)](https://bhavyafolio.vercel.app/)
[![Backend](https://img.shields.io/badge/API-Render-success?style=for-the-badge)](https://bhavya-portfolio-xyoq.onrender.com)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-black?style=for-the-badge&logo=github)](https://github.com/BhavyaAgrawa12/Bhavya-Portfolio)

![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=flat-square&logo=mysql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=flat-square&logo=prisma&logoColor=white)
![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=flat-square&logo=cloudinary&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-Authentication-orange?style=flat-square)

</div>

---

## 📖 Overview

**Bhavya Portfolio CMS** is a full-stack portfolio management system that combines a modern developer portfolio with a secure content management system.

Instead of editing source code whenever portfolio information changes, every section can be managed through a protected admin dashboard. The platform supports dynamic updates for projects, skills, education, experience, certifications, achievements, media assets, and resume management.

---

## 🎯 Why This Project?

Most portfolio websites are completely static. This project was built to solve that limitation by providing a secure CMS where content can be managed through an intuitive dashboard while visitors always see the latest portfolio information.

---

## 🌐 Live Links

| Service | Link |
|---------|------|
| Portfolio | https://bhavyafolio.vercel.app/ |
| Backend API | https://bhavya-portfolio-xyoq.onrender.com |
| GitHub Repository | https://github.com/BhavyaAgrawa12/Bhavya-Portfolio |

---

# ✨ Features

## Public Portfolio

- Responsive Design
- Dynamic Portfolio Content
- About Section
- Skills Showcase
- Experience Timeline
- Education
- Projects
- Certifications
- Achievements
- Resume Download
- Contact Section
- Fast Loading UI

## Admin Dashboard

- Secure Login
- JWT Authentication
- Manage Personal Information
- Manage Projects
- Manage Skills
- Manage Experience
- Manage Education
- Manage Certifications
- Manage Achievements
- Upload Images
- Resume Management
- Dynamic Content Updates

---

# 🔒 Admin Access

The project includes a dedicated **Admin Dashboard** for managing portfolio content.

For security reasons, **the admin dashboard is NOT publicly accessible**.

Only authorized users with valid authentication credentials can access administrative routes. All protected endpoints require JWT-based authentication.

---

# 🏗 Architecture

| Layer | Technology |
|--------|------------|
| Frontend | React + Vite |
| Backend | Node.js + Express.js |
| Database | Railway MySQL |
| ORM | Prisma ORM |
| Authentication | JWT |
| Media Storage | Cloudinary |
| Frontend Hosting | Vercel |
| Backend Hosting | Render |

---

# ☁ Infrastructure

### Database

All structured application data is stored in a **MySQL database hosted on Railway**.

Managed data includes:

- Personal Information
- Projects
- Skills
- Experience
- Education
- Certifications
- Achievements
- Resume Metadata

Prisma ORM is used for database access and schema management.

### Media Storage

All uploaded assets are stored securely using **Cloudinary**.

Media includes:

- Profile Images
- Project Images
- Skill Icons
- Certification Images
- Achievement Images
- Resume Files

Cloudinary provides optimized storage and fast media delivery.

---

# 🛠 Tech Stack

### Frontend

- React
- Vite
- React Router
- JavaScript
- CSS

### Backend

- Node.js
- Express.js

### Database

- MySQL
- Prisma ORM

### Cloud

- Railway
- Render
- Vercel
- Cloudinary

---

# 📁 Project Structure

```text
Bhavya-Portfolio/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── prisma/
│   ├── controllers/
│   ├── middleware/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   └── package.json
│
└── README.md
```

---

# ⚙ Installation

```bash
git clone https://github.com/BhavyaAgrawa12/Bhavya-Portfolio.git
cd Bhavya-Portfolio
```

Install dependencies:

```bash
cd frontend
npm install
```

```bash
cd ../backend
npm install
```

---

# 🔑 Environment Variables

Create a `.env` file inside the backend folder.

```env
DATABASE_URL=

JWT_SECRET=

CLOUDINARY_CLOUD_NAME=

CLOUDINARY_API_KEY=

CLOUDINARY_API_SECRET=

PORT=5000
```

---

# 🗃 Prisma

```bash
npx prisma generate
npx prisma migrate deploy
```

---

# ▶ Running Locally

Backend

```bash
npm run dev
```

Frontend

```bash
npm run dev
```

---

# 🔐 Security

- JWT Authentication
- Protected Routes
- Secure API Access
- Cloud-based Media Storage
- Server-side Validation

---

# 🚀 Highlights

- Full Stack Architecture
- Dynamic Portfolio CMS
- Railway MySQL Database
- Prisma ORM
- Cloudinary Integration
- RESTful APIs
- Responsive UI
- Production Deployment

---

# 🛣 Roadmap

- Visitor Analytics
- Blog Module
- Theme Switcher
- SEO Improvements
- Email Notifications
- Performance Optimizations

---

# 🤝 Contributing

Contributions, issues, and feature requests are welcome.

Please fork the repository and open a Pull Request for improvements.

---

# 📄 License

This project is licensed under the MIT License.

---

# 👨‍💻 Author

**Bhavya Agrawal**

- Portfolio: https://bhavyafolio.vercel.app/
- GitHub: https://github.com/BhavyaAgrawa12

If you like this project, consider giving it a ⭐ on GitHub.

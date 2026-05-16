# 🔬 Academic Research Lab Institutional Site

A modern, high-performance institutional portal and management dashboard designed for Academic Research Laboratories. Built with the **MERN Stack**, this platform centralizes the management of research teams, scientific publications, ongoing projects, and lab news, providing a seamless experience for both the public and laboratory administrators.

test website :
https://incredible-caramel-a35490.netlify.app/

## ✨ Key Features

### 🏛️ Public Portal
* **Research Output Showcase:** Dynamic digital library to explore the lab's scientific projects and publications.
* **Citation Exporter:** One-click generation of **APA** and **BibTeX** citations for any publication, ready to copy to the clipboard.
* **Bilingual & RTL Support:** Full support for both English and Arabic languages with automatic Right-to-Left (RTL) layout switching.
* **Modern UI/UX:** Highly responsive, mobile-first design powered by Tailwind CSS and Framer Motion for smooth animations and a premium look.

### 🔐 Leader Dashboard (Admin Panel)
* **Strict Role-Based Access Control (RBAC):** Three distinct roles (`Superadmin`, `Admin`, `User`) ensuring secure data handling. Admins can only manage their specific assigned Research Teams.
* **Team & Member Management:** Organize the laboratory into specific scientific divisions, assign leaders, and group members.
* **PhD Progress Tracker:** A visual timeline for students and supervisors to track the status of academic documents and thesis progress.
* **Content Management:** Create and manage news articles and media galleries linked to specific projects or teams.

## 🛠️ Technology Stack

* **Frontend:** React.js (Vite), Tailwind CSS, Framer Motion, Lucide Icons.
* **Backend:** Node.js, Express.js.
* **Database:** MongoDB (Mongoose ORM).
* **Authentication:** JSON Web Tokens (JWT).
* **Emails/Notifications:** Nodemailer (with terminal mock fallback).

## 🏗️ Architecture (MCR)

The backend follows a robust **Model-Controller-Route** architecture:
* `Models`: Defines MongoDB schemas (User, Team, Project, Publication, News, etc.).
* `Controllers`: Contains the business logic, JWT validation, and Role/Team-based data filtering.
* `Routes`: Handles API endpoints and maps them to the respective controllers using protected middleware.

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) and [Git](https://git-scm.com/) installed on your machine. You will also need a MongoDB database (Local or Atlas).

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Lafdal-walid/Academic-research-lab-institutional-Site.git
   cd Academic-research-lab-institutional-Site

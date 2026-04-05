# 📘 Social Media Backend API

A scalable backend REST API built with **Node.js, Express, TypeScript, and MongoDB (Mongoose)**.  
This project implements authentication, posts, comments (with replies), and a like system similar to a social media platform.

---

# 🚀 Features

## 🔐 Authentication & Authorization
- User registration (first name, last name, email, password)
- User login with JWT
- Protected routes using JWT middleware

## 📝 Posts
- Create posts with text
- Support for image (optional)
- Public & private posts
- Feed shows:
  - Public posts
  - User’s own private posts
- Latest posts appear first

## 💬 Comments & Replies
- Add comments on posts
- Nested replies (comment → reply)
- Fetch comments with replies

## ❤️ Like System
- Like / Unlike posts and comments
- Prevent duplicate likes
- Retrieve users who liked a post/comment

## 🔒 Security
- JWT-based authentication
- Password hashing using bcrypt
- Protected API endpoints

---

# 🏗️ Tech Stack

- **Backend:** Node.js, Express.js
- **Language:** TypeScript
- **Database:** MongoDB
- **ODM:** Mongoose
- **Authentication:** JWT
- **Architecture:** Modular (Feature-based)

---

# 📁 Project Structure


# Base URL
* http://localhost:5000/api

* Register User
* POST /auth/register
* POST /auth/login


| Feature        | Method | Endpoint              |
|----------------|--------|----------------------|
| Register       | POST   | /auth/register       |
| Login          | POST   | /auth/login          |
| Create Post    | POST   | /posts               |
| Get Feed       | GET    | /posts               |
| Comment        | POST   | /comments            |
| Get Comments   | GET    | /comments/:postId    |
| Like Toggle    | POST   | /likes               |
| Get Likes      | GET    | /likes               |
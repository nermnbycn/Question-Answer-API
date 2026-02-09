# ❓ Question Answer API

This project is a RESTful API for a Question & Answer platform built with Node.js, Express and MongoDB.

Users can register, login, ask questions, answer questions, like/unlike question / answer and reset their passwords via email.

## ✨ Features

- User Authentication with JWT  
- Edit and delete questions / answers
- Ask question
- Answer questions  
- Like and undo like questions / answers  
- Forgot / Reset password system  
- Admin operations  
- MongoDB integration  
- MVC architecture

This project follows MVC architecture. Models handle database schemas, Controllers manage business logic, and Routes connect requests to controllers. Since the project is API-based, responses are returned as JSON instead of traditional views.

## 🛠 Technologies

- Node.js  
- Express.js  
- MongoDB (Mongoose)  
- JWT  
- Nodemailer  
- Postman  

---

## ⚙️ Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/nrmnbycn/Question-Answer-Api.git
cd Question-Answer-Api
npm install
```
Create a .env file and add your MongoDB Atlas connection string:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_url
JWT_SECRET_KEY=your_secret_key
SMTP_USER=your_email
SMTP_PASS=your_app_password
```
Start the development server:
```bash
npm run dev
```

## How to Get SMTP_PASS (Gmail)

- Go to your Google Account
- Open Security
- Enable 2-Step Verification
- Click App Passwords
- Create a new app password
- Select Mail and Other
- Copy the generated password
- Paste it into SMTP_PASS
- Example:
```env
   SMTP_PASS=abcd efgh ijkl mnop
```

## API Examples
##### 🔐 User Registration

<img width="622" height="567" alt="register" src="https://github.com/user-attachments/assets/4c82cdc7-d07c-419a-a798-b53d09b4487d" />

Registers a new user and returns a JWT access token.

### 🔑 User Log-in

<img width="622" height="561" alt="login" src="https://github.com/user-attachments/assets/9573f969-9583-4db7-a016-2bae0866e3b0" />

Users can log in by sending their email and password. If the credentials are correct, the API returns a JWT access token.

### ❓ Ask Question

<img width="621" height="566" alt="askquestion" src="https://github.com/user-attachments/assets/a5af1b63-c4a1-4393-96f0-6f2d6edc4c9f" />

Only logged-in users can create questions. The token must be sent in the Authorization header.

### ✍️ Answer a Question

<img width="624" height="564" alt="answer" src="https://github.com/user-attachments/assets/7c7aaccd-ba5c-4c4b-9bc0-27caa288b533" />

Authenticated users can submit an answer to an existing question.
This endpoint allows users to contribute by replying to questions.

### ❤️ Like a Question

<img width="598" height="556" alt="likequestion" src="https://github.com/user-attachments/assets/62c7e297-a5ee-4e2f-9cb8-e66b206b339f" />

Authenticated users can like a question.
This feature allows users to support and highlight useful questions.


### 🔐 Validation Errors

<img width="623" height="563" alt="register2" src="https://github.com/user-attachments/assets/2af957ff-13c3-4ccc-873c-59a4ebecf583" />

If required fields are missing in a request, the API returns a validation error with an appropriate message.

### 🔐 Check Password

<img width="622" height="568" alt="checkpassword" src="https://github.com/user-attachments/assets/b17ae345-a628-46e7-b5f7-6925a311ec5e" />


## 📌 Project Purpose

The goal of this project is to improve backend skills by building a scalable REST API with authentication, database relations, and secure user operations.











# ❓ Question Answer API

This project is a RESTful API for a Question & Answer platform built with Node.js, Express and MongoDB.

Users can register, login, ask questions, answer questions, like/unlike posts and reset their passwords via email.

## Features

- User Authentication with JWT  
- Ask, edit and delete questions / answers
- Answer questions  
- Like and unlike questions / answers  
- Forgot / Reset password system  
- Admin operations  
- MongoDB integration  
- MVC architecture

This project follows MVC architecture. Models handle database schemas, Controllers manage business logic, and Routes connect requests to controllers. Since the project is API-based, responses are returned as JSON instead of traditional views.

## Technologies

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
MONGO_URI=your_mongodb_connection_url
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

```env
   Example:
   SMTP_PASS=abcd efgh ijkl mnop
```











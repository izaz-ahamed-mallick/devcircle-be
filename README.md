# DevCircle – Backend

DevCircle is a full-stack developer networking platform that helps developers connect, build professional relationships, explore developer profiles, and discover collaboration opportunities.

This repository contains the **backend REST API** for DevCircle. The frontend is maintained separately.

## 🌐 Live Application

[Visit DevCircle](https://devcircle.izazahamedmallick.co.in/)

## 🔗 Project Repositories

| Repository | Description |
| --- | --- |
| [devcircle-ui](https://github.com/izaz-ahamed-mallick/devcircle-ui) | React frontend application |
| [devcircle-be](https://github.com/izaz-ahamed-mallick/devcircle-be) | Node.js and Express backend (this repository) |

## ✨ Backend Features

- **Authentication** – User registration, login, and logout using JWT-based authentication stored in cookies.
- **Email Verification** – Email verification and resend-verification functionality.
- **Password Recovery** – Forgot-password flow, OTP verification, and password reset.
- **Profile Management** – Fetch and update profile information and change passwords.
- **Developer Discovery** – Retrieve the developer feed and user information.
- **Connection Management** – Send connection requests and manage request statuses.
- **Connection Lists** – Retrieve accepted connections and rejected users.
- **Subscription Payments** – Create Razorpay orders and retrieve payment status.
- **Payment Webhooks** – Handle Razorpay webhook events and verify webhook signatures.
- **Email Delivery** – Send transactional emails using Amazon Simple Email Service (AWS SES).
- **Request Protection** – Authentication middleware, input validation, and rate limiting for selected endpoints.

## 🛠️ Tech Stack

| Technology | Purpose |
| --- | --- |
| Node.js | JavaScript runtime |
| Express.js 5 | REST API framework |
| MongoDB | NoSQL database |
| Mongoose | MongoDB object modeling |
| JSON Web Token (JWT) | Authentication |
| bcrypt | Password hashing |
| cookie-parser | Reading authentication cookies |
| CORS | Cross-origin resource sharing |
| express-rate-limit | Rate limiting |
| Razorpay | Subscription payment integration |
| AWS SDK for JavaScript (SES) | Transactional email delivery |
| Validator | Input validation |

## 📁 Project Structure

```text
src/
├── config/          # Database, payment, email and plan configuration
├── controller/      # Authentication, verification and payment controllers
├── middleware/      # Authentication and rate-limiting middleware
├── models/          # Mongoose models
├── routers/         # API route definitions
├── services/        # Email and verification services
├── templates/       # Email templates
├── utils/           # Validation, token and response utilities
└── app.js            # Express application entry point
```

## ⚙️ Getting Started

### Prerequisites

- Node.js
- npm
- MongoDB database (local or hosted)
- Git

External integrations such as Razorpay and Amazon SES require their own credentials.

### 1. Clone the repository

```bash
git clone https://github.com/izaz-ahamed-mallick/devcircle-be.git
```

### 2. Navigate to the project directory

```bash
cd devcircle-be
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env` file in the project root:

```env
PORT=YOUR_PORT
DATABASE_URL=YOUR_MONGODB_CONNECTION_STRING
JWT_SECRET=YOUR_JWT_SECRET

# Frontend URL used in email verification links
FRONTEND_URL=http://localhost:5173

# Razorpay
RAZORPAY_API_KEY=YOUR_RAZORPAY_KEY_ID
RAZORPAY_SECRET_KEY=YOUR_RAZORPAY_SECRET
RAZORPAY_WEBHOOK_SECRET=YOUR_RAZORPAY_WEBHOOK_SECRET

# Amazon SES
AWS_REGION=YOUR_AWS_REGION
SES_FROM_EMAIL=YOUR_VERIFIED_SENDER_EMAIL
```

Configure AWS credentials using the AWS SDK's standard credential provider chain (for example, environment credentials or an IAM role). Do not commit real credentials or secrets to the repository.

### 5. Configure CORS

The current Express application allows the frontend origin `http://localhost:5173` in `src/app.js`. Update the CORS origin to match the frontend URL you are using, including your deployed frontend domain when deploying the backend.

### 6. Run the backend

Start the server:

```bash
npm start
```

The development script is also available:

```bash
npm run dev
```

The `dev` script uses Nodemon. Make sure Nodemon is installed in your development environment before running it.

## 🔌 API Overview

The API currently includes route groups for:

- Authentication and account recovery
- Profile retrieval and updates
- Developer feed and user information
- Connection requests and connection lists
- Razorpay order creation and payment status
- Razorpay webhook handling

See the files in `src/routers/` for the current route definitions and middleware.

## 💳 Payment Integration

DevCircle uses **Razorpay** to create subscription payment orders and process payment updates through webhooks.

The current project integration is being tested in **Razorpay Test Mode**. Configure the corresponding test credentials and webhook secret in your environment. Use live credentials only when ready for production and after completing the required Razorpay account setup.

## ✉️ Email Integration

Amazon Simple Email Service (AWS SES) is used for transactional email delivery, including account verification and password recovery-related emails.

Configure the AWS region, sender email, and AWS credentials before using email functionality. The sender identity must be verified in Amazon SES.

## 🔐 Security Notes

- Keep the `.env` file private and out of version control.
- Never expose JWT, database, Razorpay, or AWS secrets in frontend code or public repositories.
- Use HTTPS and production-specific CORS settings when deploying.
- Configure secure cookie settings appropriately for the production domain.

## 👨‍💻 Author

**Izaz Ahamed Mallick**  
Full-Stack Developer

- **GitHub:** [izaz-ahamed-mallick](https://github.com/izaz-ahamed-mallick)
- **LinkedIn:** [Izaz Ahamed Mallick](https://www.linkedin.com/in/izaz-ahamed-mallick/)

---

Explore the [live application](https://devcircle.izazahamedmallick.co.in/) and the [frontend repository](https://github.com/izaz-ahamed-mallick/devcircle-ui).

Feedback and suggestions are welcome!

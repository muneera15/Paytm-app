# PayTM App

## Live Preview

https://paytm-react.onrender.com

## Overview

This project is a simplified version of the PayTM application, built with a Node.js backend and React frontend. It provides basic functionalities such as user authentication, balance checking, and money transfers between users.

## Features

- User Signup
- User Signin
- View Balance
- Transfer Money
- User List Filtering

## Technologies Used

### Backend
- Node.js
- Express.js
- Mongoose (MongoDB)
- JWT for authentication
- Zod for validation

### Frontend
- React
- Axios for HTTP requests
- Tailwind CSS for styling

## Project Structure

### Backend

- `index.js`: Main entry point for the backend server.
- `db.js`: MongoDB connection and schema definitions.
- `routes`: Contains route handlers for users and account-related actions.
- `middleware.js`: Middleware functions including authentication.
- `config.js`: Configuration file for environment variables.

### Frontend

- `components`: Reusable UI components such as `Button`, `InputBox`, and `Appbar`.
- `pages`: Page components such as `Signup`, `Signin`, `Dashboard`, and `SendMoney`.
- `App.jsx`: Main application component with routing setup.

## API Endpoints

### User Endpoints

- `POST /api/v1/user/signup`: Signup a new user.
- `POST /api/v1/user/signin`: Signin an existing user.
- `POST /api/v1/user/update`: Update user details.
- `GET /api/v1/user/bulk`: Get a list of users with optional filtering.

### Account Endpoints

- `GET /api/v1/account/balance`: Get the balance of the authenticated user.
- `POST /api/v1/account/transfer`: Transfer money to another user's account.

## Usage

1. **Signup**: Create a new account by providing the required details.
2. **Signin**: Log in to your account using the credentials.
3. **Dashboard**: View your balance and other users.
4. **Transfer Money**: Initiate a money transfer to another user from the dashboard.

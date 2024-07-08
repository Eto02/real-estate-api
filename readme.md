# Real Estate API Application

## Introduction

This is a Real Estate API application built with Express.js and MongoDB. It provides endpoints to manage properties, user accounts, and other related operations. Additionally, the API includes real-time capabilities with Socket.io running on port 4000 for interactive features such as real-time chat and notifications.

## Features

- **Property Management:** CRUD operations for properties including listings, details, and locations.
- **User Authentication:** Secure endpoints with JWT authentication for user registration, login, and access control.
- **Search and Filtering:** API endpoints for searching properties based on various criteria such as location, price range, and property type.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Eto02/real-estate-api
   cd real-estate-api
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file based on `.env.example` and set your environment variables, including MongoDB connection URI and JWT secret.

4. Start the application:

   ```bash
   npm run dev
   ```

The application will be running on `http://localhost:8000`.

## API Documentation

For detailed API documentation, please refer to the [Postman Documentation](https://documenter.getpostman.com/view/36489656/2sA3e2e9Ep). This documentation includes descriptions of all available endpoints, request examples, and responses.

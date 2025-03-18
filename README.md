# Plant & Flower Selling Website - Backend

## Description

This is the backend for the **Plant & Flower Selling Website**, In this website admin and user privilages feature are added with authentication . customers can browse and purchase plants. The backend is built using **Node.js, Express.js, and MongoDB**.

## Features

- User authentication (JWT & Cookies)
- User registration and product management
- Plant and flower listing with categories
- Cart and order management
- Admin dashboard for moderation

## Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose ODM)
- **Authentication:** JSON Web Tokens (JWT), Cookies
- **Storage:** Cloudinary

## Installation

### Prerequisites

- Node.js & npm installed
- MongoDB (local or cloud database like MongoDB Atlas)

### Steps

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/plant-store-backend.git
   cd vatika_server
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up environment variables:
   Create a `.env` file in the root directory and add the following:
   ```env
   PORT=3000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```
4. Start the server:
   ```sh
   npm run dev
   ```
   The backend will run on `http://localhost:3000` by default.

## API Endpoints

| Method | Endpoint                      | Description                         |
| ------ | ----------------------------- | ----------------------------------- |
| POST   | `/api/auth/register`          | Register a new nursery              |
| POST   | `/api/auth/login`             | Login for nurseries & admins        |
| GET    | `/api/product/allProducts`    | Get all plants                      |
| POST   | `/api/product/create-product` | Add a new plant (Nursery only)      |
| PUT    | `/api/product/update/:id`     | Update plant details (Nursery only) |
| DELETE | `/api/product/delete/:id`     | Remove a plant (Nursery only)       |

## Contributing

Pull requests are welcome! Please open an issue before making major changes.

# Ecommerce Node.js API

This project is a comprehensive Node.js API designed to support ecommerce functionalities for both backend and frontend applications. It provides essential endpoints for managing products, handling user authentication, and facilitating ecommerce operations like listing products, filtering, searching, and managing shopping carts.

## Features

- **Product Management**: APIs for CRUD operations on products, including listing, adding, updating, and deleting products.
- **Category Management**: Endpoints for managing product categories.
- **User Authentication**: JWT-based authentication for user registration, login, and profile management.
- **Search and Filtering**: Endpoints to search for products based on keywords and filter products by various criteria.
- **Shopping Cart**: APIs to manage shopping carts, including adding items, updating quantities, and removing items.


## Technologies Used

- **Node.js**: Backend runtime environment.
- **Express.js**: Web application framework for Node.js, used for building the API endpoints.
- **MongoDB**: NoSQL database for storing product, order, and user data.
- **Mongoose**: MongoDB object modeling tool for Node.js, used for data modeling and schema validation.
- **JWT**: JSON Web Tokens for user authentication and authorization.


## Installation

1. Clone the repository:

    ```bash
    git clone <repository_url>
    ```

2. Navigate to the project directory:

    ```bash
    cd <project_directory>
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Set up environment variables:

    Create a `.env` file in the root directory and specify the following variables:

    ```plaintext
    PORT=3000
    MONGODB_URI=your_mongodb_uri
    JWT_SECRET=your_jwt_secret
    ```

## Usage

1. Start the server:

    ```bash
    npm start
    ```

2. The API endpoints will be accessible at `http://localhost:3000`.


## Author

[Hariom Nagar](https://github.com/hariom127)

For any inquiries or support, please contact [career.it20@gmail.com](mailto:career.it20@gmail.com).

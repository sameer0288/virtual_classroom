# Virtual Classroom Application

## Overview

This Virtual Classroom application allows administrators and instructors to manage classes, sessions, and lectures. It includes features for creating and managing classes, adding and viewing sessions, and participating in discussions.

## Features

- **Class Management**: Administrators can create, update, and delete classes.
- **Session Management**: Each class can have multiple sessions.
- **Lecture Management**: Sessions can include multiple lectures.
- **Discussion**: Users can add and view comments on lectures, with support for nested comments.
- **User Authentication**: Secure login and signup functionality for users.

## Technologies Used

- **Frontend**: React.js
- **Backend**: Node.js with Express
- **Database**: MongoDB
- **Styling**: CSS, Tailwind CSS (optional)

## Installation

### Prerequisites

Ensure you have the following installed:
- Node.js (version 14 or higher)
- npm or yarn
- MongoDB

### Backend Setup

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/virtual-classroom.git
    ```

2. Navigate to the `backend` directory:

    ```bash
    cd virtual-classroom/backend
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Create a `.env` file in the `backend` directory and add your environment variables:

    ```env
    PORT=5000
    MONGO_URI=mongodb://localhost:27017/virtual-classroom
    ```

5. Start the server:

    ```bash
    npm start
    ```

### Frontend Setup

1. Navigate to the `frontend` directory:

    ```bash
    cd virtual-classroom/frontend
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file in the `frontend` directory and add your API base URL:

    ```env
    REACT_APP_API_BASE_URL=http://localhost:5000/api
    ```

4. Start the development server:

    ```bash
    npm start
    ```

## Usage

1. **Create a Class**: Navigate to `/create-class` to create a new class.
2. **Manage Classes**: View and manage your classes from the main page.
3. **Login/Signup**: Use the `/login` and `/signup` routes for user authentication.
4. **View Classes and Sessions**: Access class details and sessions through class-specific routes.

## API Endpoints

- **POST** `/api/classes`: Create a new class.
- **GET** `/api/classes`: Retrieve all classes.
- **GET** `/api/classes/:classId`: Retrieve a specific class by ID.
- **PUT** `/api/classes/:classId`: Update a class by ID.
- **DELETE** `/api/classes/:classId`: Delete a class by ID.
- **GET** `/api/lectures/:lectureId/comments`: Get comments for a lecture.
- **POST** `/api/lectures/:lectureId/comments`: Add a comment to a lecture.

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Create a new Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For any questions or feedback, please reach out to [sameersheikh0288@gmail.com](mailto:sameersheikh0288@gmail.com).


# CheckNWork

CheckNWork is a platform designed to connect individuals with reliable service providers. It simplifies the process of finding and hiring trusted professionals for various tasks, ensuring quality and convenience for users.

## Features

- **User Authentication and Authorization**: Secure login and registration system using JWT.
- **Job Posting**: Users can post jobs with details such as category, description, payment, location, and an optional image.
- **Job Application**: Users can apply for posted jobs and receive confirmation emails.
- **Job Management**: Users can view, update, and delete their posted jobs.
- **Job Status Tracking**: Jobs can be marked as completed, and completed tasks are displayed separately.
- **Business Verification**: Integrated tools to verify the legitimacy of businesses.
- **Terms and Conditions**: Users must agree to terms and conditions before applying for jobs.
- **Responsive Design**: Frontend built with React and styled for various screen sizes.

## Technologies Used

- **Frontend**: React, React Router, Vite, CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Email Service**: Nodemailer
- **Authentication**: JSON Web Tokens (JWT)

## Installation

Follow these steps to set up the project locally:

1. Clone the repository:

    ```bash
    git clone [repository URL]
    ```

2. Navigate to the project directory:

    ```bash
    cd TeamProject
    ```

3. Install dependencies for the root, backend, and frontend:

    ```bash
    npm install
    cd backend
    npm install
    cd ../frontend
    npm install
    ```

4. Create a `.env` file in the `backend` directory with the following variables:

    ```env
    PORT=5000
    JWT_SECRET=your-secret-key
    EMAIL_USER=your-email@example.com
    EMAIL_PASS=your-email-password
    ```

5. Replace the MongoDB connection string in `backend/src/db/mongoose.js` with your own.

## Usage

1. Start the backend server:

    ```bash
    cd backend
    npm run start
    ```

2. Start the frontend development server:

    ```bash
    cd frontend
    npm run dev
    ```

3. Open your browser and navigate to `http://localhost:5173`.

## Project Structure

### Backend

- **`server.js`**: Main entry point for the backend server.
- **`src/models`**: Contains Mongoose schemas for `User`, `PostedJob`, `AppliedJob`, and `CompletedTask`.
- **`src/routers`**: Defines API routes for user authentication, job posting, and job management.
- **`src/middleware`**: Includes authentication middleware.
- **`src/utils`**: Utility functions like email sending.

### Frontend

- **`src/components`**: React components for various pages and features.
- **`src/assets`**: Static assets like images.
- **`src/App.jsx`**: Main application component with route definitions.
- **`src/main.jsx`**: Entry point for the React application.

## API Endpoints

### Authentication

- `POST /register`: Register a new user.
- `POST /login`: Login and receive a JWT.

### Jobs

- `GET /postedjobs`: Fetch all posted jobs.
- `POST /myjobs`: Create a new job (requires authentication).
- `GET /myjobs`: Fetch jobs posted by the authenticated user.
- `PUT /myjobs/:id/complete`: Mark a job as completed.
- `DELETE /myjobs/:id`: Delete a job.

### Applications

- `POST /applyjob`: Apply for a job (requires authentication).
- `GET /appliedjobs`: Fetch jobs the user has applied for.
- `PUT /appliedjobs/:id/hide`: Hide an applied job.

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes and push them to your fork.
4. Submit a pull request with a detailed description of your changes.

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

For any inquiries or support, please contact:

- **Mboni George Nyambura**
- **Charity Jerotich Tanui**
- **Roselyne Vennessa Achieng**

Thank you for using CheckNWork!
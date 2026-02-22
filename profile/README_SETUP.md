# MyCompany Profile - Website with Registration and Login

A modern company website built with Spring Boot microservices backend and responsive HTML/CSS frontend featuring user registration and login functionality.

## Project Structure

```
├── src/
│   ├── main/
│   │   ├── java/com/mycompeny/profile/
│   │   │   ├── controller/
│   │   │   │   ├── HomeController.java        # Serves home page
│   │   │   │   └── AuthController.java        # Handles registration & login
│   │   │   ├── service/
│   │   │   │   └── AuthService.java           # Business logic for auth
│   │   │   ├── entity/
│   │   │   │   └── User.java                  # User entity/model
│   │   │   ├── repository/
│   │   │   │   └── UserRepository.java        # Database operations
│   │   │   ├── dto/
│   │   │   │   ├── RegisterRequest.java       # Registration DTO
│   │   │   │   ├── LoginRequest.java          # Login DTO
│   │   │   │   └── AuthResponse.java          # Response DTO
│   │   │   ├── config/
│   │   │   │   └── SecurityConfig.java        # Spring Security config
│   │   │   └── ProfileApplication.java        # Main Spring Boot app
│   │   ├── resources/
│   │   │   ├── templates/
│   │   │   │   └── index.html                 # Main page with header/footer
│   │   │   ├── static/
│   │   │   │   ├── css/
│   │   │   │   │   └── styles.css             # Responsive styling
│   │   │   │   └── js/
│   │   │   │       └── app.js                 # Frontend logic
│   │   │   └── application.properties         # Config file
│   ├── test/
│   │   └── java/com/mycompeny/profile/
│   │       └── ProfileApplicationTests.java
├── pom.xml                                    # Maven dependencies
└── README.md                                  # This file
```

## Features

### Frontend (HTML/CSS/JavaScript)
- **Header** with company logo and profile icon dropdown
- **Hero Section** with call-to-action buttons
- **Features Section** showcasing services with hover effects
- **About Section** with company information
- **Footer** with links and social media
- **Responsive Design** - works on mobile, tablet, and desktop
- **Registration Modal** - username, email, password, confirm password fields
- **Login Modal** - email and password fields
- **Form Validation** - client-side validation with user feedback
- **Message Alerts** - success and error messages

### Backend (Spring Boot)
- **User Registration** with duplicate email/username prevention
- **User Login** with password verification
- **Password Encryption** using BCrypt
- **Database Integration** with MySQL
- **RESTful APIs** for registration and login
- **Data Validation** and error handling
- **Responsive Error Messages**

## Technology Stack

### Frontend
- HTML5
- CSS3 (Responsive Design with Media Queries)
- Vanilla JavaScript (ES6+)
- Fetch API for HTTP requests

### Backend
- Spring Boot 4.0.3
- Spring Security
- Spring Data JPA
- MySQL Database
- Lombok (reduces boilerplate)
- Maven

### Database
- MySQL 8.0+

## Prerequisites

Before running the application, ensure you have:
- Java 21 JDK installed
- MySQL Server running
- Maven installed
- Git (optional, for version control)

## Setup Instructions

### 1. Database Setup

Create a MySQL database for the application:

```sql
CREATE DATABASE company_profile;
USE company_profile;
```

The application will automatically create the `users` table using Hibernate.

### 2. Update Database Configuration

Edit `src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/company_profile?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true
spring.datasource.username=root
spring.datasource.password=root
```

Change `username` and `password` to match your MySQL credentials.

### 3. Build the Project

Navigate to the project root directory and run:

```bash
mvn clean install
```

This will download all dependencies and build the project.

### 4. Run the Application

There are multiple ways to run the application:

**Option 1: Using Maven**
```bash
mvn spring-boot:run
```

**Option 2: Using Java**
```bash
mvn clean package
java -jar target/profile-0.0.1-SNAPSHOT.jar
```

**Option 3: Using IDE (IntelliJ/Eclipse)**
- Right-click on `ProfileApplication.java`
- Select "Run" or "Debug"

### 5. Access the Application

Open your browser and navigate to:
```
http://localhost:8080
```

You should see the MyCompany website homepage with the header, hero section, features, and footer.

## User Guide

### Registration

1. Click the **Profile Icon (👤)** in the top-right header
2. Click **"Register"**
3. Fill in the registration form:
   - Username
   - Email ID (used as login identifier)
   - Password (minimum 6 characters)
   - Confirm Password
4. Click **"Register"** button
5. Success message will appear if registration is successful
6. Automatically redirected to login page

### Login

1. Click the **Profile Icon (👤)** in the top-right header
2. Click **"Login"**
3. Enter your:
   - Email ID (registered email)
   - Password
4. Click **"Login"** button
5. After successful login:
   - Profile icon updates with your username
   - Dropdown menu changes to show "My Profile" and "Logout" options

### Logout

After login, click the **Profile Icon** and select **"Logout"** to end your session.

## API Endpoints

### Registration API

**Endpoint:** `POST /api/auth/register`

**Request Body:**
```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (Success - 201):**
```json
{
  "success": true,
  "message": "User registered successfully!",
  "username": "john_doe",
  "email": "john@example.com"
}
```

**Response (Error - 400):**
```json
{
  "success": false,
  "message": "Email already registered. Please use a different email or login."
}
```

### Login API

**Endpoint:** `POST /api/auth/login`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Login successful!",
  "username": "john_doe",
  "email": "john@example.com",
  "token": "base64encodedtoken"
}
```

**Response (Error - 401):**
```json
{
  "success": false,
  "message": "Invalid email or password. Please check your credentials."
}
```

## Database Schema

### Users Table

```sql
CREATE TABLE users (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  is_active BOOLEAN DEFAULT TRUE
);
```

## Configuration Details

### application.properties

Key configurations:

- **Server Port:** 8080
- **Database:** MySQL
- **JPA Dialect:** MySQL8Dialect
- **Hibernate DDL:** update (auto-creates tables if they don't exist)
- **Logging Level:** DEBUG for application code

## Security Features

1. **Password Encryption:** Passwords are encrypted using BCrypt
2. **Input Validation:** Server-side validation for all inputs
3. **Duplicate Prevention:** Email and username uniqueness enforced
4. **CORS Enabled:** Cross-Origin Resource Sharing enabled for APIs
5. **Account Status:** Tracks active/inactive user status

## Extending the Application

### Add More Features

1. **Email Verification:**
   - Modify `AuthService.register()` to send verification emails
   - Add email verification logic

2. **JWT Tokens:**
   - Replace simple tokens with JWT tokens
   - Add token refresh mechanism
   - Add token validation interceptor

3. **User Profile:**
   - Create UserProfileController
   - Add profile update functionality
   - Add profile picture upload

4. **Password Reset:**
   - Add forgot password endpoint
   - Send reset token via email
   - Reset password endpoint

5. **Additional User Fields:**
   - Add firstName, lastName, phone fields
   - Add address and profile picture
   - Modify User entity and DTOs accordingly

## Troubleshooting

### Issue: "Connection refused" error
- Ensure MySQL server is running
- Check database URL in application.properties
- Verify username and password

### Issue: "Table doesn't exist"
- The application should create the table automatically
- Check Hibernate logs for errors
- Ensure `spring.jpa.hibernate.ddl-auto=update`

### Issue: Registration fails with "Email already registered"
- That email already exists in the database
- Use a different email
- Or delete the user from database if testing

### Issue: Login fails but registration was successful
- Ensure password matches exactly (case-sensitive)
- Check if account is active in database
- Verify email spelling

### Issue: "403 Forbidden" on API calls
- CORS might be blocking the request
- Ensure `@CrossOrigin` annotation is present on controller
- Check browser console for detailed error

## Future Enhancements

1. Implement JWT tokens for stateless authentication
2. Add email verification during registration
3. Implement password reset functionality
4. Add user profile management
5. Add role-based access control (RBAC)
6. Implement user activity logging
7. Add two-factor authentication (2FA)
8. Create admin dashboard
9. Add payment integration for subscription plans
10. Implement API rate limiting

## Support and Contact

For support or questions about this application, please contact the development team or create an issue in the project repository.

## License

This project is licensed under the MIT License. See LICENSE file for details.

---

**Happy Coding! 🚀**

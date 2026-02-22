# Quick Start Guide - MyCompany Profile Application

## 5-Minute Setup

### Step 1: Prerequisites Check ✓
```bash
# Check Java version (should be 21+)
java -version

# Check MySQL is running
mysql --version

# Check Maven is installed
mvn --version
```

### Step 2: Create Database
Open MySQL and run:
```sql
CREATE DATABASE company_profile;
```

**OR** run the provided SQL script:
```bash
mysql -u root -p < database_setup.sql
```

### Step 3: Update Database Credentials

Edit `src/main/resources/application.properties`:

Line 7-8:
```properties
spring.datasource.username=root
spring.datasource.password=root
```

Change `root` and `root` to your MySQL username and password.

### Step 4: Build Project
```bash
mvn clean install
```

### Step 5: Run Application
```bash
mvn spring-boot:run
```

### Step 6: Open in Browser
Navigate to: **http://localhost:8080**

---

## Testing Registration & Login

### Test User Registration
1. Click Profile Icon (👤) → "Register"
2. Fill in:
   - Username: `testuser`
   - Email: `test@example.com`
   - Password: `password123`
   - Confirm: `password123`
3. Click "Register"

### Test User Login
1. Click Profile Icon (👤) → "Login"
2. Enter:
   - Email: `test@example.com`
   - Password: `password123`
3. Click "Login"
4. See success message and username in header

---

## Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| "Connection refused" | Start MySQL server |
| "Table doesn't exist" | Hibernate will create it automatically on startup |
| "Port 8080 in use" | Change port in `application.properties` or kill process on 8080 |
| Registration fails | Check MySQL connection and database exists |
| "Specified key was too long" | Ensure MySQL uses utf8mb4 character set |

---

## Project Structure Quick View

```
Frontend:
  ├── src/main/resources/templates/index.html      (Main page)
  ├── src/main/resources/static/css/styles.css     (Styling)
  └── src/main/resources/static/js/app.js          (Logic)

Backend:
  ├── src/main/java/com/mycompeny/profile/
  │   ├── controller/           (API endpoints)
  │   ├── service/              (Business logic)
  │   ├── entity/               (Data models)
  │   └── repository/           (Database access)

Config:
  └── src/main/resources/application.properties    (Settings)
```

---

## Using the Application

### Header Section
- **Logo**: Company branding
- **Profile Icon**: Click for Login/Register options

### Main Content
- **Hero Section**: Welcome message with CTA buttons
- **Features Section**: Company services showcase
- **About Section**: Company information

### Footer
- Links to various pages
- Social media connections
- Copyright information

### Registration Form
- Username (required)
- Email (required, must be unique)
- Password (min 6 characters)
- Confirm Password (must match)

### Login Form
- Email (must match registered email)
- Password (must match registered password)

---

## File Locations Reference

| Purpose | Location |
|---------|----------|
| Home page HTML | `src/main/resources/templates/index.html` |
| Styles | `src/main/resources/static/css/styles.css` |
| JavaScript | `src/main/resources/static/js/app.js` |
| User Entity | `src/main/java/com/mycompeny/profile/entity/User.java` |
| Auth Controller | `src/main/java/com/mycompeny/profile/controller/AuthController.java` |
| Auth Service | `src/main/java/com/mycompeny/profile/service/AuthService.java` |
| Application Config | `src/main/resources/application.properties` |
| Database Setup | `database_setup.sql` |

---

## Next Steps

After successful setup:

1. **Customize**: Edit `index.html` to add your company content
2. **Styling**: Modify `styles.css` to match your brand colors
3. **Add Features**: Create new pages and API endpoints as needed
4. **Deploy**: Package as JAR and deploy to server

---

## Useful Commands

```bash
# Clean and build
mvn clean package

# Run tests
mvn test

# Run with specific profile
mvn spring-boot:run -Dspring-boot.run.arguments="--server.port=9090"

# Build JAR and run
mvn clean package
java -jar target/profile-0.0.1-SNAPSHOT.jar

# View application logs
tail -f logs/application.log

# Check if ports are in use (Windows PowerShell)
netstat -ano | findstr :8080

# Kill process on port 8080 (Windows PowerShell)
Stop-Process -Id (Get-NetTCPConnection -LocalPort 8080).OwningProcess -Force
```

---

## API Quick Reference

### Register Endpoint
```
POST http://localhost:8080/api/auth/register
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### Login Endpoint
```
POST http://localhost:8080/api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

---

**You're all set! Happy Coding! 🚀**

For detailed setup instructions, see `README_SETUP.md`

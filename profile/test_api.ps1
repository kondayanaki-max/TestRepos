# API Testing Script for MyCompany Profile Application (PowerShell)
# Test the registration and login endpoints

$BASE_URL = "http://localhost:8080"

Write-Host "================================" -ForegroundColor Cyan
Write-Host "MyCompany Profile API Test Suite" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

# Test 1: Register a new user
Write-Host "Test 1: User Registration" -ForegroundColor Yellow
Write-Host "POST $BASE_URL/api/auth/register"
Write-Host ""

$registerBody = @{
    username = "testuser"
    email = "testuser@example.com"
    password = "password123"
} | ConvertTo-Json

try {
    $registerResponse = Invoke-WebRequest -Uri "$BASE_URL/api/auth/register" `
        -Method POST `
        -Body $registerBody `
        -ContentType "application/json" `
        -UseBasicParsing
    
    Write-Host "Response:" -ForegroundColor Green
    $registerResponse.Content | ConvertFrom-Json | ConvertTo-Json | Write-Host
} catch {
    Write-Host "Error: $_" -ForegroundColor Red
}
Write-Host ""

# Test 2: Try duplicate registration
Write-Host "Test 2: Duplicate Email Registration" -ForegroundColor Yellow
Write-Host "POST $BASE_URL/api/auth/register"
Write-Host ""

$dupBody = @{
    username = "testuser2"
    email = "testuser@example.com"
    password = "password123"
} | ConvertTo-Json

try {
    $dupResponse = Invoke-WebRequest -Uri "$BASE_URL/api/auth/register" `
        -Method POST `
        -Body $dupBody `
        -ContentType "application/json" `
        -UseBasicParsing
    
    Write-Host "Response (should error - email already exists):" -ForegroundColor Yellow
    $dupResponse.Content | ConvertFrom-Json | ConvertTo-Json | Write-Host
} catch {
    Write-Host "Error Response (Expected): $_" -ForegroundColor Yellow
}
Write-Host ""

# Test 3: Login with correct credentials
Write-Host "Test 3: User Login (Correct Credentials)" -ForegroundColor Yellow
Write-Host "POST $BASE_URL/api/auth/login"
Write-Host ""

$loginBody = @{
    email = "testuser@example.com"
    password = "password123"
} | ConvertTo-Json

try {
    $loginResponse = Invoke-WebRequest -Uri "$BASE_URL/api/auth/login" `
        -Method POST `
        -Body $loginBody `
        -ContentType "application/json" `
        -UseBasicParsing
    
    $loginJson = $loginResponse.Content | ConvertFrom-Json
    
    Write-Host "Response:" -ForegroundColor Green
    $loginJson | ConvertTo-Json | Write-Host
    
    if ($loginJson.token) {
        Write-Host "✓ Login successful - Token obtained" -ForegroundColor Green
        Write-Host "Token: $($loginJson.token)" -ForegroundColor Cyan
    }
} catch {
    Write-Host "Error: $_" -ForegroundColor Red
}
Write-Host ""

# Test 4: Login with incorrect password
Write-Host "Test 4: User Login (Incorrect Password)" -ForegroundColor Yellow
Write-Host "POST $BASE_URL/api/auth/login"
Write-Host ""

$wrongPassBody = @{
    email = "testuser@example.com"
    password = "wrongpassword"
} | ConvertTo-Json

try {
    $wrongPassResponse = Invoke-WebRequest -Uri "$BASE_URL/api/auth/login" `
        -Method POST `
        -Body $wrongPassBody `
        -ContentType "application/json" `
        -UseBasicParsing
    
    Write-Host "Response (should error):" -ForegroundColor Yellow
    $wrongPassResponse.Content | ConvertFrom-Json | ConvertTo-Json | Write-Host
} catch {
    Write-Host "Error Response (Expected):" -ForegroundColor Yellow
    $_.Exception.Response.StatusCode | Write-Host
}
Write-Host ""

# Test 5: Login with non-existent email
Write-Host "Test 5: User Login (Non-existent Email)" -ForegroundColor Yellow
Write-Host "POST $BASE_URL/api/auth/login"
Write-Host ""

$noUserBody = @{
    email = "nonexistent@example.com"
    password = "password123"
} | ConvertTo-Json

try {
    $noUserResponse = Invoke-WebRequest -Uri "$BASE_URL/api/auth/login" `
        -Method POST `
        -Body $noUserBody `
        -ContentType "application/json" `
        -UseBasicParsing
    
    Write-Host "Response (should error):" -ForegroundColor Yellow
    $noUserResponse.Content | ConvertFrom-Json | ConvertTo-Json | Write-Host
} catch {
    Write-Host "Error Response (Expected):" -ForegroundColor Yellow
}
Write-Host ""

# Test 6: Verify frontend is accessible
Write-Host "Test 6: Frontend - Check Homepage" -ForegroundColor Yellow
Write-Host "GET $BASE_URL/"
Write-Host ""

try {
    $homeResponse = Invoke-WebRequest -Uri "$BASE_URL/" `
        -Method GET `
        -UseBasicParsing
    
    if ($homeResponse.StatusCode -eq 200) {
        Write-Host "✓ Homepage is accessible (HTTP $($homeResponse.StatusCode))" -ForegroundColor Green
    } else {
        Write-Host "✗ Homepage returned status $($homeResponse.StatusCode)" -ForegroundColor Red
    }
} catch {
    Write-Host "✗ Homepage is not accessible" -ForegroundColor Red
    Write-Host "Error: $_" -ForegroundColor Red
}
Write-Host ""

# Summary
Write-Host "================================" -ForegroundColor Cyan
Write-Host "Test Suite Completed!" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Note: Make sure the application is running before testing:" -ForegroundColor Yellow
Write-Host "  mvn spring-boot:run" -ForegroundColor White

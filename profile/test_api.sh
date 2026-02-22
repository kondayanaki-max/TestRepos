#!/bin/bash
# API Testing Script for MyCompany Profile Application
# This script tests the registration and login APIs

BASE_URL="http://localhost:8080"

echo "================================"
echo "MyCompany Profile API Test Suite"
echo "================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test 1: Register a new user
echo -e "${YELLOW}Test 1: User Registration${NC}"
echo "POST $BASE_URL/api/auth/register"
echo ""

REGISTER_RESPONSE=$(curl -s -X POST "$BASE_URL/api/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "testuser@example.com",
    "password": "password123"
  }')

echo "Response:"
echo "$REGISTER_RESPONSE" | jq '.'
echo ""

# Test 2: Try duplicate registration
echo -e "${YELLOW}Test 2: Duplicate Email Registration${NC}"
echo "POST $BASE_URL/api/auth/register"
echo ""

DUP_RESPONSE=$(curl -s -X POST "$BASE_URL/api/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser2",
    "email": "testuser@example.com",
    "password": "password123"
  }')

echo "Response (should error - email already exists):"
echo "$DUP_RESPONSE" | jq '.'
echo ""

# Test 3: Login with correct credentials
echo -e "${YELLOW}Test 3: User Login (Correct Credentials)${NC}"
echo "POST $BASE_URL/api/auth/login"
echo ""

LOGIN_RESPONSE=$(curl -s -X POST "$BASE_URL/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "testuser@example.com",
    "password": "password123"
  }')

echo "Response:"
echo "$LOGIN_RESPONSE" | jq '.'
echo ""

# Extract token if login successful
TOKEN=$(echo "$LOGIN_RESPONSE" | jq -r '.token' 2>/dev/null)
if [ "$TOKEN" != "null" ] && [ ! -z "$TOKEN" ]; then
  echo -e "${GREEN}✓ Login successful - Token obtained${NC}"
  echo "Token: $TOKEN"
else
  echo -e "${RED}✗ Login failed - Could not obtain token${NC}"
fi
echo ""

# Test 4: Login with incorrect password
echo -e "${YELLOW}Test 4: User Login (Incorrect Password)${NC}"
echo "POST $BASE_URL/api/auth/login"
echo ""

WRONG_PASS=$(curl -s -X POST "$BASE_URL/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "testuser@example.com",
    "password": "wrongpassword"
  }')

echo "Response (should error):"
echo "$WRONG_PASS" | jq '.'
echo ""

# Test 5: Login with non-existent email
echo -e "${YELLOW}Test 5: User Login (Non-existent Email)${NC}"
echo "POST $BASE_URL/api/auth/login"
echo ""

NO_USER=$(curl -s -X POST "$BASE_URL/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "nonexistent@example.com",
    "password": "password123"
  }')

echo "Response (should error):"
echo "$NO_USER" | jq '.'
echo ""

# Test 6: Verify frontend is accessible
echo -e "${YELLOW}Test 6: Frontend - Check Homepage${NC}"
echo "GET $BASE_URL/"
echo ""

HOME_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL/")
if [ "$HOME_STATUS" = "200" ]; then
  echo -e "${GREEN}✓ Homepage is accessible (HTTP $HOME_STATUS)${NC}"
else
  echo -e "${RED}✗ Homepage is not accessible (HTTP $HOME_STATUS)${NC}"
fi
echo ""

# Summary
echo "================================"
echo "Test Suite Completed!"
echo "================================"
echo ""
echo "Note: Make sure the application is running before testing:"
echo "  mvn spring-boot:run"
echo ""
echo "For prettier JSON output, install jq:"
echo "  Linux/Mac: brew install jq"
echo "  Windows: choco install jq"

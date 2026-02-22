-- Database Setup Script for MyCompany Profile Application
-- MySQL Database Creation and Configuration

-- Drop existing database if it exists (careful with this!)
-- DROP DATABASE IF EXISTS company_profile;

-- Create new database
CREATE DATABASE IF NOT EXISTS company_profile;

-- Use the database
USE company_profile;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    CONSTRAINT username_unique UNIQUE (username),
    CONSTRAINT email_unique UNIQUE (email),
    INDEX idx_email (email),
    INDEX idx_username (username),
    INDEX idx_created_at (created_at)
);

-- Show created table structure
SHOW TABLES;

-- Describe users table
DESCRIBE users;

-- Add some sample data (optional - for testing)
-- INSERT INTO users (username, email, password, is_active) 
-- VALUES ('admin', 'admin@example.com', 'hashed_password_here', TRUE);

-- View all users
SELECT * FROM users;

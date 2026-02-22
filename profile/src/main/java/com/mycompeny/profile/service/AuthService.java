package com.mycompeny.profile.service;

import com.mycompeny.profile.dto.AuthResponse;
import com.mycompeny.profile.dto.LoginRequest;
import com.mycompeny.profile.dto.RegisterRequest;
import com.mycompeny.profile.entity.User;
import com.mycompeny.profile.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class AuthService {

    private final UserRepository userRepository;


    
    /**
     * Register a new user
     */
    public AuthResponse register(RegisterRequest request) {
        // Check if email already exists
        if (userRepository.existsByEmail(request.getEmail())) {
            return AuthResponse.builder()
                    .success(false)
                    .message("Email already registered. Please use a different email or login.")
                    .build();
        }
        
        // Check if username already exists
        if (userRepository.existsByUsername(request.getUsername())) {
            return AuthResponse.builder()
                    .success(false)
                    .message("Username already taken. Please choose a different username.")
                    .build();
        }
        
        // Validate input
        if (request.getUsername() == null || request.getUsername().trim().isEmpty()) {
            return AuthResponse.builder()
                    .success(false)
                    .message("Username is required.")
                    .build();
        }
        
        if (request.getEmail() == null || request.getEmail().trim().isEmpty()) {
            return AuthResponse.builder()
                    .success(false)
                    .message("Email is required.")
                    .build();
        }
        
        if (request.getPassword() == null || request.getPassword().length() < 6) {
            return AuthResponse.builder()
                    .success(false)
                    .message("Password must be at least 6 characters long.")
                    .build();
        }
        
        // Create new user
        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());
        user.setIsActive(true);
        
        User savedUser = userRepository.save(user);
        
        return AuthResponse.builder()
                .success(true)
                .message("User registered successfully!")
                .username(savedUser.getUsername())
                .email(savedUser.getEmail())
                .build();
    }
    
    /**
     * Login user
     */
    public AuthResponse login(LoginRequest request) {
        // Find user by email
        Optional<User> userOptional = userRepository.findByEmail(request.getEmail());
        
        if (userOptional.isEmpty()) {
            return AuthResponse.builder()
                    .success(false)
                    .message("Invalid email or password. Please check your credentials.")
                    .build();
        }
        
        User user = userOptional.get();
        
        // Check if user is active
        if (!user.getIsActive()) {
            return AuthResponse.builder()
                    .success(false)
                    .message("Your account has been deactivated. Please contact support.")
                    .build();
        }
        
        // Verify password
        if (!request.getPassword().equals(user.getPassword())) {
            return AuthResponse.builder()
                    .success(false)
                    .message("Invalid email or password. Please check your credentials.")
                    .build();
        }
        
        // Generate token (in production, use JWT)
        String token = generateSimpleToken(user.getId(), user.getEmail());
        
        return AuthResponse.builder()
                .success(true)
                .message("Login successful!")
                .username(user.getUsername())
                .email(user.getEmail())
                .token(token)
                .build();
    }
    
    /**
     * Generate a simple token (Replace with JWT in production)
     */
    private String generateSimpleToken(Long userId, String email) {
        return java.util.Base64.getEncoder()
                .encodeToString((userId + ":" + email + ":" + System.currentTimeMillis()).getBytes());
    }
    
    /**
     * Get user by email
     */
    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }
    
    /**
     * Get user by username
     */
    public Optional<User> getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }
}

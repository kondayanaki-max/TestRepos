// Toggle Profile Dropdown Menu
function toggleProfileMenu() {
    const menu = document.getElementById('profileMenu');
    menu.classList.toggle('active');
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const dropdown = document.querySelector('.profile-dropdown');
        if (!dropdown.contains(event.target)) {
            menu.classList.remove('active');
        }
    });
}

// Login Modal Functions
function openLoginModal() {
    const modal = document.getElementById('loginModal');
    modal.classList.add('active');
    closeRegisterModal();
    clearLoginForm();
}

function closeLoginModal() {
    const modal = document.getElementById('loginModal');
    modal.classList.remove('active');
}

function clearLoginForm() {
    document.getElementById('loginForm').reset();
    document.getElementById('loginMessage').innerHTML = '';
}

// Register Modal Functions
function openRegisterModal() {
    const modal = document.getElementById('registerModal');
    modal.classList.add('active');
    closeLoginModal();
    clearRegisterForm();
}

function closeRegisterModal() {
    const modal = document.getElementById('registerModal');
    modal.classList.remove('active');
}

function clearRegisterForm() {
    document.getElementById('registerForm').reset();
    document.getElementById('registerMessage').innerHTML = '';
}

// Switch between Login and Register
function switchToLogin() {
    closeRegisterModal();
    openLoginModal();
}

function switchToRegister() {
    closeLoginModal();
    openRegisterModal();
}

// Close modals when clicking on the modal background
window.onclick = function(event) {
    const loginModal = document.getElementById('loginModal');
    const registerModal = document.getElementById('registerModal');
    
    if (event.target === loginModal) {
        closeLoginModal();
    }
    if (event.target === registerModal) {
        closeRegisterModal();
    }
}

// Show/hide message
function showMessage(messageId, text, type) {
    const messageDiv = document.getElementById(messageId);
    messageDiv.innerHTML = text;
    messageDiv.className = `message ${type} show`;
    
    // Auto-hide success messages after 3 seconds
    if (type === 'success') {
        setTimeout(() => {
            messageDiv.classList.remove('show');
        }, 3000);
    }
}

// Register Form Submission
document.getElementById('registerForm')?.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const username = document.getElementById('regUsername').value;
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;
    const confirmPassword = document.getElementById('regConfirmPassword').value;
    
    // Validation
    if (password !== confirmPassword) {
        showMessage('registerMessage', 'Passwords do not match!', 'error');
        return;
    }
    
    if (password.length < 6) {
        showMessage('registerMessage', 'Password must be at least 6 characters long!', 'error');
        return;
    }
    
    try {
        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                email: email,
                password: password
            })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            showMessage('registerMessage', 'Registration successful! You can now login.', 'success');
            setTimeout(() => {
                closeRegisterModal();
                openLoginModal();
            }, 2000);
        } else {
            showMessage('registerMessage', data.message || 'Registration failed. Please try again.', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showMessage('registerMessage', 'An error occurred. Please try again later.', 'error');
    }
});

// Login Form Submission
document.getElementById('loginForm')?.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            // Store token or session info
            if (data.token) {
                localStorage.setItem('authToken', data.token);
            }
            if (data.username) {
                localStorage.setItem('username', data.username);
            }
            
            showMessage('loginMessage', 'Login successful! Redirecting...', 'success');
            setTimeout(() => {
                closeLoginModal();
                updateHeaderWithLogin(data.username);
            }, 2000);
        } else {
            showMessage('loginMessage', data.message || 'Login failed. Please check your credentials.', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showMessage('loginMessage', 'An error occurred. Please try again later.', 'error');
    }
});

// Update header when user logs in
function updateHeaderWithLogin(username) {
    const profileBtn = document.querySelector('.profile-btn');
    const profileMenu = document.getElementById('profileMenu');
    
    profileBtn.innerHTML = `<span class="profile-icon">👤 ${username}</span><span class="dropdown-arrow">▼</span>`;
    profileMenu.innerHTML = `
        <a href="#" onclick="viewProfile()">My Profile</a>
        <a href="#" onclick="logout()">Logout</a>
    `;
}

// View Profile
function viewProfile() {
    const username = localStorage.getItem('username');
    alert(`Welcome ${username}! Profile page coming soon.`);
}

// Logout
function logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('username');
    
    const profileBtn = document.querySelector('.profile-btn');
    profileBtn.innerHTML = `<span class="profile-icon">👤</span><span class="dropdown-arrow">▼</span>`;
    
    const profileMenu = document.getElementById('profileMenu');
    profileMenu.innerHTML = `
        <a href="#" onclick="openLoginModal()">Login</a>
        <a href="#" onclick="openRegisterModal()">Register</a>
    `;
    
    alert('You have been logged out successfully!');
}

// Check if user is already logged in
document.addEventListener('DOMContentLoaded', function() {
    const username = localStorage.getItem('username');
    if (username) {
        updateHeaderWithLogin(username);
    }
});

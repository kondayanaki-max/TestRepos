export const authService = {
  async login(email: string, password: string) {
    const res = await fetch('http://localhost:8080/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
      const d = await res.json().catch(() => ({}));
      throw new Error(d?.error || 'Login failed');
    }
    const user = await res.json();
    localStorage.setItem('appUser', JSON.stringify(user));
    return user;
  },

  async register(firstName: string, lastName: string, email: string, userId: string, password: string) {
    const res = await fetch('http://localhost:8080/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: firstName + ' ' + lastName, email, password }),
    });
    if (!res.ok) {
      const d = await res.json().catch(() => ({}));
      throw new Error(d?.error || 'Registration failed');
    }
    const user = await res.json();
    localStorage.setItem('appUser', JSON.stringify(user));
    return user;
  },

  logout() {
    localStorage.removeItem('appUser');
  },

  getCurrentUser() {
    try {
      return JSON.parse(localStorage.getItem('appUser') || 'null');
    } catch (e) {
      return null;
    }
  },

  /* isAdmin() {
    const u = this.getCurrentUser();
    console.log('Auth user role', u?.role || 'default');
    return u && u.role === 'admin';
  } */
};

export default authService;

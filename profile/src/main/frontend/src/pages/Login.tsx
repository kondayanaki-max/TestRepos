import React, { useEffect, useState } from 'react';
import authService from '../services/authService';
import { IoArrowBack } from 'react-icons/io5';

interface LoginProps {
  onSuccess?: () => void;
  onBack?: () => void;
}

export default function Login({ onSuccess }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

    

  const submit = async (e: any) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await authService.login(email.trim(), password);
      onSuccess?.();
    } catch (err: any) {
      setError(err?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="responsive-container hearbs-container" style={{ padding: 16 }}>
      
      <h2>Login Page</h2>
      <form onSubmit={submit}>
        <div>
          <label>Email</label>
          <input value={email} onChange={e => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Password</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        <div style={{ marginTop: 8 }}>
          <button type="submit" disabled={loading}>{loading ? 'Logging...' : 'Login'}</button>
        </div>
        {error && <div className="error" style={{ marginTop: 8 }}>{error}</div>}
      </form>
    </div>
  );
}

import React, { useState } from 'react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (email && password) {
      // Mock login logic
      console.log('Logged in:', email);
      window.location.href = '/dashboard';
    } else {
      setError('Please enter both email and password.');
    }
  };

  return (
    <div className="login-container" aria-labelledby="login-heading">
      <h2 id="login-heading">Login</h2>
      <input
        type="email"
        placeholder="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        aria-label="Email address"
      />
      <div className="password-wrapper">
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          aria-label="Password"
        />
        <button onClick={() => setShowPassword(!showPassword)} aria-label="Toggle password visibility">
          {showPassword ? '🙈' : '👁️'}
        </button>
      </div>
      <div>
        <input type="checkbox" id="remember" />
        <label htmlFor="remember">Remember me</label>
      </div>
      {error && <p className="error-message">{error}</p>}
      <button onClick={handleLogin}>Log In</button>
    </div>
  );
}

export default Login;

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { UserURL } from '../../api';

const RegisterScreen = ({ history }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if(localStorage.getItem("authToken")) {
        history.push("/")
    }
}, [history])

  const registerHandler = async (e) => {
    e.preventDefault();

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (password !== confirmPassword) {
      setPassword('');
      setConfirmPassword('');
      setTimeout(() => {
        setError('');
      }, 5000);
      return setError('Passwords do not match');
    }

    try {
      const { data } = await axios.post(
        // `${UserURL}/register`,
        '/api/auth/register',
        { username, email, password },
        config
      );

      localStorage.setItem('authToken', data.token);
      history.push('/');
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError('');
      }, 5000);
    }
  };

  return (
    <div className='p-4 sm:p-8'>
      <form onSubmit={registerHandler} className='flex flex-col p-4 m-auto text-center bg-blue-200 rounded-2xl w-80'>
        <h3 className='mb-8 text-2xl font-semibold'>Register</h3>
        {error && <span>{error}</span>}
        <div className='flex flex-col mb-6 text-left'>
          <label htmlFor="name" className='mb-1 text-sm'>Username:</label>
          <input
            className='px-2 py-1 rounded-md'
            type="text"
            required
            id="name"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className='flex flex-col mb-6 text-left'>
          <label htmlFor="email" className='mb-1 text-sm'>Email:</label>
          <input
            className='px-2 py-1 rounded-md'
            type="email"
            required
            id="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='flex flex-col mb-6 text-left'>
          <label htmlFor="password" className='mb-1 text-sm'>Password:</label>
          <input
            className='px-2 py-1 rounded-md'
            type="password"
            required
            id="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className='flex flex-col mb-6 text-left'>
          <label htmlFor="confirmpassword" className='mb-1 text-sm'>Confirm Password:</label>
          <input
            className='px-2 py-1 rounded-md'
            type="password"
            required
            id="confirmpassword"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="px-4 py-2 mb-2 font-medium tracking-widest text-white bg-orange-500 rounded-2xl hover:brightness-110 active:brightness-95">Register</button>
        <span className='text-xs text-left'>
          Already have an account? <Link to="/login" className='text-blue-800 underline'>Login</Link>
        </span>
      </form>
    </div>
  );
};

export default RegisterScreen;

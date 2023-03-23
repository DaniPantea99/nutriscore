import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { UserURL } from '../../api';

const LoginScreen = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

useEffect(() => {
    if(localStorage.getItem("authToken")) {
        history.push("/")
    }
}, [history])

  const loginHandler = async (e) => {
    e.preventDefault();

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const { data } = await axios.post(
        // `${UserURL}/login`,
        '/api/auth/login',
        { email, password },
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
      <form onSubmit={loginHandler} className='flex flex-col p-4 m-auto text-center bg-blue-200 rounded-2xl w-80'>
        <h3 className='mb-8 text-2xl font-semibold'>Login</h3>
        {error && <span>{error}</span>}
        
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
            tabIndex={1}
          />
        </div>
        <div className='flex flex-col mb-6 text-left'>
          <label htmlFor="password" className='mb-1 text-sm'>Password:{" "}
            <Link to="/forgotpassword" tabIndex={4} className='text-xs text-blue-800 underline'>Forgot Password?</Link>
          </label>
          <input
            className='px-2 py-1 rounded-md'
            type="password"
            required
            id="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            tabIndex={2}
          />
        </div>

        <button type="submit" tabIndex={3} className="px-4 py-2 mb-2 font-medium tracking-widest text-white bg-orange-500 rounded-2xl hover:brightness-110 active:brightness-95">Login</button>
        <span className='text-xs text-left'>
          Don't have an account? <Link to="/register" className='text-blue-800 underline'>Register</Link>
        </span>
      </form>
    </div>
  );
};

export default LoginScreen;

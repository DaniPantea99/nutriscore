import { useState } from 'react';
import axios from 'axios';
import { UserURL } from '../../api';

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const forgotPasswordHandler = async (e) => {
    e.preventDefault();

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const { data } = await axios.post(
        // `${UserURL}/forgotpassword`,
        '/api/auth/forgotpassword',
        { email },
        config
      );
      setSuccess(data.data);
    } catch (error) {
      setError(error.response.data.error);
      setEmail('');
      setTimeout(() => {
        setError('');
      }, 5000);
    }
  };

  return (
    <div className='p-4 sm:p-8'>
      <form onSubmit={forgotPasswordHandler} className='flex flex-col p-4 m-auto text-center bg-blue-200 rounded-2xl w-80'>
        <h3 className='mb-8 text-2xl font-semibold'>Forgot Password</h3>
        {error && <span>{error}</span>}
        {success && <span>{success}</span>}
        <div className='flex flex-col mb-6 text-left'>
          <p className='mb-6 text-xs text-center'>
            Please enter the email address you register your account with. We
            will send you reset password confirmation to this email.
          </p>
          <label htmlFor="email" className='mb-1 text-sm'>Email:</label>
          <input
            className='px-2 py-1 rounded-md'
            type="email"
            required
            id="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button type="submit" className="px-4 py-2 mb-2 font-medium tracking-widest text-white bg-orange-500 rounded-2xl hover:brightness-110 active:brightness-95">Send Email</button>
      </form>
    </div>
  );
};

export default ForgotPasswordScreen;

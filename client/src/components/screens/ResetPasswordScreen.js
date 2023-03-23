import { useState } from 'react';
import { Link, 
  // useParams 
} from 'react-router-dom';
import axios from 'axios';
import { UserURL } from '../../api';

const ResetPasswordScreen = ({ match }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // const resetToken = useParams()

  const resetPasswordHandler = async (e) => {
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
      return setError("Passwords don't match");
    }

    try {
      const { data } = await axios.put(
        // `${UserURL}/passwordreset/${match.params.resetToken}`,
        `/api/auth/passwordreset/${match.params.resetToken}`,
        // `/api/auth/passwordreset/${resetToken}`,
        {
          password,
        },
        config
      );

      setSuccess(data.data);
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError('');
      }, 5000);
    }
  };

  return (
    <div className='p-4 sm:p-8'>
      <form onSubmit={resetPasswordHandler} className='flex flex-col p-4 m-auto text-center bg-blue-200 rounded-2xl w-80'>
        <h3 className='mb-8 text-2xl font-semibold'>Reset Password</h3>
        {error && <span>{error}</span>}
        {success && (
          <span>
            {success} <Link to="/login">Login</Link>
          </span>
        )}
        <div className='flex flex-col mb-6 text-left'>
          <label htmlFor="password" className='mb-1 text-sm'>New Password:</label>
          <input
            className='px-2 py-1 rounded-md'
            type="password"
            required
            id="password"
            placeholder="Enter new password"
            autoComplete="true"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className='flex flex-col mb-6 text-left'>
          <label htmlFor="confirmpassword" className='mb-1 text-sm'>Confirm New Password:</label>
          <input
            className='px-2 py-1 rounded-md'
            type="password"
            required
            id="confirmpassword"
            placeholder="Confirm new password"
            autoComplete="true"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="px-4 py-2 mb-2 font-medium tracking-widest text-white bg-orange-500 rounded-2xl hover:brightness-110 active:brightness-95">Reset Password</button>
      </form>
    </div>
  );
};

export default ResetPasswordScreen;

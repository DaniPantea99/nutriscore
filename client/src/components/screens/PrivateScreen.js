import { useState, useEffect } from 'react';
import axios from 'axios';
import { UserURL } from '../../api';

const PrivateScreen = ({ history }) => {
  const [error, setError] = useState('');
  const [privateData, setPrivateData] = useState('');

  useEffect(() => {
    if (!localStorage.getItem('authToken')) {
      history.push('/login');
    }

    const fetchPrivateData = async () => {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      };

      try {
        const { data } = await axios.get(
          // `${UserURL}/private`,
          '/api/private', 
          config);
        setPrivateData(data.data);
      } catch (error) {
        localStorage.removeItem('authToken');
        setError('You are not authorized. Please login');
      }
    };

    fetchPrivateData();
  }, [history]);

  const logoutHandler = () => {
    localStorage.removeItem('authToken');
    history.push('/login');
  };

  return (
    <div className="p-4 sm:p-8">
      <div className="flex flex-col p-4 m-auto text-center bg-blue-200 rounded-2xl w-80">
        {error ? (
          <span>{error}</span>
        ) : (
          <div className="flex flex-col justify-between text-left">
            <div className="p-2 mb-6 text-white bg-green-600 rounded-md">
              {privateData}
            </div>
            <button
              onClick={logoutHandler}
              className="px-4 py-2 font-medium tracking-widest text-white bg-orange-500 rounded-2xl hover:brightness-110 active:brightness-95"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PrivateScreen;

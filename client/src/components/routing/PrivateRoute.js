import { Navigate, 
        // Route, 
        Outlet } from 'react-router-dom';

// const PrivateRoute = ({ component: Component, ...rest }) => {
//   return (
//     <Route
//       {...rest}
//       render={(props) =>
//         localStorage.getItem('authToken') ? (
//           <Component {...props} />
//         ) : (
//           <Navigate to="/login" />
//         )
//       }
//     />
//   );
// };


const PrivateRoute = () => {
  const auth = localStorage.getItem('authToken')
  return auth ? <Outlet /> : <Navigate to="/login" /> 
};

export default PrivateRoute;

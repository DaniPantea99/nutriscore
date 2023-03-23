import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { loadIngredients } from './actions/ingredientsAction';
import { loadRecipes } from './actions/recipesAction';
import { useDispatch } from 'react-redux';
import Dashboard from './pages/Dashboard.js';
import Settings from './pages/Settings';
import User from './pages/User';
import Navbar from './components/Navbar';
import PdfDocument from './pages/PdfDocument';

//Routing
import PrivateRoute from './components/routing/PrivateRoute';

//Screens
// import PrivateScreen from './components/screens/PrivateScreen';
import LoginScreen from './components/screens/LoginScreen';
import RegisterScreen from './components/screens/RegisterScreen';
import ForgotPasswordScreen from './components/screens/ForgotPasswordScreen';
import ResetPasswordScreen from './components/screens/ResetPasswordScreen';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadIngredients());
    dispatch(loadRecipes());
  }, [dispatch]);

  return (
    <Router>
      <div className="h-full">
        <Navbar>
          <Routes>
            <Route exact path="/" element={<PrivateRoute />}>
              <Route exact path="/" element={<Dashboard />} />
              <Route path="/dashboard" exact element={<Dashboard />} />
              <Route path="/user" exact element={<User />} />
              <Route path="/settings" exact element={<Settings />} />
              <Route path="/pdf" exact element={<PdfDocument />} />
            </Route>
            <Route path="/login" exact element={<LoginScreen />} />
            <Route path="/register" exact element={<RegisterScreen />} />
            <Route
              path="/forgotpassword"
              exact
              element={<ForgotPasswordScreen />}
            />
            <Route
              path="/passwordreset/:resetToken"
              exact
              element={<ResetPasswordScreen />}
            />
            {/* <Route path="/" exact element={<Dashboard />} /> */}
          </Routes>
        </Navbar>
      </div>
    </Router>
  );
}

export default App;

import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { loadIngredients } from './actions/ingredientsAction';
import { loadRecipes } from './actions/recipesAction';
import { useDispatch } from 'react-redux';
import Dashboard from './pages/Dashboard.js';
import Settings from './pages/Settings';
import User from './pages/User';
import Navbar from './components/Navbar';
import PdfDocument from './pages/PdfDocument';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadIngredients());
    dispatch(loadRecipes());
  }, [dispatch]);

  return (
    <div className="flex h-full overflow-hidden">
      <Navbar>
        <Routes>
          <Route path="/" exact element={<Dashboard />} />
          <Route path="/dashboard" exact element={<Dashboard />} />
          <Route path="/user" exact element={<User />} />
          <Route path="/settings" exact element={<Settings />} />
          <Route path="/pdf" exact element={<PdfDocument />} />
        </Routes>
      </Navbar>
    </div>
  );
}

export default App;

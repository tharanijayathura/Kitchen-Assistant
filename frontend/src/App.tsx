import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';

import Login from './pages/Login';  // NEW: Login route
import Register from './pages/Register';  // NEW: Register route

import Inventory from './pages/Inventory';
import Recipes from './pages/Recipes';
import MealPlan from './pages/MealPlan';

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />  // NEW
        <Route path="/register" element={<Register />} />  // NEW

        <Route path="/inventory" element={<Inventory />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/meal-plan" element={<MealPlan />} />

      </Routes>
    </>
  );
}

export default App;
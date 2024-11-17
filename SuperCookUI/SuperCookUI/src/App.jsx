import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminLogin from './AdminLogin'; // Adjust the path if needed
import ManageRecipe from './ManageRecipe'; // Import ManageRecipe
import AddIngredients from './AddIngredients';
import AdminSignUp from './AdminSignUp'
import Homepage from "./Homepage";

function App() {
  return (
    <Router>
      <Routes>
        {/* Define the routes */}
        <Route path="/AdminLogin" element={<AdminLogin />} />
        <Route path="/ManageRecipe" element={<ManageRecipe />} /> {/* Add ManageRecipe route */}
        <Route path="/AddIngredients" element={<AddIngredients />} />
        <Route path="" element={<Homepage />} />
        <Route path="/AdminSignUp" element={<AdminSignUp />} />
      </Routes>
    </Router>
  );
}


export default App;

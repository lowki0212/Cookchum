import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminLogin from './AdminLogin'; // Adjust the path if needed
import ManageRecipe from './ManageRecipe'; // Import ManageRecipe

function App() {
  return (
    <Router>
      <Routes>
        {/* Define the routes */}
        <Route path="/AdminLogin" element={<AdminLogin />} />
        <Route path="/ManageRecipe" element={<ManageRecipe />} /> {/* Add ManageRecipe route */}
      </Routes>
    </Router>
  );
}

export default App;

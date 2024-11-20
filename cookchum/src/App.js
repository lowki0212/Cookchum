import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './component/LoginForm';
import Dashboard from './component/Dashboard';
import RegistrationForm from './component/RegistrationForm'; 
import FullRecipe from'./component/FullRecipe'; 
import FavoriteRecipesTab from './component/FavoriteTab';
import AdminLogin from './component/AdminLogin'; // Adjust the path if needed
import ManageRecipe from './component/ManageRecipe'; // Import ManageRecipe
import AddIngredients from './component/AddIngredients';
import AdminSignUp from './component/AdminSignUp'

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/register" element={<RegistrationForm />} />
                {/* <Route path="/update" element={<UpdateAccount />} /> Add this route */}
                <Route path="/FavoriteRecipes" element={<FavoriteRecipesTab/>}/>
                <Route path="/full-recipe" element={<FullRecipe />} />
                <Route path="/AdminSignUp" element={<AdminSignUp />} />
                <Route path="/AddIngredients" element={<AddIngredients />} />
                <Route path="/AdminLogin" element={<AdminLogin />} />
                <Route path="/ManageRecipe" element={<ManageRecipe />} />
            </Routes>
        </Router>
    );
}

export default App;
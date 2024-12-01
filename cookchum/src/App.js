import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import LoginForm from './component/LoginForm';
import Dashboard from './component/Dashboard';
import RegistrationForm from './component/RegistrationForm'; 
import FullRecipe from './component/FullRecipe'; 
import FavoriteRecipesTab from './component/FavoriteTab';
import AdminLogin from './component/AdminLogin'; 
import ManageRecipe from './component/ManageRecipe'; 
import AddIngredients from './component/AddIngredients';
import AdminSignUp from './component/AdminSignUp';
import RecipeDetails from './component/RecipeDetails';
import Header from './component/Header';
import AboutUs from './component/AboutUs';  
import ContactUs from './component/ContactUs';
import FAQs from './component/FAQs';

function App() {
    return (
        <Router>
            <div className="app">
                <ConditionalHeader />
                <div>
                    <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="/register" element={<RegistrationForm />} />
                    <Route path="/FavoriteRecipes" element={<FavoriteRecipesTab />} />
                    <Route path="/full-recipe" element={<FullRecipe />} />
                    <Route path="/AdminSignUp" element={<AdminSignUp />} />
                    <Route path="/AddIngredients" element={<AddIngredients />} />
                    <Route path="/AdminLogin" element={<AdminLogin />} />
                    <Route path="/ManageRecipe" element={<ManageRecipe />} />
                    <Route path="/recipeDetails/:recipeId" element={<RecipeDetails />} />
                    <Route path="/AboutUs" element={<AboutUs />} />
                    <Route path="/FAQs" element={<FAQs />} />
                    <Route path="/ContactUs" element={<ContactUs />} />
                                    </Routes>
                </div>
            </div>
        </Router>
    );
}

function ConditionalHeader() {
    const location = useLocation();
    const noHeaderPaths = ['/login', '/register', '/AdminLogin', '/AdminSignUp','/AboutUs','/ManageRecipe','/AddIngredients'];

    const showHeader = !noHeaderPaths.includes(location.pathname);

    return showHeader ? <Header /> : null;
}


export default App;
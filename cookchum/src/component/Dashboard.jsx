import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./Dashboard.css";

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { userId, username } = location.state || {};
  const [loggedIn, setLoggedIn] = useState(!!userId);
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const ingredientCategories = {
    "Pantry Essentials": ["Butter", "Egg", "Garlic", "Milk", "Onion", "Sugar", "Olive Oil"],
    "Vegetables & Greens": ["Garlic", "Onion", "Bell Pepper", "Carrot", "Scallion"],
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/recipe/getAllRecipes")
      .then((response) => {
        setRecipes(response.data);
      })
      .catch((error) => console.error("Error fetching recipes:", error));
  }, []);

  const handleIngredientClick = (ingredient) => {
    let updatedIngredients;
    if (selectedIngredients.includes(ingredient)) {
      updatedIngredients = selectedIngredients.filter((i) => i !== ingredient);
    } else {
      updatedIngredients = [...selectedIngredients, ingredient];
    }
    setSelectedIngredients(updatedIngredients);
  };

  const handleRecipeClick = (recipe) => {
    setSelectedRecipe(recipe);
  };

  const handleViewFullRecipe = () => {
    if (!loggedIn) {
      navigate("/login");
    } else {
      navigate("/full-recipe", { state: { recipe: selectedRecipe,userId  } });
    }
  };

  const handleSavedRecipe = () => {
    if (!loggedIn) {
      navigate("/login");
    } else {
      navigate("/FavoriteRecipes", { state: { userId, username } });
    }
  };

  const handleAuthButtonClick = () => {
    if (loggedIn) {
      setLoggedIn(false);
      navigate("/login");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="search-bar">
          <input type="text" placeholder="Search ingredients..." />
        </div>
        <div className="ingredient-categories">
          {Object.keys(ingredientCategories).map((category) => (
            <div key={category} className="category">
              <h4>{category}</h4>
              <div className="ingredients-list">
                {ingredientCategories[category].map((ingredient) => (
                  <button
                    key={ingredient}
                    onClick={() => handleIngredientClick(ingredient)}
                    className={`ingredient-button ${selectedIngredients.includes(ingredient) ? "selected" : ""}`}
                  >
                    {ingredient}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
        <nav className="menu">
          <ul>
            <li onClick={handleSavedRecipe}>Saved Recipes</li>
            <li>More Tools</li>
            <li>Download the App</li>
          </ul>
        </nav>
        <div className="auth-button">
          <button onClick={handleAuthButtonClick}>
            {loggedIn ? "Logout" : "Sign In"}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <h3>Available Recipes</h3>
        <div className="recipe-cards">
          {recipes.length > 0 ? (
            recipes.map((recipe) => (
              <div
                key={recipe.recipeId}
                className="recipe-card"
                onClick={() => handleRecipeClick(recipe)}
              >
                <h4>{recipe.name}</h4>
                <p>{recipe.description.substring(0, 50)}...</p>
              </div>
            ))
          ) : (
            <p>Loading recipes or no recipes available...</p>
          )}
        </div>

        {/* Recipe Popup */}
        {selectedRecipe && (
          <div className="recipe-popup">
            <h4>{selectedRecipe.name}</h4>
            <p>{selectedRecipe.description}</p>
            <button onClick={handleViewFullRecipe}>View Full Recipe</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

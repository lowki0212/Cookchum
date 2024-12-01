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
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // New state to hold the search term

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/recipe/getAllRecipes")
      .then((response) => {
        const allRecipes = response.data;
        setRecipes(allRecipes);
        setFilteredRecipes(allRecipes);

        // Extract unique ingredients from all recipes
        const allIngredients = new Set();
        allRecipes.forEach((recipe) => {
          recipe.ingredients.forEach((ingredient) => {
            allIngredients.add(ingredient.name);
          });
        });
        setIngredients(Array.from(allIngredients));
      })
      .catch((error) => console.error("Error fetching recipes:", error));
  }, []);

  // Handle the search bar input
  const handleSearchChange = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);

    // Filter recipes based on search term
    const filtered = recipes.filter((recipe) =>
      recipe.name.toLowerCase().includes(value) // Check if the recipe name includes the search term
    );
    setFilteredRecipes(filtered);
  };

  const handleIngredientClick = (ingredient) => {
    let updatedIngredients;
    if (selectedIngredients.includes(ingredient)) {
      updatedIngredients = selectedIngredients.filter((i) => i !== ingredient);
    } else {
      updatedIngredients = [...selectedIngredients, ingredient];
    }
    setSelectedIngredients(updatedIngredients);

    // Filter recipes based on selected ingredients
    if (updatedIngredients.length > 0) {
      const filtered = recipes.filter((recipe) =>
        updatedIngredients.every((ingredient) =>
          recipe.ingredients.some((ingredientObj) => ingredientObj.name === ingredient)
        )
      );
      setFilteredRecipes(filtered);
    } else {
      setFilteredRecipes(recipes);
    }
  };

  const handleRecipeClick = (recipe) => {
    setSelectedRecipe(recipe);
  };

  const handleViewFullRecipe = () => {
    if (!loggedIn) {
      navigate("/login");
    } else {
      navigate("/full-recipe", { state: { recipe: selectedRecipe, userId } });
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
      <div className="sidebar animated-slide-in-left">
        <div className="auth-button-top">
          <button onClick={handleAuthButtonClick}>
            {loggedIn ? "Logout" : "Sign In"}
          </button>
        </div>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search recipes..."
            value={searchTerm}
            onChange={handleSearchChange} // Link the search input to state
          />
        </div>

        {/* Ingredient List */}
        <div className="ingredients-list">
          {ingredients.length > 0 ? (
            ingredients.map((ingredient) => (
              <button
                key={ingredient}
                onClick={() => handleIngredientClick(ingredient)}
                className={`ingredient-button ${selectedIngredients.includes(ingredient) ? "selected" : ""}`}
              >
                {ingredient}
              </button>
            ))
          ) : (
            <p>Loading ingredients...</p>
          )}
        </div>

        <nav className="menu">
          <ul>
            <li onClick={handleSavedRecipe}>Saved Recipes</li>
            <li>More Tools</li>
            <li>Download the App</li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="main-content animated-fade-in">
        <h2>Discover Delicious Recipes</h2>
        <div className="recipe-grid animated-slide-up">
          {filteredRecipes.length > 0 ? (
            filteredRecipes.map((recipe) => (
              <div
                key={recipe.recipeId}
                className="recipe-card"
                onClick={() => handleRecipeClick(recipe)}
              >
                {recipe.imageUrl && (
                  <img
                    src={recipe.imageUrl}
                    alt={recipe.name}
                    className="recipe-image"
                  />
                )}
                <div className="recipe-info">
                  <h4>{recipe.name}</h4>
                  <p>{recipe.description.substring(0, 50)}...</p>
                </div>
              </div>
            ))
          ) : (
            <p>No recipes found for the selected ingredients...</p>
          )}
        </div>

        {selectedRecipe && (
          <div className="recipe-popup">
            <h4>{selectedRecipe.name}</h4>
            {selectedRecipe.imageUrl && (
              <img
                src={selectedRecipe.imageUrl}
                alt={selectedRecipe.name}
                className="popup-image"
              />
            )}
            <p>{selectedRecipe.description}</p>
            <button onClick={handleViewFullRecipe}>View Full Recipe</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

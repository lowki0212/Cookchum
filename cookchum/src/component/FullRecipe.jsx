import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./FullRecipe.css";

const FullRecipe = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state || !state.recipe || !state.userId) {
    navigate("/dashboard");
    return null;
  }

  const { recipe, userId } = state;

  const handleBack = () => {
    navigate(-1);
  };

  const handleAddToFavorites = async () => {
    const favoriteRecipe = {
      recipe: { recipeId: recipe.recipeId },
      user: { userId: userId },
      dateAdded: new Date().toISOString().split("T")[0],
    };

    try {
      await axios.post(
        "http://localhost:8080/api/favRecipes/postFavRecipe",
        favoriteRecipe,
        { headers: { "Content-Type": "application/json" } }
      );
      alert("Recipe added to favorites!");
    } catch (error) {
      alert("Failed to add recipe to favorites. Please try again.");
    }
  };

  return (
    <>
      <div className="recipe-header invisible">
  <h1 className="recipe-name">{recipe.name}</h1>
  <div className="rating">
    <p>{recipe.reviews ? `${recipe.reviews.length} reviews` : "No reviews yet"}</p>
  </div>
  <p className="author">{recipe.author}</p>
  <h4 className="estimated-cost">
    Estimated Cost: ${recipe.estimatedCost?.toFixed(2) || "N/A"}
  </h4>
</div>


      <div className="full-recipe-container">
        <div className="recipe-content">
          <div className="recipe-info">
          <span>⭐⭐⭐⭐⭐</span>
          <p>{recipe.reviews ? `${recipe.reviews.length} reviews` : "No reviews yet"}</p>
          <p className="author">{recipe.author}</p>
        <h4 className="estimated-cost">
          Estimated Cost: ${recipe.estimatedCost?.toFixed(2) || "N/A"}
        </h4>
            <p className="recipe-description">{recipe.description}</p>
            <div className="ingredients-section">
              <h3>Ingredients:</h3>
              {Array.isArray(recipe.ingredients) && recipe.ingredients.length > 0 ? (
                <ul className="ingredients-list">
                  {recipe.ingredients.map((ingredient) => (
                    <li key={ingredient.ingredientId}>{ingredient.name}</li>
                  ))}
                </ul>
              ) : (
                <p>No ingredients available.</p>
              )}
            </div>
          </div>
          {recipe.imageUrl && (
            <div className="recipe-image">
              <img
                src={recipe.imageUrl}
                alt={recipe.name}
                className="full-recipe-image"
              />
            </div>
          )}
        </div>

        <div className="button-group">
          <button type="button" className="back-button" onClick={handleBack}>
            Back
          </button>
          <button
            type="button"
            className="add-favorite-button"
            onClick={handleAddToFavorites}
          >
            Add to Favorites
          </button>
        </div>
      </div>
    </>
  );
};

export default FullRecipe;

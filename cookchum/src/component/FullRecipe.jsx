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
      recipe: { recipeId: recipe.recipeId }, // Use `recipe.recipeId` for the nested recipe object
      user: { userId: userId }, // Use the passed `userId`
      dateAdded: new Date().toISOString().split("T")[0], // Format date as "YYYY-MM-DD"
    };
    console.log("Recipe:",favoriteRecipe);
    try {
      const response = await axios.post(
        "http://localhost:8080/api/favRecipes/postFavRecipe",
        favoriteRecipe,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      alert("Recipe added to favorites!");
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error adding recipe to favorites:", error);
      alert("Failed to add recipe to favorites. Please try again.");
    }
  };

  return (
    <div className="full-recipe-container">
      <h1>{recipe.name}</h1>
      <p>{recipe.description}</p>
      <h4>Estimated Cost: ${recipe.estimatedCost.toFixed(2)}</h4>
      <h3>Ingredients:</h3>
      <ul>
        {recipe.ingredients.map((ingredient) => (
          <li key={ingredient.ingredientId}>{ingredient.name}</li>
        ))}
      </ul>
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
  );
};

export default FullRecipe;

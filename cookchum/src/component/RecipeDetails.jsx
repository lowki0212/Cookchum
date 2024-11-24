import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const RecipeDetails = () => {
  const { recipeId } = useParams(); // Extract the recipeId from the URL
  const [recipe, setRecipe] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipeDetails = async (id) => {
      try {
        const response = await axios.get(`http://localhost:8080/api/recipe/getRecipe/${id}`);
        setRecipe(response.data);
      } catch (error) {
        console.error("Error fetching recipe details:", error.message);
      }
    };

    if (recipeId) {
      fetchRecipeDetails(recipeId); // Pass recipeId as an argument
    }
  }, [recipeId]);

  if (!recipe) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>{recipe.name}</h1>
      <p><strong>Description:</strong> {recipe.description}</p>
      <p><strong>Estimated Cost:</strong> ${recipe.estimatedCost.toFixed(2)}</p>
      <h3>Ingredients:</h3>
      <ul>
        {recipe.ingredients.map((ingredient) => (
          <li key={ingredient.ingredientId}>{ingredient.name}</li>
        ))}
      </ul>
      <button onClick={() => navigate(-1)}>Back</button>
    </div>
  );
};

export default RecipeDetails;

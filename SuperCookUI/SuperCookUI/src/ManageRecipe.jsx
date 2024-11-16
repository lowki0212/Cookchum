import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ManageRecipe = () => {
  const [recipes, setRecipes] = useState([]);
  const [newRecipe, setNewRecipe] = useState({
    title: "",
    description: "",
    estimatedCost: "",
    ingredients: [],
  });
  const [ingredients] = useState([
    "Garlic",
    "Rice",
    "Soy Sauce",
    "Onion",
    "Chili Powder",
    "Vinegar",
    "Sugar",
    "Chicken",
    "Smoke Paprika Powder",
    "Ground Beef",
    "Hungarian Sausage",
    "Tomato Sauce",
    "Tomato Paste",
  ]);
  const navigate = useNavigate();

  // Fetch all recipes from the backend
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/recipe/getAllRecipes");
        setRecipes(response.data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipes();
  }, []);

  // Add recipe to the backend
  const handleAddRecipe = async () => {
    if (newRecipe.title && newRecipe.description && newRecipe.estimatedCost) {
      try {
        const response = await axios.post("http://localhost:3000/api/recipe/postRecipe", {
          name: newRecipe.title,
          description: newRecipe.description,
          estimatedCost: parseFloat(newRecipe.estimatedCost), // Ensure cost is sent as a number
          ingredients: newRecipe.ingredients,
          adminId: 1, // Example adminId, update as per your context
        });

        setRecipes([...recipes, response.data]);
        setNewRecipe({ title: "", description: "", estimatedCost: "", ingredients: [] });
      } catch (error) {
        console.error("Error adding recipe:", error);
      }
    }
  };

  // Delete recipe from the backend
  const handleDeleteRecipe = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/recipe/deleteRecipe/${id}`);
      setRecipes(recipes.filter((recipe) => recipe.recipeId !== id));
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };

  // Toggle ingredient selection
  const toggleIngredient = (ingredient) => {
    setNewRecipe((prev) => {
      const isSelected = prev.ingredients.includes(ingredient);
      return {
        ...prev,
        ingredients: isSelected
          ? prev.ingredients.filter((ing) => ing !== ingredient)
          : [...prev.ingredients, ingredient],
      };
    });
  };

  return (
    <div style={styles.container}>
      {/* Navbar */}
      <nav style={styles.navbar}>
        <div style={styles.logoContainer}>
          <h1 style={styles.logo}>CookChum</h1>
        </div>
        <div style={styles.navLinks}>
          <button style={styles.navButton} onClick={() => navigate("/ManageRecipe")}>
            Manage Recipe
          </button>
          <button style={styles.navButton} onClick={() => navigate("/AddIngredients")}>
            Add Ingredients
          </button>
        </div>
        <input type="search" placeholder="Search" style={styles.searchBar} />
        <button style={styles.logoutButton} onClick={() => navigate("/AdminLogin")}>
          Sign Out
        </button>
      </nav>

      {/* Content */}
      <div style={styles.content}>
        {/* Add Recipe */}
        <div style={styles.addRecipeContainer}>
          <h2 style={styles.sectionTitle}>Add Recipe and Manage Recipe</h2>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Recipe Title</label>
            <input
              type="text"
              value={newRecipe.title}
              onChange={(e) => setNewRecipe({ ...newRecipe, title: e.target.value })}
              style={styles.input}
              placeholder="Recipe Name"
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Description and Instruction</label>
            <textarea
              value={newRecipe.description}
              onChange={(e) => setNewRecipe({ ...newRecipe, description: e.target.value })}
              style={styles.textarea}
              placeholder="Description and Instruction"
            ></textarea>
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Estimated Cost</label>
            <input
              type="number"
              value={newRecipe.estimatedCost}
              onChange={(e) => setNewRecipe({ ...newRecipe, estimatedCost: e.target.value })}
              style={styles.input}
              placeholder="Enter cost in USD"
            />
          </div>
          <div style={styles.ingredientsContainer}>
            <h3 style={styles.ingredientsTitle}>Ingredients</h3>
            <div style={styles.ingredientsList}>
              {ingredients.map((ingredient, index) => (
                <button
                  key={index}
                  style={{
                    ...styles.ingredientItem,
                    backgroundColor: newRecipe.ingredients.includes(ingredient) ? "#4CAF50" : "#f5f5f5",
                    color: newRecipe.ingredients.includes(ingredient) ? "#fff" : "#333",
                  }}
                  onClick={() => toggleIngredient(ingredient)}
                >
                  {ingredient}
                </button>
              ))}
            </div>
          </div>
          <div style={styles.buttons}>
            <button
              style={styles.cancelButton}
              onClick={() => setNewRecipe({ title: "", description: "", estimatedCost: "", ingredients: [] })}
            >
              Cancel
            </button>
            <button style={styles.addButton} onClick={handleAddRecipe}>
              Add Recipe
            </button>
          </div>
        </div>

        {/* Edit/Delete Recipe */}
        <div style={styles.recipeListContainer}>
          <h2 style={styles.sectionTitle}>Edit and Delete Recipe</h2>
          {recipes.map((recipe) => (
            <div key={recipe.recipeId} style={styles.recipeItem}>
              <span style={styles.recipeTitle}>{recipe.name}</span>
              <span style={styles.recipeCost}>Cost: ${recipe.estimatedCost.toFixed(2)}</span>
              <div>
                <button style={styles.deleteButton} onClick={() => handleDeleteRecipe(recipe.recipeId)}>
                  Delete
                </button>
                <button style={styles.editButton} onClick={() => handleEditRecipe(recipe.recipeId)}>
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};









// Styling
const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    margin: "0 auto",
    maxWidth: "1200px",
    padding: "20px",
  },
  navbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#333",
    padding: "15px 30px",
    borderBottom: "2px solid #ddd",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
    borderRadius: "10px",
  },
  logoContainer: {
    flex: 1,
  },
  logo: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#4CAF50",
  },
  navLinks: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "20px",
  },
  navButton: {
    backgroundColor: "transparent",
    color: "#fff",
    fontWeight: "bold",
    fontSize: "16px",
    border: "none",
    cursor: "pointer",
    padding: "10px 15px",
  },
  searchBar: {
    flexGrow: 1,
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    fontSize: "16px",
    margin: "0 auto",
    width: "30%",
  },
  logoutButton: {
    backgroundColor: "#f44336",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    padding: "10px 20px",
    cursor: "pointer",
    fontSize: "16px",
  },
  content: {
    display: "flex",
    gap: "30px",
    marginTop: "20px",
  },
  addRecipeContainer: {
    flex: 1,
    border: "1px solid #ddd",
    borderRadius: "10px",
    padding: "20px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#fff",
  },
  recipeListContainer: {
    flex: 1,
    border: "1px solid #ddd",
    borderRadius: "10px",
    padding: "20px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#fff",
  },
  sectionTitle: {
    fontSize: "20px",
    marginBottom: "15px",
    fontWeight: "bold",
    color: "#333",
  },
  inputGroup: {
    marginBottom: "15px",
  },
  label: {
    display: "block",
    marginBottom: "5px",
    fontWeight: "bold",
    color: "#555",
  },
  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ddd",
    fontSize: "16px",
  },
  textarea: {
    width: "100%",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ddd",
    fontSize: "16px",
    resize: "none",
    height: "100px",
  },
  ingredientsContainer: {
    marginTop: "15px",
  },
  ingredientsTitle: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "10px",
  },
  ingredientsList: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
  },
  ingredientItem: {
    padding: "8px 12px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "14px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  buttons: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "15px",
  },
  cancelButton: {
    backgroundColor: "#f44336",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    padding: "10px 20px",
    cursor: "pointer",
    fontSize: "16px",
  },
  addButton: {
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    padding: "10px 20px",
    cursor: "pointer",
    fontSize: "16px",
  },

  recipeItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "15px",
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#fff",
  },
  recipeTitle: {
    fontSize: "16px",
    fontWeight: "bold",
  },
  deleteButton: {
    backgroundColor: "#f44336",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    padding: "5px 15px", // Ensures proper button size
    marginRight: "10px",
    cursor: "pointer",
    fontSize: "14px",
    textAlign: "center",
    display: "inline-block", // Prevents collapsing
  },
  editButton: {
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    padding: "5px 15px", // Ensures proper button size
    cursor: "pointer",
    fontSize: "14px",
    textAlign: "center",
    display: "inline-block", // Prevents collapsing
  },



};

export default ManageRecipe;

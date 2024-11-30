import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddIngredients = () => {
  const [recipes, setRecipes] = useState([]); // List of available recipes
  const [selectedRecipeId, setSelectedRecipeId] = useState(null); // Selected recipe ID
  const [ingredients, setIngredients] = useState([]); // List of ingredients
  const [newIngredient, setNewIngredient] = useState(""); // Input for new ingredient
  const [editingIngredientId, setEditingIngredientId] = useState(null); // ID of ingredient being edited
  const [editedIngredientName, setEditedIngredientName] = useState(""); // Edited ingredient name
  const navigate = useNavigate();

  const API_URL_INGREDIENTS = "http://localhost:8080/api/ingredients";
  const API_URL_RECIPES = "http://localhost:8080/api/recipe";

  // Fetch ingredients and recipes from the backend on component mount
  useEffect(() => {
    const fetchIngredientsAndRecipes = async () => {
      try {
        // Fetch recipes
        const recipesResponse = await axios.get(`${API_URL_RECIPES}/getAllRecipes`);
        setRecipes(recipesResponse.data);

        // Fetch ingredients
        const ingredientsResponse = await axios.get(`${API_URL_INGREDIENTS}/getAllIngredients`);
        setIngredients(ingredientsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
        alert("Failed to fetch data. Please check your server.");
      }
    };

    fetchIngredientsAndRecipes();
  }, []);

  const handleAddIngredient = async () => {
    if (newIngredient.trim() && selectedRecipeId) {
      try {
        const response = await axios.post(`${API_URL_INGREDIENTS}/postIngredient`, {
          name: newIngredient.trim(),
          recipeId: selectedRecipeId, // Include recipe ID in the request body
        });
        setIngredients([...ingredients, response.data]); // Add the new ingredient
        setNewIngredient("");
      } catch (error) {
        console.error("Error adding ingredient:", error.message);
        alert("Failed to add ingredient. Please ensure all fields are filled correctly.");
      }
    } else {
      alert("Please select a recipe and enter an ingredient.");
    }
  };

  const handleDeleteIngredient = async (id) => {
    try {
      await axios.delete(`${API_URL_INGREDIENTS}/deleteIngredient/${id}`);
      setIngredients(ingredients.filter((ingredient) => ingredient.ingredientId !== id));
    } catch (error) {
      console.error("Error deleting ingredient:", error.message);
    }
  };

  const handleEditIngredient = (id, currentName) => {
    setEditingIngredientId(id);
    setEditedIngredientName(currentName);
  };

  const handleSaveEdit = async () => {
    if (editedIngredientName.trim()) {
      try {
        const response = await axios.put(`${API_URL_INGREDIENTS}/updateIngredientName/${editingIngredientId}`, {
          name: editedIngredientName.trim(),
        });

        // Update the ingredients list with the edited ingredient
        setIngredients(
          ingredients.map((ingredient) =>
            ingredient.ingredientId === editingIngredientId
              ? { ...ingredient, name: editedIngredientName }
              : ingredient
          )
        );

        setEditingIngredientId(null); // Clear the editing state
        setEditedIngredientName("");
      } catch (error) {
        console.error("Error updating ingredient:", error.message);
        alert("Failed to update ingredient.");
      }
    } else {
      alert("Please enter a valid ingredient name.");
    }
  };

  return (
    <div style={styles.container}>
      {/* Navbar */}
      <nav style={styles.navbar}>
        <h1 style={styles.logo}>CookChum</h1>
        <div style={styles.navLinks}>
          <button style={styles.navButton} onClick={() => navigate("/ManageRecipe")}>
            Manage Recipe
          </button>
          <button style={styles.navButton} onClick={() => navigate("/AddIngredients")}>
            Add Ingredients
          </button>
          <button style={styles.logoutButton} onClick={() => navigate("/AdminLogin")}>
            Sign Out
          </button>
        </div>
      </nav>

      {/* Content */}
      <div style={styles.content}>
        {/* Add Ingredients Section */}
        <div style={styles.addIngredientContainer}>
          <h2 style={styles.sectionTitle}>Add Ingredients</h2>

          {/* Recipe Selection */}
          <div style={styles.selectRecipe}>
            <h3>Select Recipe</h3>
            <select
              value={selectedRecipeId || ""}
              onChange={(e) => setSelectedRecipeId(e.target.value)}
              style={styles.input}
            >
              <option value="" disabled>
                Select a recipe
              </option>
              {recipes.map((recipe) => (
                <option key={recipe.recipeId} value={recipe.recipeId}>
                  {recipe.name}
                </option>
              ))}
            </select>
          </div>

          {/* Add Ingredient Input */}
          <input
            type="text"
            value={newIngredient}
            onChange={(e) => setNewIngredient(e.target.value)}
            placeholder="Ingredient"
            style={styles.input}
          />
          <div style={styles.buttons}>
            <button style={styles.cancelButton} onClick={() => setNewIngredient("")}>
              Cancel
            </button>
            <button style={styles.addButton} onClick={handleAddIngredient}>
              Add Ingredient
            </button>
          </div>
        </div>

        {/* Ingredients List Section */}
        <div style={styles.ingredientsListContainer}>
          <h2 style={styles.sectionTitle}>Ingredients</h2>
          {ingredients.length === 0 ? (
            <p>No ingredients added yet.</p>
          ) : (
            ingredients.map((ingredient) => (
              <div key={ingredient.ingredientId} style={styles.ingredientItem}>
                {editingIngredientId === ingredient.ingredientId ? (
                  <div style={styles.editingInput}>
                    <input
                      type="text"
                      value={editedIngredientName}
                      onChange={(e) => setEditedIngredientName(e.target.value)}
                      style={styles.input}
                    />
                    <button style={styles.addButton} onClick={handleSaveEdit}>
                      Save
                    </button>
                  </div>
                ) : (
                  <>
                    <span style={styles.ingredientName}>{ingredient.name}</span>
                    <button
                      style={styles.editButton}
                      onClick={() => handleEditIngredient(ingredient.ingredientId, ingredient.name)}
                    >
                      Edit
                    </button>
                    <button
                      style={styles.deleteButton}
                      onClick={() => handleDeleteIngredient(ingredient.ingredientId)}
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    margin: "0 auto",
    maxWidth: "1200px",
    padding: "120px",
  },
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#333",
    padding: "15px 30px",
    borderBottom: "2px solid #ddd",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
    marginBottom: "20px",
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
    flex: 2,
    display: "flex",
    justifyContent: "center",
    gap: "15px",
  },
  navButton: {
    backgroundColor: "transparent",
    color: "#fff",
    fontWeight: "bold",
    fontSize: "16px",
    border: "none",
    cursor: "pointer",
    padding: "10px 15px",
    borderBottom: "3px solid transparent",
  },
  searchBar: {
    flexGrow: 1,
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    fontSize: "16px",
    marginLeft: "10px",
    marginRight: "10px",
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
    gap: "20px",
  },
  addIngredientContainer: {
    flex: 1,
    border: "1px solid #ddd",
    borderRadius: "10px",
    padding: "20px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#fff",
  },
  ingredientsListContainer: {
    flex: 1,
    border: "1px solid #ddd",
    borderRadius: "10px",
    padding: "20px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#fff",
  },
  sectionTitle: {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "15px",
    color: "#333",
  },
  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ddd",
    fontSize: "16px",
    marginBottom: "15px",
  },
  buttons: {
    display: "flex",
    justifyContent: "space-between",
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
  ingredientItem: {
    display: "flex",
    alignItems: "center",
    marginBottom: "15px",
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    justifyContent: "flex-start", // Align items to the start
    gap: "10px", // Adds space between items
  },
  
  ingredientName: {
    fontSize: "16px",
    fontWeight: "bold",
    flex: 1, // Makes the ingredient name take available space but not too much
    whiteSpace: "nowrap", // Prevent the text from wrapping
    overflow: "hidden", // Ensure text doesn't overflow
    textOverflow: "ellipsis", // Show ellipsis for long text
  },
  deleteButton: {
    backgroundColor: "#f44336",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    padding: "5px 15px",
    marginRight: "10px",
    cursor: "pointer",
    fontSize: "14px",
  },
  editButton: {
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    padding: "5px 15px",
    cursor: "pointer",
    fontSize: "14px",
  },
};


export default AddIngredients;
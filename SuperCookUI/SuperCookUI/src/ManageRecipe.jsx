import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ManageRecipe = () => {
  const [recipes, setRecipes] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    estimatedCost: "",
    ingredients: [],
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentRecipeId, setCurrentRecipeId] = useState(null);
  const navigate = useNavigate();

  const ingredientsList = [
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
  ];

  // Fetch all recipes from the backend
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/recipe/getAllRecipes");
        setRecipes(response.data);
      } catch (error) {
        console.error("Error fetching recipes:", error.message);
        alert("Failed to fetch recipes. Please check your server.");
      }
    };

    fetchRecipes();
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleToggleIngredient = (ingredient) => {
    setFormData((prev) => {
      const isSelected = prev.ingredients.includes(ingredient);
      return {
        ...prev,
        ingredients: isSelected
          ? prev.ingredients.filter((ing) => ing !== ingredient)
          : [...prev.ingredients, ingredient],
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.description || !formData.estimatedCost) {
      alert("All fields are required!");
      return;
    }

    if (isEditMode) {
      const confirmUpdate = window.confirm("Are you sure you want to update this recipe?");
      if (confirmUpdate) {
        await handleUpdateRecipe();
      }
    } else {
      const confirmAdd = window.confirm("Are you sure you want to add this recipe?");
      if (confirmAdd) {
        await handleAddRecipe();
        alert("Recipe Added");
      }
    }
  };

  const handleAddRecipe = async () => {
    try {
      const response = await axios.post("http://localhost:8080/api/recipe/postRecipe", {
        name: formData.name,
        description: formData.description,
        estimatedCost: parseFloat(formData.estimatedCost),
        ingredients: formData.ingredients,
        admin: { adminId: 1 },
      });
      setRecipes([...recipes, response.data]);
      resetForm();
    } catch (error) {
      console.error("Error adding recipe:", error.message);
      alert("Failed to add recipe. Please try again.");
    }
  };

  const handleUpdateRecipe = async () => {
    try {
      await axios.put(`http://localhost:8080/api/recipe/updateRecipe/${currentRecipeId}`, {
        name: formData.name,
        description: formData.description,
        estimatedCost: parseFloat(formData.estimatedCost),
        ingredients: formData.ingredients,
      });
      setRecipes((prev) =>
        prev.map((recipe) =>
          recipe.recipeId === currentRecipeId ? { ...recipe, ...formData } : recipe
        )
      );
      resetForm();
    } catch (error) {
      console.error("Error updating recipe:", error.message);
      alert("Failed to update recipe. Please try again.");
    }
  };

  const handleDeleteRecipe = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this recipe?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:8080/api/recipe/deleteRecipe/${id}`);
        setRecipes(recipes.filter((recipe) => recipe.recipeId !== id));
      } catch (error) {
        console.error("Error deleting recipe:", error.message);
        alert("Failed to delete recipe. Please try again.");
      }
    }
  };

  const handleEditRecipe = (recipe) => {
    setFormData({
      name: recipe.name,
      description: recipe.description,
      estimatedCost: recipe.estimatedCost,
      ingredients: recipe.ingredients,
    });
    setIsEditMode(true);
    setCurrentRecipeId(recipe.recipeId);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      estimatedCost: "",
      ingredients: [],
    });
    setIsEditMode(false);
    setCurrentRecipeId(null);
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

      <div style={styles.content}>
        {/* Add/Edit Recipe Form */}
        <div style={styles.addRecipeContainer}>
          <h2 style={styles.sectionTitle}>Add Recipe and Manage Recipe</h2>
          <form onSubmit={handleSubmit}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Recipe Title</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                style={styles.input}
                placeholder="Recipe Name"
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Description and Instruction</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                style={styles.textarea}
                placeholder="Description and Instruction"
              ></textarea>
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Estimated Cost</label>
              <input
                type="number"
                name="estimatedCost"
                value={formData.estimatedCost}
                onChange={handleInputChange}
                style={styles.input}
                placeholder="Enter cost in USD"
              />
            </div>
            <div style={styles.ingredientsContainer}>
              <h3 style={styles.ingredientsTitle}>Ingredients</h3>
              <div style={styles.ingredientsList}>
                {ingredientsList.map((ingredient, index) => (
                  <button
                    key={index}
                    style={{
                      ...styles.ingredientItem,
                      backgroundColor: formData.ingredients.includes(ingredient)
                        ? "#4CAF50"
                        : "#f5f5f5",
                      color: formData.ingredients.includes(ingredient) ? "#fff" : "#333",
                    }}
                    onClick={() => handleToggleIngredient(ingredient)}
                    type="button"
                  >
                    {ingredient}
                  </button>
                ))}
              </div>
            </div>
            <div style={styles.buttons}>
              <button style={styles.cancelButton} onClick={resetForm} type="button">
                Cancel
              </button>
              <button style={styles.addButton} type="submit">
                {isEditMode ? "Update Recipe" : "Add Recipe"}
              </button>
            </div>
          </form>
        </div>

        {/* Edit/Delete Recipe Section */}
        <div style={styles.recipeListContainer}>
          <h2 style={styles.sectionTitle}>Edit and Delete Recipe</h2>
          {recipes.map((recipe) => (
            <div key={recipe.recipeId} style={styles.recipeItem}>
              <span style={styles.recipeTitle}>{recipe.name}</span>
              <div>
                <button
                  style={styles.deleteButton}
                  onClick={() => handleDeleteRecipe(recipe.recipeId)}
                >
                  Delete
                </button>
                <button
                  style={styles.editButton}
                  onClick={() => handleEditRecipe(recipe)}
                >
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

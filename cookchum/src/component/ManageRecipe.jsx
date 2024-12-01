import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ManageRecipe = () => {
  const [recipes, setRecipes] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    estimatedCost: "",
    calorie: "", // Added calorie field
  });
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentRecipeId, setCurrentRecipeId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [image, setImage] = useState(null); // Image file state
  const navigate = useNavigate();

  // Fetch all recipes
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
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSearchChange = (e) => setSearchQuery(e.target.value);

  const filteredRecipes = recipes.filter(
    (recipe) => recipe.name && typeof recipe.name === "string" && recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formDataToSubmit = new FormData();
    formDataToSubmit.append("name", formData.name);
    formDataToSubmit.append("description", formData.description);
    formDataToSubmit.append("estimatedCost", formData.estimatedCost);

    const calorieValue = formData.calories ? parseInt(formData.calories) : null;
    formDataToSubmit.append("calories", calorieValue); // Add calorie value (could be null if empty)
    
    formDataToSubmit.append("file", image); // Add image file
    formDataToSubmit.append("admin", JSON.stringify({ adminId: 1 })); // Add admin data
  
    try {
      if (isEditMode && currentRecipeId) {
        // Update existing recipe
        await axios.put('http://localhost:8080/api/recipe/updateRecipe/${currentRecipeId}', formDataToSubmit, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setRecipes((prev) =>
          prev.map((recipe) =>
            recipe.recipeId === currentRecipeId ? { ...recipe, ...formData } : recipe
          )
        );
        alert("Recipe updated successfully!");
      } else {
        // Add new recipe
        const response = await axios.post("http://localhost:8080/api/recipe/postRecipe", formDataToSubmit, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setRecipes([...recipes, response.data]);
        alert("Recipe added successfully!");
      }
  
      resetForm();
    } catch (error) {
      console.error("Error submitting recipe:", error.response?.data || error.message);
      alert("Failed to submit recipe. Please try again.");
    }
  };

  const handleAddRecipe = async () => {
    try {
      const response = await axios.post("http://localhost:8080/api/recipe/postRecipe", {
        name: formData.name,
        description: formData.description,
        estimatedCost: parseFloat(formData.estimatedCost),
        admin: { adminId: 1 },
      });
      setRecipes([...recipes, response.data]);
      resetForm();
      alert("Recipe added successfully!");
    } catch (error) {
      console.error("Error adding recipe:", error.message);
      alert("Failed to add recipe. Please try again.");
    }
  };

  const handleUpdateRecipe = async () => {
    try {
      await axios.put('http://localhost:8080/api/recipe/updateRecipe/${currentRecipeId}', {
        name: formData.name,
        description: formData.description,
        estimatedCost: parseFloat(formData.estimatedCost),
      });
      setRecipes((prev) =>
        prev.map((recipe) =>
          recipe.recipeId === currentRecipeId ? { ...recipe, ...formData } : recipe
        )
      );
      resetForm();
      alert("Recipe updated successfully!");
    } catch (error) {
      console.error("Error updating recipe:", error.message);
      alert("Failed to update recipe. Please try again.");
    }
  };

  const handleDeleteRecipe = async (id) => {
    if (window.confirm("Are you sure you want to delete this recipe?")) {
      try {
        await axios.delete(`http://localhost:8080/api/recipe/deleteRecipe/${id}`);
        setRecipes(recipes.filter((recipe) => recipe.recipeId !== id));
        alert("Recipe deleted successfully!");
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
      calories: recipe.calories,
    });
    setImage(null);
    setIsEditMode(true);
    setCurrentRecipeId(recipe.recipeId);
  };

  const resetForm = () => {
    setFormData({ name: "", description: "", estimatedCost: "", calories: "" });
    setImage(null);
    setIsEditMode(false);
    setCurrentRecipeId(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);  // Update the state with the selected file
    console.log(file);  // Check if it's a valid file object
  };


  const handleViewDetails = (recipeId) => navigate('/recipeDetails/${recipeId}');

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
        {/* Add/Edit Recipe Form */}
        <div style={styles.addRecipeContainer}>
          <h2 style={styles.sectionTitle}>{isEditMode ? "Edit Recipe" : "Add Recipe"}</h2>
          
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
            
            {/* Upload Image */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>Upload Recipe Image</label>
              <input type="file" onChange={handleImageChange} style={styles.input} />
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

            <div style={styles.inputGroup}>
              <label style={styles.label}>Calories</label>
              <input
                type="number"
                name="calories"
                value={formData.calories}
                onChange={handleInputChange}
                style={styles.input}
                placeholder="Enter calories"
              />
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

        {/* Recipe List Section */}
        <div style={styles.recipeListContainer}>
          <h2 style={styles.sectionTitle}>Recipes</h2>
          {recipes.length === 0 ? (
            <p style={{ textAlign: "center", color: "#777" }}>No recipes available. Add a new one!</p>
          ) : (
            filteredRecipes.map((recipe) => (
              <div key={recipe.recipeId} style={styles.recipeItem}>
                <span style={styles.recipeTitle}>{recipe.name}</span>
                <div>
                  <button style={styles.editButton} onClick={() => handleEditRecipe(recipe)}>
                    Edit
                  </button>
                  <button style={styles.deleteButton} onClick={() => handleDeleteRecipe(recipe.recipeId)}>
                    Delete
                  </button>
                  <button style={styles.viewDetailsButton} onClick={() => handleViewDetails(recipe.recipeId)}>
                    View Details
                  </button>
                </div>
              </div>
            ))
          )}
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

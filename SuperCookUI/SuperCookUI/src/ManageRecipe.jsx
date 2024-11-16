import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ManageRecipe = () => {
  const [recipes, setRecipes] = useState([
    { id: 1, title: "Chicken Adobo" },
    { id: 2, title: "Chicken Adobo" },
    { id: 3, title: "Chicken Adobo" },
    { id: 4, title: "Chicken Adobo" },
    { id: 5, title: "Chicken Adobo" },
  ]);
  const [newRecipe, setNewRecipe] = useState({ title: "", description: "" });
  const navigate = useNavigate();

  const handleAddRecipe = () => {
    if (newRecipe.title && newRecipe.description) {
      setRecipes([...recipes, { id: Date.now(), title: newRecipe.title }]);
      setNewRecipe({ title: "", description: "" });
    }
  };

  const handleDeleteRecipe = (id) => {
    setRecipes(recipes.filter((recipe) => recipe.id !== id));
  };

  const handleEditRecipe = (id) => {
    const recipe = recipes.find((recipe) => recipe.id === id);
    setNewRecipe({ title: recipe.title, description: "" });
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
          <button style={styles.navButton} onClick={() => navigate("/SeeRecipes")}>
            See Recipes
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
          <div style={styles.buttons}>
            <button style={styles.cancelButton} onClick={() => setNewRecipe({ title: "", description: "" })}>
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
            <div key={recipe.id} style={styles.recipeItem}>
              <span style={styles.recipeTitle}>{recipe.title}</span>
              <div>
                <button style={styles.deleteButton} onClick={() => handleDeleteRecipe(recipe.id)}>
                  Delete
                </button>
                <button style={styles.editButton} onClick={() => handleEditRecipe(recipe.id)}>
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
    fontFamily: "Arial, sans-serif", // Changed to Arial
    margin: "0 auto",
    maxWidth: "1200px",
    padding: "20px",
  },
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#333",
    padding: "15px 30px",
    borderBottom: "2px solid #ddd",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
    width: "1800px", // Set the width to 90% of the page width
    maxWidth: "1900px", // Set a max-width for larger screens
    margin: "0 auto", // Center the navbar horizontally
    borderRadius: "10px", // Optional: Add rounded edges
    marginLeft: "-350px", // Move the navbar 10px to the left
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
    color: "#333",
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
    marginLeft: "-60px", //move to the left
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
  recipeItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "15px",
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
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
    padding: "5px 10px",
    marginRight: "5px",
    cursor: "pointer",
    fontSize: "14px",
  },
  editButton: {
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    padding: "5px 10px",
    cursor: "pointer",
    fontSize: "14px",
  },
};

export default ManageRecipe;

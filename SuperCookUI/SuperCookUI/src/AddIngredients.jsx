import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddIngredients = () => {
  const [ingredients, setIngredients] = useState([
    { id: 1, name: "Onion" },
    { id: 2, name: "Garlic" },
    { id: 3, name: "Paprika" },
    { id: 4, name: "Soy Sauce" },
    { id: 5, name: "Rice" },
  ]);
  const [newIngredient, setNewIngredient] = useState("");
  const navigate = useNavigate();

  const handleAddIngredient = () => {
    if (newIngredient.trim()) {
      setIngredients([
        ...ingredients,
        { id: Date.now(), name: newIngredient.trim() },
      ]);
      setNewIngredient("");
    }
  };

  const handleDeleteIngredient = (id) => {
    setIngredients(ingredients.filter((ingredient) => ingredient.id !== id));
  };

  const handleEditIngredient = (id) => {
    const ingredient = ingredients.find((ingredient) => ingredient.id === id);
    setNewIngredient(ingredient.name);
    setIngredients(ingredients.filter((ingredient) => ingredient.id !== id));
  };

  return (
    <div style={styles.container}>
      {/* Navbar */}
      <nav style={styles.navbar}>
        <div style={styles.logoContainer}>
          <h1 style={styles.logo}>CookChum</h1>
        </div>
        <div style={styles.navLinks}>
          <button
            style={styles.navButton}
            onClick={() => navigate("/ManageRecipe")}
          >
            Manage Recipe
          </button>
          <button
            style={styles.navButton}
            onClick={() => navigate("/AddIngredients")}
          >
            Add Ingredients
          </button>
        </div>
        <input type="search" placeholder="Search" style={styles.searchBar} />
        <button
          style={styles.logoutButton}
          onClick={() => navigate("/AdminLogin")}
        >
          Sign Out
        </button>
      </nav>

      {/* Content */}
      <div style={styles.content}>
        {/* Add Ingredients Section */}
        <div style={styles.addIngredientContainer}>
          <h2 style={styles.sectionTitle}>Add Ingredients</h2>
          <input
            type="text"
            value={newIngredient}
            onChange={(e) => setNewIngredient(e.target.value)}
            placeholder="Ingredients"
            style={styles.input}
          />
          <div style={styles.buttons}>
            <button
              style={styles.cancelButton}
              onClick={() => setNewIngredient("")}
            >
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
          {ingredients.map((ingredient) => (
            <div key={ingredient.id} style={styles.ingredientItem}>
              <span style={styles.ingredientName}>{ingredient.name}</span>
              <div>
                <button
                  style={styles.deleteButton}
                  onClick={() => handleDeleteIngredient(ingredient.id)}
                >
                  Delete
                </button>
                <button
                  style={styles.editButton}
                  onClick={() => handleEditIngredient(ingredient.id)}
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

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
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
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "15px",
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  ingredientName: {
    fontSize: "16px",
    fontWeight: "bold",
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

import React, { useEffect, useState } from "react";
import axios from "axios";

const Homepage = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/recipe/getAllRecipes');
      setRecipes(response.data);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  return (
    <div style={styles.container}>
      <header style={styles.navbar}>
        <h1 style={styles.logo}>CookChum</h1>
        <nav style={styles.navLinks}>
          <button style={styles.navButton}>Recipes</button>
          <button style={styles.navButton}>Favorites</button>
          <button style={styles.navButton}>BMI Calculator</button>
          <button style={styles.navButton}>Login</button>
        </nav>
      </header>
      <div style={styles.main}>
        <aside style={styles.sidebar}>
          <div style={styles.filterSection}>
            <h4 style={styles.filterTitle}>Price</h4>
            <input type="range" min="0" max="50" style={styles.rangeInput} />
            <p style={styles.priceText}>Price: 50 — 1,500</p>
          </div>
          <div style={styles.filterSection}>
            <h4 style={styles.filterTitle}>Rating</h4>
            <label style={styles.radioLabel}>
              <input type="radio" />
              4.0 & up
            </label>
            <label style={styles.radioLabel}>
              <input type="radio" />
              3.0 & up
            </label>
            <label style={styles.radioLabel}>
              <input type="radio" />
              2.0 & up
            </label>
            <label style={styles.radioLabel}>
              <input type="radio" />
              1.0
            </label>
          </div>
          <div style={styles.filterSection}>
            <h4 style={styles.filterTitle}>Ingredients</h4>
            <div style={styles.ingredientTags}>
              {["Onion", "Garlic", "Paprika", "Chicken", "Vinegar", "Beef", "Pepper"].map(
                (ingredient, index) => (
                  <span key={index} style={styles.ingredientTag}>
                    {ingredient}
                  </span>
                )
              )}
            </div>
          </div>
        </aside>
        <section style={styles.content}>
          <div style={styles.recipeList}>
            {recipes.map((recipe) => (
              <div style={styles.recipeCard} key={recipe.recipeId}>
                <h3 style={styles.recipeTitle}>{recipe.name}</h3>
                <p style={styles.recipeDescription}>{recipe.description}</p>
                <div style={styles.ingredients}>
                  {recipe.ingredients.map((ingredient, index) => (
                    <span key={index} style={styles.ingredientTag}>
                      {ingredient.name}
                    </span>
                  ))}
                </div>
                <div style={styles.recipeFooter}>
                  <p style={styles.cost}>{recipe.estimatedCost}</p>
                  <p style={styles.rating}>⭐ {recipe.rating}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f9f9f9",
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
  logo: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "white",
  },
  main: {
    display: "flex",
  },
  sidebar: {
    width: "300px",
    backgroundColor: "#fff",
    padding: "20px",
    borderRight: "1px solid #ddd",
  },
  filterSection: {
    marginBottom: "20px",
  },
  filterTitle: {
    fontSize: "18px",
    marginBottom: "10px",
  },
  rangeInput: {
    width: "100%",
  },
  priceText: {
    marginTop: "10px",
    fontSize: "14px",
    color: "#666",
  },
  radioLabel: {
    display: "block",
    marginTop: "5px",
    fontSize: "14px",
  },
  ingredientTags: {
    display: "flex",
    flexWrap: "wrap",
    gap: "5px",
  },
  ingredientTag: {
    backgroundColor: "#f0f0f0",
    padding: "5px 10px",
    borderRadius: "5px",
    fontSize: "12px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  content: {
    flex: 1,
    padding: "20px",
  },
  recipeList: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "20px",
  },
  recipeCard: {
    backgroundColor: "white",
    border: "1px solid #ddd",
    borderRadius: "10px",
    padding: "20px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.3s",
  },
  recipeTitle: {
    fontSize: "20px",
    marginBottom: "10px",
    fontWeight: "bold",
  },
  recipeDescription: {
    fontSize: "14px",
    color: "#666",
    marginBottom: "10px",
  },
  ingredients: {
    display: "flex",
    flexWrap: "wrap",
    gap: "5px",
    marginBottom: "10px",
  },
  recipeFooter: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "10px",
  },
  cost: {
    fontSize: "16px",
    color: "green",
    fontWeight: "bold",
  },
  rating: {
    fontSize: "14px",
    color: "orange",
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
};

export default Homepage;

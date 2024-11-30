package projectappdev.supercook.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;

@Entity
@Table(name = "ingredient")
public class IngredientEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ingredient_id")
    private int ingredientId;

    @Column(name = "name", nullable = false, length = 100)
    private String name;

    // Many-to-One with Recipe
    @ManyToOne
    @JoinColumn(name = "recipe_id", nullable = false)
    @JsonBackReference // To prevent recursion in JSON
    private RecipeEntity recipe;

    // Default constructor
    public IngredientEntity() {}

    public IngredientEntity(int ingredientId, String name, RecipeEntity recipe) {
        this.ingredientId = ingredientId;
        this.name = name;
        this.recipe = recipe;
    }

    // Getters and Setters

    public int getIngredientId() {
        return ingredientId;
    }

    public void setIngredientId(int ingredientId) {
        this.ingredientId = ingredientId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public RecipeEntity getRecipe() {
        return recipe;
    }

    public void setRecipe(RecipeEntity recipe) {
        this.recipe = recipe;
    }
    @JsonProperty("recipeId")
    public int getRecipeId() {
        return recipe.getRecipeId();
    }
}
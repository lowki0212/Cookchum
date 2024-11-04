package projectappdev.supercook.entity;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "recipe")
public class RecipeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "recipeId")
    private int recipeId;

    private String name;
    private String description;
    private float estimatedCost;

    // Many-to-One with User
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private UserEntity user;

    // One-to-Many with Ingredients
    @OneToMany(mappedBy = "recipe", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<IngredientEntity> ingredients;

    public RecipeEntity() {
        super();
    }

    public RecipeEntity(int recipeId, String name, String description, float estimatedCost, List<IngredientEntity> ingredients) {
        super();
        this.recipeId = recipeId;
        this.name = name;
        this.description = description;
        this.estimatedCost = estimatedCost;
        this.ingredients = ingredients;
    }

    // Getters and setters

    public int getRecipeId() {
        return recipeId;
    }

    public void setRecipeId(int recipeId) {
        this.recipeId = recipeId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public float getEstimatedCost() {
        return estimatedCost;
    }

    public void setEstimatedCost(float estimatedCost) {
        this.estimatedCost = estimatedCost;
    }

    public List<IngredientEntity> getIngredients() {
        return ingredients;
    }

    public void setIngredients(List<IngredientEntity> ingredients) {
        this.ingredients = ingredients;
    }

    public UserEntity getUser () {
        return user;
    }

    public void setUser (UserEntity user) {
        this.user = user;
    }
}
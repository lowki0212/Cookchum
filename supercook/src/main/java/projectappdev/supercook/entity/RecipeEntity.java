package projectappdev.supercook.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
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

    @Lob
    @Column(name = "image", columnDefinition = "LONGBLOB")
    private byte[] image; // Store the image as a byte array
    
    @OneToMany(mappedBy = "recipe", orphanRemoval = true)
    @JsonBackReference("recipe-favRecipe")
    private List<FavRecipeEntity> favRecipes;

    // Many-to-One with Admin
    @ManyToOne
    @JoinColumn(name = "adminId", nullable = false)
    private AdminEntity admin;

    // One-to-Many with Ingredients
    @OneToMany(mappedBy = "recipe", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonBackReference
    private List<IngredientEntity> ingredients;

    public RecipeEntity() {
        super();
    }

    public RecipeEntity(int recipeId, String name, String description, byte[] image, float estimatedCost, List<IngredientEntity> ingredients) {
        super();
        this.recipeId = recipeId;
        this.name = name;
        this.description = description;
        this.estimatedCost = estimatedCost;
        this.ingredients = ingredients;
        this.image = image;
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

    public AdminEntity getAdmin() {
        return admin;
    }

    public void setAdmin(AdminEntity admin) {
        this.admin = admin;
    }
    
    public List<FavRecipeEntity> getFavRecipes() {
        return favRecipes;
    }
    public void setFavRecipes(List<FavRecipeEntity> favRecipes) {
        this.favRecipes = favRecipes;
    }

    public byte[] getImageUrl() {
        return image;
    }

    public void setImageUrl(byte[] image) {
        this.image = image;
    }
}
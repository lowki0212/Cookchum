package projectappdev.supercook.entity;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "fav_recipe")
public class FavRecipeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "favoriteId")
    private int favoriteId;
    
   
    
    
    private int rating;
    private LocalDate dateAdded;

    // Many-to-One with User
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @JsonBackReference("user-favRecipe")
    private UserEntity user;

    // Many-to-One with Recipe
    @ManyToOne
    @JoinColumn(name = "recipe_id", nullable = false)
    @JsonBackReference("recipe-favRecipe")
    private RecipeEntity recipe;
    
    public FavRecipeEntity() {
        super();
    }   

    public FavRecipeEntity(int favoriteId, UserEntity user, RecipeEntity recipe, int rating, LocalDate dateAdded) {
        super();
        this.favoriteId = favoriteId;
        this.user = user;
        this.recipe = recipe;
        this.rating = rating;
        this.dateAdded = dateAdded;
    }

    // Getters and setters

    public int getFavoriteId() {
        return favoriteId;
    }

    public void setFavoriteId(int favoriteId) {
        this.favoriteId = favoriteId;
    }

    public UserEntity getUser() {
        return user;
    }

    public void setUser(UserEntity user) {
        this.user = user;
    }

    public RecipeEntity getRecipe() {
        return recipe;
    }

    public void setRecipe(RecipeEntity recipe) {
        this.recipe = recipe;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public LocalDate getDateAdded() {
        return dateAdded;
    }

    public void setDateAdded(LocalDate dateAdded) {
        this.dateAdded = dateAdded;
    }
}

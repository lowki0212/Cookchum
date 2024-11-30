package projectappdev.supercook.entity;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "reviews")
public class ReviewsEntity {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "review_Id")
    private int reviewId;
    
	private int rating;
	private String reviewText;
	
    private LocalDate reviewDate;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnoreProperties({"password", "email", "favoriteRecipes", "reviews"})  // To prevent recursion in JSON
    private UserEntity user;
    
    @ManyToOne
    @JoinColumn(name = "recipe_id",nullable = false)
    @JsonIgnoreProperties({"admin", "ingredients", "favRecipes", "reviews"})
    private RecipeEntity recipe;
    		
    public ReviewsEntity() {
        super();
    }   

    public ReviewsEntity(int reviewId, UserEntity user, RecipeEntity recipe, String reviewText,int rating, LocalDate reviewDate) {
        super();
        this.reviewId = reviewId;
        this.user = user;
        this.recipe = recipe;
        this.reviewText = reviewText;
        this.rating = rating;
        this.reviewDate = reviewDate;
    }

    // Getters and setters

    public int getReviewId() {
        return reviewId;
    }

    public void setReviewId(int reviewId) {
        this.reviewId = reviewId;
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
    
    public void setReviewText(String reviewText) {
    	this.reviewText = reviewText;
    }
    
    public String getReviewText() {
    	return reviewText;
    }
    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public LocalDate getReviewDate() {
        return reviewDate;
    }
    
    public void setReviewDate(LocalDate reviewDate) {
        this.reviewDate = reviewDate;
    }
}

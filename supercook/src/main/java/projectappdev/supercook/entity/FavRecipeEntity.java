package projectappdev.supercook.entity;
	
	import java.time.LocalDate;
	
	import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonProperty;
	
	import jakarta.persistence.CascadeType;
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
	@JsonIgnoreProperties(ignoreUnknown = true)
	public class FavRecipeEntity {
	    @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    @Column(name = "favoriteId")
	    private int favoriteId;
	    
	    
	    
	    @JsonFormat(pattern = "yyyy-MM-dd")
	    private LocalDate dateAdded;
	
	    // Many-to-One with User
	    @ManyToOne
	    @JoinColumn(name = "user_id", nullable = false)
	    
	    private UserEntity user;
	
	    // Many-to-One with Recipe
	    @ManyToOne
	    @JoinColumn(name = "recipe_id",nullable = false)
	   
	    private RecipeEntity recipe;
	    		
	    public FavRecipeEntity() {
	        super();
	    }   
	
	    public FavRecipeEntity(int favoriteId, UserEntity user, RecipeEntity recipe, LocalDate dateAdded) {
	        super();
	        this.favoriteId = favoriteId;
	        this.user = user;
	        this.recipe = recipe;
	    
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
	
	    public LocalDate getDateAdded() {
	        return dateAdded;
	    }
	
	    public void setDateAdded(LocalDate dateAdded) {
	        this.dateAdded = dateAdded;
	    }
	}
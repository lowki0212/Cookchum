package projectappdev.supercook.service;

import java.time.LocalDate;
import java.util.List;
import java.util.NoSuchElementException;

import javax.naming.NameNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import projectappdev.supercook.entity.FavRecipeEntity;
import projectappdev.supercook.repository.FavRecipeRepository;
import projectappdev.supercook.repository.RecipeRepository;
import projectappdev.supercook.repository.UserRepository;


@Service
public class FavRecipeService {
	@Autowired
	FavRecipeRepository frepo;
	
	@Autowired
	private UserRepository urepo;

	@Autowired
	private RecipeRepository rrepo;
	
	public FavRecipeService() {
		super();
		// TODO Auto-generated constructor stub
		
	}
	
	//Create of CRUD
	public FavRecipeEntity postFavRecipeRecord(FavRecipeEntity recipe) {
		if (recipe.getDateAdded() == null) {  // Set to current date if not provided
            recipe.setDateAdded(LocalDate.now());
        }
		
		if (recipe.getRecipe() != null && recipe.getRecipe().getRecipeId() > 0) {
			recipe.setRecipe(rrepo.findById(recipe.getRecipe().getRecipeId())
	            .orElseThrow(() -> new IllegalArgumentException("Recipe not found.")));
	    } else {
	        throw new IllegalArgumentException("Recipe is required.");
	    }

	    // Fetch the UserEntity if only userId is provided
	    if (recipe.getUser() != null && recipe.getUser().getUserId() > 0) {
	    	recipe.setUser(urepo.findById(recipe.getUser().getUserId())
	            .orElseThrow(() -> new IllegalArgumentException("User not found.")));
	    } else {
	        throw new IllegalArgumentException("User is required.");
	    }
        return frepo.save(recipe);
	}

	//Read of CRUD 	
	public List<FavRecipeEntity> getFavRecipeRecord(){
		return frepo.findAll();
	}
	//Update of CRUD
	@SuppressWarnings("finally")
	public FavRecipeEntity putFavRecipeDetails(int id,FavRecipeEntity newFavRecipe) {
		FavRecipeEntity recipe = new FavRecipeEntity();
		try {
			recipe = frepo.findById(id).get();
			recipe.setRating(newFavRecipe.getRating());
			 if (newFavRecipe.getDateAdded() != null) {  // Only set date if provided
	                recipe.setDateAdded(newFavRecipe.getDateAdded());
	            } else {
	                recipe.setDateAdded(LocalDate.now());
	            }
		}catch(NoSuchElementException nex) {
			throw new NameNotFoundException("Student"+id+"not found");
		}finally {
			return frepo.save(recipe);
		}
	}
	//Delete
	public String deteleFavRecipe(int id) {
		String msg ="";
		if(frepo.findById(id)!=null) {
			frepo.deleteById(id);
			msg = "Record successfully deleted!";
		}else
			msg = id + "NOT found!";
		return msg;
	}
}
package projectappdev.supercook.service;

import java.time.LocalDate;
import java.util.List;
import java.util.NoSuchElementException;

import javax.naming.NameNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import projectappdev.supercook.entity.FavRecipeEntity;
import projectappdev.supercook.repository.FavRecipeRepository;


@Service
public class FavRecipeService {
	@Autowired
	FavRecipeRepository frepo;
	
	public FavRecipeService() {
		super();
		// TODO Auto-generated constructor stub
		
	}
	
	//Create of CRUD
	public FavRecipeEntity postFavRecipeRecord(FavRecipeEntity recipe) {
		if (recipe.getDateAdded() == null) {  // Set to current date if not provided
            recipe.setDateAdded(LocalDate.now());
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
			msg = "Student Record successfully deleted!";
		}else
			msg = id + "NOT found!";
		return msg;
	}
}
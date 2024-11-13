package projectappdev.supercook.service;

import java.time.LocalDate;
import java.util.List;
import java.util.NoSuchElementException;

import javax.naming.NameNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import projectappdev.supercook.entity.ReviewsEntity;

import projectappdev.supercook.repository.RecipeRepository;
import projectappdev.supercook.repository.ReviewsRepository;
import projectappdev.supercook.repository.UserRepository;

@Service
public class ReviewsService {
	@Autowired
	ReviewsRepository rvrepo;
	
	@Autowired
	private UserRepository urepo;

	@Autowired
	private RecipeRepository rrepo;
	
	public ReviewsService() {
		super();
		// TODO Auto-generated constructor stub
		
	}
	
	//Create of CRUD
	public ReviewsEntity postReviewRecord(ReviewsEntity review) {
	    // Automatically set the review date to the current date
	    review.setReviewDate(LocalDate.now());
	    
	    // Check if recipe is provided and valid
	    if (review.getRecipe() != null && review.getRecipe().getRecipeId() > 0) {
	        review.setRecipe(rrepo.findById(review.getRecipe().getRecipeId())
	            .orElseThrow(() -> new IllegalArgumentException("Recipe not found.")));
	    } else {
	        throw new IllegalArgumentException("Recipe is required.");
	    }

	    // Fetch the UserEntity if only userId is provided
	    if (review.getUser() != null && review.getUser().getUserId() > 0) {
	        review.setUser(urepo.findById(review.getUser().getUserId())
	            .orElseThrow(() -> new IllegalArgumentException("User not found.")));
	    } else {
	        throw new IllegalArgumentException("User is required.");
	    }
	    
	    return rvrepo.save(review);
	}

	//Read of CRUD 	
	public List<ReviewsEntity> getReviewRecord(){
		return rvrepo.findAll();
	}
	//Update of CRUD
	@SuppressWarnings("finally")
	public ReviewsEntity putReviewDetails(int id,ReviewsEntity newReview) {
		ReviewsEntity review = new ReviewsEntity();
		try {
			review = rvrepo.findById(id).get();
			review.setReviewText(newReview.getReviewText());
			review.setRating(newReview.getRating());
			review.setReviewDate(LocalDate.now());
		}catch(NoSuchElementException nex) {
			throw new NameNotFoundException(id+"not found");
		}finally {
			review.setRecipe(review.getRecipe());
			review.setUser(review.getUser());
			return rvrepo.save(review);
		}
	}
	//Delete
	public String deteleReview(int id) {
		String msg ="";
		if(rvrepo.findById(id)!=null) {
			rvrepo.deleteById(id);
			msg = "Review successfully deleted!";
		}else
			msg = id + "NOT found!";
		return msg;
	}
}

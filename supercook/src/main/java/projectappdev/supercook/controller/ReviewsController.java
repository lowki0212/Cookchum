package projectappdev.supercook.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import projectappdev.supercook.entity.ReviewsEntity;
import projectappdev.supercook.service.ReviewsService;

@RestController
@RequestMapping("/api/reviews")
public class ReviewsController {
	@Autowired
	ReviewsService rserv;
	
	
	//Create of CRUD
	@PostMapping(value = "/postReview", consumes = {"application/json", "application/json;charset=UTF-8"}, produces = "application/json")
	public ReviewsEntity postFavRecipeRecord(@RequestBody ReviewsEntity recipe) {
		 System.out.println("Received recipe: " + recipe);
		return rserv.postReviewRecord(recipe);
	}
	
	//Read of CRUD
	@GetMapping("/getReview")
	public List<ReviewsEntity> getFavRecipeRecord(){
		System.out.println("getReview method was called");
		List<ReviewsEntity> reviews = rserv.getReviewRecord();
		reviews.forEach(revs -> System.out.println("Rating: " + revs.getRating()));
		return rserv.getReviewRecord();
	}
	//Update of CRUD
	@PutMapping("/putReview")
	public ReviewsEntity putFavRecipeDetails(@RequestParam("id") int id,@RequestBody ReviewsEntity newReview){
		return rserv.putReviewDetails(id, newReview);
	}
	//Delete of CRUD
	@DeleteMapping("/deleteReview/{id}")
	public String deteleFavRecipe(@PathVariable("id") int id) {
		return rserv.deteleReview(id);
	}
}

package projectappdev.supercook.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import projectappdev.supercook.entity.FavRecipeEntity;
import projectappdev.supercook.service.FavRecipeService;

@RestController
@RequestMapping("/api/favRecipes")
@CrossOrigin(origins = "http://localhost:3000") // Adjust the origin if needed
public class FavRecipeController {

    @Autowired
    private FavRecipeService fserv;

    // Create a favorite recipe
    @PostMapping(value = "/postFavRecipe", consumes = "application/json", produces = "application/json")
    public ResponseEntity<FavRecipeEntity> postFavRecipeRecord(@RequestBody FavRecipeEntity recipe) {
        System.out.println("Received favorite recipe: " + recipe);
        FavRecipeEntity savedRecipe = fserv.postFavRecipeRecord(recipe);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedRecipe);
    }

    // Get all favorite recipes
    @GetMapping("/getFavRecipes")
    public ResponseEntity<List<FavRecipeEntity>> getFavRecipeRecord() {
        return ResponseEntity.ok(fserv.getFavRecipeRecord());
    }

    // Get favorite recipes by user ID
    @GetMapping("/getFavRecipe")
    public ResponseEntity<List<FavRecipeEntity>> getFavRecipeRecord(@RequestParam("userId") int userId) {
        List<FavRecipeEntity> recipes = fserv.getFavRecipeRecordByUserId(userId);
        return ResponseEntity.ok(recipes);
    }

    // Update a favorite recipe
    @PutMapping("/putFavRecipe")
    public ResponseEntity<FavRecipeEntity> putFavRecipeDetails(@RequestParam("id") int id, @RequestBody FavRecipeEntity newFavRecipe) {
        FavRecipeEntity updatedRecipe = fserv.putFavRecipeDetails(id, newFavRecipe);
        return ResponseEntity.ok(updatedRecipe);
    }

    // Delete a favorite recipe
    @DeleteMapping("/deleteFavRecipe/{id}")
    public ResponseEntity<String> deleteFavRecipe(@PathVariable("id") int id) {
        String response = fserv.deteleFavRecipe(id);
        return ResponseEntity.ok(response);
    }
}

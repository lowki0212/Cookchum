package projectappdev.supercook.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import projectappdev.supercook.entity.RecipeEntity;
import projectappdev.supercook.service.RecipeService;

@RestController
@RequestMapping("/api/recipe")
@CrossOrigin(origins = "http://localhost:3000") 
public class RecipeController {

    private final RecipeService recipeService;

    @Autowired
    public RecipeController(RecipeService recipeService) {
        this.recipeService = recipeService;
    }

    @GetMapping("/print")
    public String print() {
        return "Hello, Recipe World!";
    }

    // Create operation (C in CRUD)
    @PostMapping("/postRecipe")
    public RecipeEntity postRecipe(@RequestBody RecipeEntity recipe) {
        return recipeService.saveRecipe(recipe);
    }

    // Read operation (R in CRUD)
    @GetMapping("/getAllRecipes")
    public List<RecipeEntity> getAllRecipes() {
        return recipeService.getAllRecipes();
    }

    // Update operation (U in CRUD)
    @PutMapping("/updateRecipe/{id}")
    public RecipeEntity updateRecipe(@PathVariable("id") int id, @RequestBody RecipeEntity newRecipeDetails) {
        return recipeService.updateRecipe(id, newRecipeDetails);
    }

    // Delete operation (D in CRUD)
    @DeleteMapping("/deleteRecipe/{id}")
    public ResponseEntity<String> deleteRecipe(@PathVariable("id") int id) {
        boolean isDeleted = recipeService.deleteRecipe(id);
        if (isDeleted) {
            return ResponseEntity.ok("Recipe with ID " + id + " deleted successfully.");
        } else {
            return ResponseEntity.ok("Recipe with ID " + id + " not found.");
        }
    }
}
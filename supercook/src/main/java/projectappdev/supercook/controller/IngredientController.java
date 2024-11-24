package projectappdev.supercook.controller;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import projectappdev.supercook.entity.IngredientEntity;
import projectappdev.supercook.entity.RecipeEntity;
import projectappdev.supercook.service.IngredientService;
import projectappdev.supercook.service.RecipeService;
import projectappdev.supercook.Request.IngredientRequest;

@RestController
@RequestMapping("/api/ingredients")
@CrossOrigin(origins = "http://localhost:3000")
public class IngredientController {

    private final IngredientService ingredientService;
    private final RecipeService recipeService;

    @Autowired
    public IngredientController(IngredientService ingredientService, RecipeService recipeService) {
        this.ingredientService = ingredientService;
        this.recipeService = recipeService;
    }

    @GetMapping("/print")
    public String print() {
        return "Hello, Ingredient World!";
    }

    // Create operation (C in CRUD)
    @PostMapping("/postIngredient")
    public ResponseEntity<?> addIngredient(@RequestBody IngredientRequest ingredientRequest) {
        if (ingredientRequest.getRecipeId() == null) {
            return ResponseEntity.badRequest().body("Recipe ID is required for adding an ingredient.");
        }
    
        if (ingredientRequest.getName() == null || ingredientRequest.getName().isEmpty()) {
            return ResponseEntity.badRequest().body("Ingredient name is required.");
        }
    
        try {
            // Fetch the recipe by ID
            RecipeEntity recipe = recipeService.getRecipeById(ingredientRequest.getRecipeId())
                    .orElseThrow(() -> new NoSuchElementException("Recipe not found for ID: " + ingredientRequest.getRecipeId()));
    
            // Create and save the ingredient
            IngredientEntity newIngredient = new IngredientEntity();
            newIngredient.setName(ingredientRequest.getName());
            newIngredient.setRecipe(recipe);
    
            // Save using the ingredient service
            IngredientEntity savedIngredient = ingredientService.saveIngredient(newIngredient);
    
            return ResponseEntity.ok(savedIngredient);
        } catch (NoSuchElementException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("An error occurred while saving the ingredient: " + e.getMessage());
        }
    }
    
    // Read operation (R in CRUD)
    @GetMapping("/getAllIngredients")
    public List<IngredientEntity> getAllIngredients() {
        return ingredientService.getAllIngredients();
    }

    // Update operation (U in CRUD)
    @PutMapping("/updateIngredientName/{id}")
    public ResponseEntity<?> updateIngredientName(@PathVariable("id") int id, @RequestBody IngredientEntity ingredientEntity) {
        try {
            IngredientEntity updatedIngredient = ingredientService.updateIngredientName(id, ingredientEntity);
            return ResponseEntity.ok(updatedIngredient);
        } catch (NoSuchElementException e) {
            return ResponseEntity.badRequest().body("Ingredient not found for ID: " + id);
        }
    }

    // Delete operation (D in CRUD)
    @DeleteMapping("/deleteIngredient/{id}")
    public ResponseEntity<?> deleteIngredient(@PathVariable("id") int id) {
        try {
            String responseMessage = ingredientService.deleteIngredient(id);
            return ResponseEntity.ok(responseMessage);
        } catch (NoSuchElementException e) {
            return ResponseEntity.badRequest().body("Ingredient with ID " + id + " not found.");
        }
    }
}
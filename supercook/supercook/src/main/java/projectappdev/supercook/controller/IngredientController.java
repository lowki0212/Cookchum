package projectappdev.supercook.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import projectappdev.supercook.entity.IngredientEntity;
import projectappdev.supercook.service.IngredientService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/ingredients")
public class IngredientController {

    @Autowired
    private IngredientService ingredientService;
    
    @GetMapping("/print")
    public String print() {
    	return "Hello Friend!";
    }

    // Create a new ingredient
    @PostMapping("/postIngredients")
    public IngredientEntity createIngredient(@RequestBody IngredientEntity ingredient) {
        return ingredientService.saveIngredient(ingredient);
    }

    // Get all ingredients
    @GetMapping("/getAllIngredients")
    public List<IngredientEntity> getAllIngredients() {
        return ingredientService.getAllIngredients();
    }

    // Get ingredient by ID
    @GetMapping("/getIngredients/{id}")
    public ResponseEntity<IngredientEntity> getIngredientById(@PathVariable int id) {
        Optional<IngredientEntity> ingredient = ingredientService.getIngredientById(id);
        return ingredient.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Update an ingredient
    @PutMapping("/updateIngredients/{id}")
    public ResponseEntity<IngredientEntity> updateIngredient(@PathVariable int id, @RequestBody IngredientEntity ingredientDetails) {
        Optional<IngredientEntity> existingIngredient = ingredientService.getIngredientById(id);
        if (existingIngredient.isPresent()) {
            IngredientEntity ingredient = existingIngredient.get();
            ingredient.setName(ingredientDetails.getName());
            return ResponseEntity.ok(ingredientService.saveIngredient(ingredient));
        }
        return ResponseEntity.notFound().build();
    }

    // Delete an ingredient
    @DeleteMapping("/deleteIngredients/{id}")
    public ResponseEntity<Void> deleteIngredient(@PathVariable int id) {
        if (ingredientService.getIngredientById(id).isPresent()) {
            ingredientService.deleteIngredient(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
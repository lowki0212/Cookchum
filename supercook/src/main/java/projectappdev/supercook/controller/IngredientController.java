package projectappdev.supercook.controller;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import projectappdev.supercook.entity.IngredientEntity;
import projectappdev.supercook.service.IngredientService;

@RestController
@RequestMapping("/api/ingredients")
@CrossOrigin(origins = "http://localhost:3000")
public class IngredientController {

    private final IngredientService ingredientService;

    @Autowired
    public IngredientController(IngredientService ingredientService) {
        this.ingredientService = ingredientService;
    }

    @GetMapping("/print")
    public String print() {
        return "Hello, Ingredient World!";
    }

    // Create operation (C in CRUD)
    @PostMapping("/postIngredient")
    public IngredientEntity postIngredient(@RequestBody IngredientEntity ingredient) {
        return ingredientService.createIngredient(ingredient);
    }

    // Read operation (R in CRUD)
    @GetMapping("/getAllIngredients")
    public List<IngredientEntity> getAllIngredients() {
        return ingredientService.getAllIngredients();
    }

    // Read operation by ID
    /*@GetMapping("/getIngredient/{id}")
    public IngredientEntity getIngredientById(@PathVariable int id) {
        return ingredientService.getIngredientById(id);
    }*/

    // Update operation (U in CRUD)
    @PutMapping("/updateIngredientName/{id}")
    public IngredientEntity updateIngredientName(@PathVariable("id") int id, @RequestBody IngredientEntity name) {
        return ingredientService.updateIngredientName(id, name);
    }

    // Delete operation (D in CRUD)
    @DeleteMapping("/deleteIngredient/{id}")
    public String deleteIngredient(@PathVariable("id") int id) {
        try {
            return ingredientService.deleteIngredient(id);
        } catch (NoSuchElementException e) {
            return "Ingredient with ID " + id + " not found.";
        }
    }
}

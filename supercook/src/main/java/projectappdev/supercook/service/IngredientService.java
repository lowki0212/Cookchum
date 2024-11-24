package projectappdev.supercook.service;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import projectappdev.supercook.entity.IngredientEntity;
import projectappdev.supercook.entity.RecipeEntity;
import projectappdev.supercook.repository.IngredientRepository;
import projectappdev.supercook.repository.RecipeRepository;

@Service
public class IngredientService {

    private final IngredientRepository ingredientRepository;
    private final RecipeRepository recipeRepository;

    @Autowired
    public IngredientService(IngredientRepository ingredientRepository, RecipeRepository recipeRepository) {
        this.ingredientRepository = ingredientRepository;
        this.recipeRepository = recipeRepository;
    }

    // Create an ingredient (C in CRUD)
    public IngredientEntity createIngredient(IngredientEntity ingredient) {
        if (ingredient.getRecipe() != null && ingredient.getRecipe().getRecipeId() > 0) {
            RecipeEntity recipe = recipeRepository.findById(ingredient.getRecipe().getRecipeId())
                    .orElseThrow(() -> new NoSuchElementException("Recipe with ID " + ingredient.getRecipe().getRecipeId() + " not found."));
            ingredient.setRecipe(recipe);
        } else {
            throw new IllegalArgumentException("Recipe ID is required for adding an ingredient.");
        }
        
        return ingredientRepository.save(ingredient);
    }

    public IngredientEntity saveIngredient(IngredientEntity ingredient) {
        return ingredientRepository.save(ingredient);
    }
    

    // Get all ingredients (R in CRUD)
    public List<IngredientEntity> getAllIngredients() {
        return ingredientRepository.findAll();
    }

    // Get ingredient by ID (R in CRUD)
    public IngredientEntity getIngredientById(int id) {
        return ingredientRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Ingredient with ID " + id + " not found."));
    }

    // Update only the name of an ingredient (U in CRUD)
    @SuppressWarnings("finally")
	public IngredientEntity updateIngredientName(int id, IngredientEntity newNameEntity) {
        IngredientEntity ingredient = new IngredientEntity();
        try {
            // Attempt to find the ingredient by ID
            ingredient = ingredientRepository.findById(id).orElseThrow(
                () -> new NoSuchElementException("Ingredient with ID " + id + " not found.")
            );

            // Update the name if it's provided in the newNameEntity
            if (newNameEntity.getName() != null) {
                ingredient.setName(newNameEntity.getName());
            }

        } catch (NoSuchElementException e) {
            throw new NoSuchElementException("Ingredient with ID " + id + " not found.");
        } finally {
            return ingredientRepository.save(ingredient);
        }
    }

    // Delete an ingredient by ID (D in CRUD)
    public String deleteIngredient(int id) {
        if (ingredientRepository.existsById(id)) {
            ingredientRepository.deleteById(id);
            return "Ingredient with ID " + id + " successfully deleted.";
        } else {
            throw new NoSuchElementException("Ingredient with ID " + id + " not found.");
        }
    }
}
package projectappdev.supercook.service;

import projectappdev.supercook.entity.RecipeEntity;
import projectappdev.supercook.repository.RecipeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RecipeService {

    @Autowired
    private RecipeRepository recipeRepository;

    // Get all recipes
    public List<RecipeEntity> getAllRecipes() {
        return recipeRepository.findAll();
    }

    // Get a recipe by ID
    public Optional<RecipeEntity> getRecipeById(int id) {
        return recipeRepository.findById(id);
    }

    // Add a new recipe
    public RecipeEntity saveRecipe(RecipeEntity recipe) {
        return recipeRepository.save(recipe);
    }

    // Update an existing recipe
    public RecipeEntity updateRecipe(int id, RecipeEntity updatedRecipe) {
        return recipeRepository.findById(id)
            .map(existingRecipe -> {
                existingRecipe.setName(updatedRecipe.getName());
                existingRecipe.setDescription(updatedRecipe.getDescription());
                existingRecipe.setEstimatedCost(updatedRecipe.getEstimatedCost());
                existingRecipe.setIngredients(updatedRecipe.getIngredients());
                return recipeRepository.save(existingRecipe);
            }).orElseThrow(() -> new RuntimeException("Recipe not found with id " + id));
    }

    // Delete a recipe by ID
    public boolean deleteRecipe(int id) {
        Optional<RecipeEntity> recipeOptional = recipeRepository.findById(id);
        if (recipeOptional.isPresent()) {
            recipeRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
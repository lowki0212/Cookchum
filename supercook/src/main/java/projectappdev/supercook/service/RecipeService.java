package projectappdev.supercook.service;

import projectappdev.supercook.entity.RecipeEntity;
import projectappdev.supercook.repository.RecipeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.Path;

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
        return recipeRepository.save(recipe); // Save the recipe entity, including the image data
    }

    // Update an existing recipe
    public RecipeEntity updateRecipe(int id, RecipeEntity updatedRecipe) {
        return recipeRepository.findById(id)
                .map(existingRecipe -> {
                    existingRecipe.setName(updatedRecipe.getName());
                    existingRecipe.setDescription(updatedRecipe.getDescription());
                    existingRecipe.setEstimatedCost(updatedRecipe.getEstimatedCost());
                    existingRecipe.setImageUrl(updatedRecipe.getImageUrl());
                    return recipeRepository.save(existingRecipe);
                })
                .orElseThrow(() -> new RuntimeException("Recipe not found with id " + id));
    }

    public boolean deleteRecipe(int id) {
        Optional<RecipeEntity> recipeOptional = recipeRepository.findById(id);
        if (recipeOptional.isPresent()) {
            System.out.println("Deleting recipe with ID: " + id); // Debugging
            recipeRepository.deleteById(id);
            return true;
        }
        return false;
    }
    
    public List<RecipeEntity> getRecipesByIngredients(List<String> ingredients) {
        return recipeRepository.findAll().stream()
            .filter(recipe -> recipe.getIngredients().stream()
                .anyMatch(ingredient -> ingredients.contains(ingredient.getName())))
            .toList();
    }

    public String uploadRecipeImage(int id, MultipartFile image) throws Exception {
        RecipeEntity recipe = recipeRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Recipe not found with id " + id));

        // Convert image to byte array and set it in the entity
        recipe.setImageUrl(image.getBytes());
        recipeRepository.save(recipe);

        return "Image uploaded successfully.";
    }
    
}
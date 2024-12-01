package projectappdev.supercook.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Base64;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;
import java.io.File;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;

import projectappdev.supercook.entity.RecipeEntity;
import projectappdev.supercook.service.RecipeService;
import projectappdev.supercook.entity.AdminEntity;


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

    @PostMapping("/postRecipe")
    public ResponseEntity<String> addRecipe(
            @RequestParam("name") String name,
            @RequestParam("description") String description,
            @RequestParam("estimatedCost") float estimatedCost,
            @RequestParam("calories") float calories,
            @RequestParam("file") MultipartFile file,
            @RequestParam("admin") String adminJson) {

        // Parse the admin object from JSON
        AdminEntity admin;
        try {
            admin = new ObjectMapper().readValue(adminJson, AdminEntity.class);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid admin data: " + e.getMessage());
        }

        try {
            // Convert file to byte array
            byte[] imageData = file.getBytes();

            // Create a new RecipeEntity object
            RecipeEntity recipe = new RecipeEntity();
            recipe.setName(name);
            recipe.setDescription(description);
            recipe.setEstimatedCost(estimatedCost);
            recipe.setCalories(calories);
            recipe.setImageUrl(imageData); // Set the binary image data

            // Associate the admin with the recipe
            recipe.setAdmin(admin);

            // Save the recipe entity using the recipeService
            recipeService.saveRecipe(recipe);

            return ResponseEntity.ok("Recipe added successfully!");
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error reading image file: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error adding recipe: " + e.getMessage());
        }
    }
    
        // Helper method to save the file
        private String saveFile(MultipartFile file) throws IOException {
            // Ensure the upload directory exists
            String uploadDir = "path/to/your/upload-dir";  // Replace with your desired path (make sure it's accessible)
            File uploadDirectory = new File(uploadDir);
            if (!uploadDirectory.exists()) {
                uploadDirectory.mkdirs();  // Create directory if it doesn't exist
            }

            // Get the original file name and ensure it’s safe for the filesystem
            String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
            Path filePath = Paths.get(uploadDir, fileName);

            // Save the file
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            // Return the file path (or the URL if you want to serve it through a web URL)
            return filePath.toString();  // Modify this if you need to generate a URL to the file
        }

    // Upload image
        @PostMapping("/uploadImage")
        public ResponseEntity<String> uploadImage(@RequestParam("id") int recipeId, @RequestParam("file") MultipartFile file) {
            if (file.isEmpty()) {
                return ResponseEntity.badRequest().body("Please select a valid image to upload.");
            }

            try {
                String message = recipeService.uploadRecipeImage(recipeId, file);
                return ResponseEntity.ok(message);
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload the image: " + e.getMessage());
            }
        }

    // Read operations
    @GetMapping("/getAllRecipes")
    public List<Map<String, Object>> getAllRecipes() {
        // Fetch all recipes from the service
        List<RecipeEntity> recipes = recipeService.getAllRecipes();
    
        // Transform each RecipeEntity into a Map with Base64 image and ingredients
        return recipes.stream().map(recipe -> {
            Map<String, Object> recipeData = new HashMap<>();
            recipeData.put("recipeId", recipe.getRecipeId());
            recipeData.put("name", recipe.getName());
            recipeData.put("description", recipe.getDescription());
            recipeData.put("estimatedCost", recipe.getEstimatedCost());
            recipeData.put("calories", recipe.getCalories());
    
            // Convert image byte[] to Base64 string
            if (recipe.getImageUrl() != null) {
                String base64Image = Base64.getEncoder().encodeToString(recipe.getImageUrl());
                recipeData.put("imageUrl", "data:image/jpeg;base64," + base64Image);
            } else {
                recipeData.put("imageUrl", null); // Handle missing image
            }
    
            // Include the ingredient IDs in the response
            List<Map<String, Object>> ingredients = recipe.getIngredients().stream().map(ingredient -> {
                Map<String, Object> ingredientData = new HashMap<>();
                ingredientData.put("ingredientId", ingredient.getIngredientId());
                ingredientData.put("name", ingredient.getName());
                // You can add more ingredient details if needed
                return ingredientData;
            }).collect(Collectors.toList());
    
            recipeData.put("ingredients", ingredients);
    
            return recipeData;
        }).collect(Collectors.toList());
    }
    


    @GetMapping("/getRecipe/{id}")
    public ResponseEntity<RecipeEntity> getRecipeById(@PathVariable int id) {
        return recipeService.getRecipeById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Update operation
    @PutMapping("/updateRecipe/{id}")
    public ResponseEntity<String> updateRecipe(
            @PathVariable("id") int id,
            @RequestParam("name") String name,
            @RequestParam("description") String description,
            @RequestParam("estimatedCost") float estimatedCost,
            @RequestParam("calories") float calories,
            @RequestParam(value = "file", required = false) MultipartFile file) {

        try {
            // Fetch the existing recipe from the database
            RecipeEntity existingRecipe = recipeService.getRecipeById(id)
                    .orElseThrow(() -> new RuntimeException("Recipe not found with id " + id));

            // Update the fields
            existingRecipe.setName(name);
            existingRecipe.setDescription(description);
            existingRecipe.setEstimatedCost(estimatedCost);
            existingRecipe.setCalories(calories);

            // Update the image if provided
            if (file != null && !file.isEmpty()) {
                existingRecipe.setImageUrl(file.getBytes());
            }

            // Save the updated recipe
            recipeService.saveRecipe(existingRecipe);

            return ResponseEntity.ok("Recipe updated successfully!");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating recipe: " + e.getMessage());
        }
    }

    // Delete operation
    @DeleteMapping("/deleteRecipe/{id}")
    public ResponseEntity<String> deleteRecipe(@PathVariable("id") int id) {
        boolean isDeleted = recipeService.deleteRecipe(id);
        if (isDeleted) {
            return ResponseEntity.ok("Recipe with ID " + id + " deleted successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Recipe with ID " + id + " not found.");
        }
    }
}
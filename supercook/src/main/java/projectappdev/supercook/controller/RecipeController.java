package projectappdev.supercook.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.UUID;
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
            // Save the uploaded file and get the file path
            String filePath = saveFile(file);  // Implement saveFile logic to store the file
            
            // Create a new RecipeEntity object
            RecipeEntity recipe = new RecipeEntity();
            recipe.setName(name);
            recipe.setDescription(description);
            recipe.setEstimatedCost(estimatedCost);
            recipe.setImageUrl(filePath);  // Set the image URL
            
            // Associate the admin with the recipe
            recipe.setAdmin(admin);  // Set the admin relationship for this recipe
            
            // Save the recipe entity using the recipeService
            recipeService.saveRecipe(recipe);  // Use the service to save the recipe
    
            return ResponseEntity.ok("Recipe added successfully!");
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error uploading file: " + e.getMessage());
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
    public ResponseEntity<String> uploadImage(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("Please select a valid image to upload.");
        }

        try {
            // Save the file to the server
            String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
            String uploadDir = "uploaded_images/";
            Path path = Paths.get(uploadDir + fileName);
            Files.createDirectories(path.getParent());
            Files.write(path, file.getBytes());

            return ResponseEntity.ok(uploadDir + fileName); // Return the image path
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload the image.");
        }
    }

    // Read operations
    @GetMapping("/getAllRecipes")
    public List<RecipeEntity> getAllRecipes() {
        return recipeService.getAllRecipes();
    }

    @GetMapping("/getRecipe/{id}")
    public ResponseEntity<RecipeEntity> getRecipeById(@PathVariable int id) {
        return recipeService.getRecipeById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Update operation
    @PutMapping("/updateRecipe/{id}")
    public RecipeEntity updateRecipe(@PathVariable("id") int id, @RequestBody RecipeEntity newRecipeDetails) {
        return recipeService.updateRecipe(id, newRecipeDetails);
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

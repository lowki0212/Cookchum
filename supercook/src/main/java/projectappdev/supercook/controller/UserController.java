package projectappdev.supercook.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import projectappdev.supercook.entity.UserEntity;
import projectappdev.supercook.repository.UserRepository;
import projectappdev.supercook.service.UserService;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/supercook")
@CrossOrigin(origins = "http://localhost:3000")  // Allow cross-origin requests from your React frontend
public class UserController {

    @Autowired
    private UserService userservice;

    @Autowired
    private UserRepository userrepository;

    @GetMapping("/print")
    public String print() {
        return "Hello, Firstname Lastname";
    }

    // Create (Post) a new user record
    @PostMapping("/postuserrecord")
    public ResponseEntity<UserEntity> postUserRecord(@RequestBody UserEntity user) {
        try {
            UserEntity createdUser = userservice.postUserRecord(user);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    // Read (Get) all user records
    @GetMapping("/getAllUsers")
    public ResponseEntity<List<UserEntity>> getAllUsers() {
        return ResponseEntity.ok(userservice.getAllUsers());
    }

    // Get user by ID
    @GetMapping("/user/{id}")
    public ResponseEntity<UserEntity> getUserById(@PathVariable int id) {
        try {
            UserEntity user = userservice.getUserById(id);
            return ResponseEntity.ok(user);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);  // Return 404 if user not found
        }
    }

    // Update user details (username, email, password)
    @PutMapping("/user/{id}")
    public ResponseEntity<UserEntity> updateUser(@PathVariable("id") int id, @RequestBody UserEntity updatedUser) {
        try {
            UserEntity existingUser = userservice.getUserById(id);
            existingUser.setUsername(updatedUser.getUsername());
            existingUser.setEmail(updatedUser.getEmail());
            existingUser.setPassword(updatedUser.getPassword()); // Ensure password hashing in service layer

            UserEntity savedUser = userservice.updateUserDetails(existingUser, id);
            return ResponseEntity.ok(savedUser);  // Return the updated user details with HTTP 200
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);  // Return 404 if user not found
        }
    }

    // Delete user by ID
    @DeleteMapping("/user/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable("id") int id) {
        try {
            userservice.deleteUser(id);
            return ResponseEntity.noContent().build();  // Return 204 No Content
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();  // Return 404 if user not found
        }
    }

    // Login endpoint
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody Map<String, String> loginRequest) {
        String email = loginRequest.get("email");
        String password = loginRequest.get("password");

        Optional<UserEntity> foundUser = userrepository.findByEmail(email);

        if (foundUser.isPresent() && foundUser.get().getPassword().equals(password)) {
            Map<String, Object> response = new HashMap<>();
            response.put("userId", foundUser.get().getUserId());
            response.put("username", foundUser.get().getUsername());
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
        }
    }

    // Update user profile image
   @PutMapping(value = "/user/{id}", consumes = "multipart/form-data")
    public ResponseEntity<UserEntity> updateUser(@PathVariable int id, @RequestParam("username") String username, @RequestParam("email") String email, @RequestParam("password") String password, @RequestParam(value = "image", required = false) MultipartFile imageFile) {
    UserEntity user = userrepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("User with ID " + id + " not found"));

    // Update the user details
    user.setUsername(username);
    user.setEmail(email);
    user.setPassword(password);

    // If there's an image file, update the image
    if (imageFile != null && !imageFile.isEmpty()) {
        try {
            // Validate file size and type
            if (imageFile.getSize() > 5000000) {  // 5MB size limit
                throw new IllegalArgumentException("Image size is too large");
            }
            user.setImage(imageFile.getBytes());
        } catch (IOException e) {
            throw new RuntimeException("Failed to upload image", e);
        }
    }

    // Save the updated user details
    return ResponseEntity.ok(userrepository.save(user));
}

}
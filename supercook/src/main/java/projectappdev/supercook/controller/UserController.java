package projectappdev.supercook.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import projectappdev.supercook.entity.UserEntity;
import projectappdev.supercook.repository.UserRepository;
import projectappdev.supercook.service.UserService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/supercook")
@CrossOrigin(origins = "http://localhost:3000") // Adjust the origin as needed
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
        UserEntity createdUser = userservice.postUserRecord(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
    }

    // Read (Get) all user records
    @GetMapping("/getAllUsers")
    public ResponseEntity<List<UserEntity>> getAllUsers() {
        return ResponseEntity.ok(userservice.getAllUsers());
    }

    // UPDATE user
    @PutMapping("/{id}")
    public ResponseEntity<UserEntity> updateUser(@PathVariable("id") int id, @RequestBody UserEntity updatedUser) {
        UserEntity updated = userservice.updateUserDetails(updatedUser, id);
        return ResponseEntity.ok(updated); // Return updated user with HTTP 200
    }

    // DELETE user by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable("id") int id) {
        userservice.deleteUser(id);
        return ResponseEntity.noContent().build(); // Return 204 No Content
    }

    // Login endpoint
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody Map<String, String> loginRequest) {
        String email = loginRequest.get("email");
        String password = loginRequest.get("password");

        // Find user by email
        Optional<UserEntity> foundUser = userrepository.findByEmail(email);

        if (foundUser.isPresent() && foundUser.get().getPassword().equals(password)) {
            // Return user details in response
            Map<String, Object> response = new HashMap<>();
            response.put("userId", foundUser.get().getUserId());
            response.put("username", foundUser.get().getUsername());
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
        }
    }
}

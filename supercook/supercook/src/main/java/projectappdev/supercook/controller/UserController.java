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
@RequestMapping(method = RequestMethod.GET,path="/api/supercook")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    UserService userservice;
    
    @Autowired
    UserRepository  userrepository;

    @GetMapping("/print")
    public String print() {
        return "Hello, Firstname Lastname";
    }

    // Create (Post) a new student record
    @PostMapping("/postuserrecord")
    public UserEntity postUserRecord(@RequestBody UserEntity user) {
        return userservice.postUserRecord(user);
    }
  
    // Read (Get) all student records
    @GetMapping("/getAllUsers")
    public List <UserEntity> getAllUsers() {
        return userservice.getAllUsers();
    }

    // UPDATE admin
    @PutMapping("/{id}")
    public ResponseEntity<UserEntity> updateUser(@PathVariable int id, @RequestBody UserEntity updatedUser) {
        UserEntity updated = userservice.updateUserDetails(updatedUser, id);
        return ResponseEntity.ok(updated); // Return updated user with HTTP 200
    }
    
    // DELETE request to delete an admin by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable int id) {
        userservice.deleteUser(id);
        return ResponseEntity.noContent().build(); // Return 204 No Content
    }
    
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody UserEntity user) {
        Optional<UserEntity> foundUser = userrepository.findByEmail(user.getEmail());

        if (foundUser.isPresent() && foundUser.get().getPassword().equals(user.getPassword())) {
            Map<String, Object> response = new HashMap<>();
            response.put("userId", foundUser.get().getUserId());
            response.put("username", foundUser.get().getUsername());
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
        }
    }
}
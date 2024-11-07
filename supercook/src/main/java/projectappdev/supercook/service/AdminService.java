package projectappdev.supercook.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import projectappdev.supercook.Request.AdminRequest;
import projectappdev.supercook.entity.AdminEntity;
import projectappdev.supercook.repository.AdminRepository;

@Service
public class AdminService {

    @Autowired
    AdminRepository userRepository;

    // Add user
    public AdminEntity addUser(AdminEntity user) {
        return userRepository.save(user);
    }

    // Login user
    public Boolean loginUser(AdminRequest loginRequest) {
        Optional<AdminEntity> user = userRepository.findById(loginRequest.getUserId());

        if (user.isPresent()) {
            AdminEntity user1 = user.get();
            if (user1.getPassword().equals(loginRequest.getPassword())) {
                return true;
            }
        }
        return false;
    }

    // Update user (new algorithm)
    public AdminEntity updateUser(String email, AdminEntity updatedUser) {
        return userRepository.findById(email).map(user -> {
            user.setName(updatedUser.getName());
            user.setPassword(updatedUser.getPassword());
            return userRepository.save(user);  // Save the updated user
        }).orElseGet(() -> {
            updatedUser.setEmail(email);
            return userRepository.save(updatedUser);  // Create a new user if not found
        });
    }

    // Delete user (new algorithm)
    public String deleteUser(String email) {
        if (userRepository.existsById(email)) {
            userRepository.deleteById(email);
            return "User with email " + email + " has been deleted.";
        } else {
            return "User with email " + email + " not found.";
        }
    }

    // Get all users
    public List<AdminEntity> getAllUsers() {
        return userRepository.findAll();
    }

    // Get a single user by email
    public AdminEntity getUserByEmail(String email) {
        return userRepository.findById(email)
                .orElseThrow(() -> new RuntimeException("User with email " + email + " not found."));
    }
}
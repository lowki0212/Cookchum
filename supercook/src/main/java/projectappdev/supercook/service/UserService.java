package projectappdev.supercook.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import projectappdev.supercook.entity.UserEntity;
import projectappdev.supercook.repository.UserRepository;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userrepository;

    // Default constructor
    public UserService() {
        super();
    }

    // Check if email exists before saving
    public UserEntity postUserRecord(UserEntity user) {
        Optional<UserEntity> existingUser = userrepository.findByEmail(user.getEmail());

        if (existingUser.isPresent()) {
            throw new IllegalArgumentException("Email already in use");
        }

        return userrepository.save(user);
    }

    // Read (Get) all user records (R of CRUD)
    public List<UserEntity> getAllUsers() {
        return userrepository.findAll();
    }

    // GET BY ID
    public UserEntity getUserById(int id) {
        return userrepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("User with ID " + id + " not found"));
    }

    // UPDATE User Details
    public UserEntity updateUserDetails(UserEntity updatedUser, int id) {
        UserEntity existingUser = userrepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("User with ID " + id + " not found"));

        // Update only fields that are provided
        if (updatedUser.getUsername() != null) {
            existingUser.setUsername(updatedUser.getUsername());
        }
        if (updatedUser.getPassword() != null) {
            existingUser.setPassword(updatedUser.getPassword());  // Make sure to hash the password
        }
        if (updatedUser.getEmail() != null) {
            existingUser.setEmail(updatedUser.getEmail());
        }

        return userrepository.save(existingUser);
    }

    // DELETE User
    public void deleteUser(int id) {
        UserEntity user = userrepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Cannot find user with ID " + id));
        userrepository.delete(user);
    }

    // Update Profile Image
    public UserEntity updateUserImage(int userId, MultipartFile imageFile) {
        UserEntity user = userrepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User with ID " + userId + " not found"));

        try {
            // Validate file size and type (optional)
            if (imageFile.getSize() > 5000000) {  // 5MB size limit
                throw new IllegalArgumentException("Image size is too large");
            }
            user.setImage(imageFile.getBytes());
        } catch (IOException e) {
            throw new RuntimeException("Failed to upload image", e);
        }

        return userrepository.save(user);
    }
}
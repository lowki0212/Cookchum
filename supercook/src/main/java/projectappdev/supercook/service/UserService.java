package projectappdev.supercook.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import projectappdev.supercook.entity.UserEntity;
import projectappdev.supercook.repository.UserRepository;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userrepository;

    // Default constructor
    public UserService(){
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

    // Read (Get) all student records (R of CRUD)
    public List<UserEntity> getAllUsers() {
        return userrepository.findAll();
    }
    
    // GET BY ID
    public UserEntity getUserById(int id) {
        return userrepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("User with ID " + id + " not found"));
    }

    // UPDATE
    public UserEntity updateUserDetails(UserEntity updatedUser, int id) {
    	UserEntity existingUser = userrepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("User with ID " + id + " not found"));

    	existingUser.setUsername(updatedUser.getUsername());
    	existingUser.setPassword(updatedUser.getPassword());
    	existingUser.setEmail(updatedUser.getEmail());

        return userrepository.save(existingUser);
    }

    // DELETE
    public void deleteUser(int id) {
        UserEntity user = userrepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Cannot find user with ID " + id));
        userrepository.delete(user);
    }
}
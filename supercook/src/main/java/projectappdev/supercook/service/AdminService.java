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
 
    private final AdminRepository adrepo;
 
    @Autowired
    public AdminService(AdminRepository adrepo) {
        this.adrepo = adrepo;
    }
 
    // Add user
    public AdminEntity addUser(AdminEntity user) {
        return adrepo.save(user);
    }
 
    // Login user
    public Boolean loginUser(AdminRequest loginRequest) {
        // Find the user by email (not adminId) and check password
        Optional<AdminEntity> user = adrepo.findByEmail(loginRequest.getEmail());
    
        // Validate if user exists and password matches
        if (user.isPresent() && user.get().getPassword().equals(loginRequest.getPassword())) {
            return true;
        }
    
        return false; // Return false if no match found
    }
    
   
    // Update user
    public AdminEntity updateUser(Integer adminId, AdminEntity updatedUser) {
        return adrepo.findById(adminId)
            .map(user -> {
                user.setName(updatedUser.getName());
                user.setEmail(updatedUser.getEmail());
                user.setPassword(updatedUser.getPassword());
                return adrepo.save(user);
            }).orElseThrow(() -> new RuntimeException("User with adminId " + adminId + " not found."));
    }
   
    // Delete user
    public String deleteUser(Integer adminId) {
        if (adrepo.existsById(adminId)) {
            adrepo.deleteById(adminId);
            return "User with adminId " + adminId + " has been deleted.";
        } else {
            return "User with adminId " + adminId + " not found.";
        }
    }
 
    // Get all users
    public List<AdminEntity> getAllUsers() {
        return adrepo.findAll();
    }
 
    // Get a single user by adminId
    public AdminEntity getUserById(Integer adminId) {
        return adrepo.findById(adminId)
                .orElseThrow(() -> new RuntimeException("User with adminId " + adminId + " not found."));
    }
}
 
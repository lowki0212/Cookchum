
package projectappdev.supercook.controller;
 
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
 
import projectappdev.supercook.Request.AdminRequest;
import projectappdev.supercook.entity.AdminEntity;
import projectappdev.supercook.service.AdminService;
 
import java.util.List;
import java.util.Map;
 
@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class AdminController {
 
    @Autowired
    AdminService userService;
 
    @PostMapping("/addUser")
    public AdminEntity addUser(@RequestBody AdminEntity user) {
        return userService.addUser(user);
    }
    /*
    @PostMapping("/loginUser")
    @CrossOrigin(origins = "http://localhost:3000")
    public Boolean loginUser(@RequestBody AdminRequest loginRequest) {
        return userService.loginUser(loginRequest);
    }*/
    
    
    @PostMapping("/loginUser")
    @CrossOrigin(origins = "http://localhost:3000")
    public Boolean loginUser(@RequestBody Map<String, String> payload) {
        // Extract email and password from the payload
        String email = payload.get("email");
        String password = payload.get("password");

        // Call the updated service method
        return userService.loginUser(email, password);
    }
 
    // Update user endpoint
    @PutMapping("/updateUser/{adminId}")
    @CrossOrigin(origins = "http://localhost:3000")
    public AdminEntity updateUser(@PathVariable("adminId") Integer adminId, @RequestBody AdminEntity user) {
        return userService.updateUser(adminId, user);
    }
 
    // Delete user endpoint
    @DeleteMapping("/deleteUser/{adminId}")
    @CrossOrigin(origins = "http://localhost:3000")
    public String deleteUser(@PathVariable("adminId") Integer adminId) {
        return userService.deleteUser(adminId);
    }
 
    // Get all users endpoint
    @GetMapping("/getAllUsers")
    @CrossOrigin(origins = "http://localhost:3000")
    public List<AdminEntity> getAllUsers() {
        return userService.getAllUsers();
    }
 
    // Get a single user by adminId
    @GetMapping("/getUser/{adminId}")
    @CrossOrigin(origins = "http://localhost:3000")
    public AdminEntity getUser(@PathVariable Integer adminId) {
        return userService.getUserById(adminId);
    }
}
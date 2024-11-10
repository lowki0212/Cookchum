package projectappdev.supercook.entity;
 
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
 
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
 
@Entity
@Table(name = "Admin")
public class AdminEntity {
 
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "adminId")
    private int adminId;
 
    private String name;
    private String email;
    private String password;
 
    @OneToMany(mappedBy = "admin", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    @JsonIgnore
    private List<RecipeEntity> recipes;
 
    public AdminEntity() {}
 
    public AdminEntity(String name, String email, String password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }
 
    public int getAdminId() {
        return adminId;
    }
 
    public String getName() {
        return name;
    }
 
    public void setName(String name) {
        this.name = name;
    }
 
    public String getEmail() {
        return email;
    }
 
    public void setEmail(String email) {
        this.email = email;
    }
 
    public String getPassword() {
        return password;
    }
 
    public void setPassword(String password) {
        this.password = password;
    }
 
    public List<RecipeEntity> getRecipes() {
        return recipes;
    }
 
    public void addRecipe(RecipeEntity recipe) {
        recipes.add(recipe);
        recipe.setAdmin(this);
    }
 
    public void removeRecipe(RecipeEntity recipe) {
        recipes.remove(recipe);
        recipe.setAdmin(null);
    }
}
package projectappdev.supercook.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import projectappdev.supercook.entity.IngredientEntity;
import projectappdev.supercook.repository.IngredientRepository;

import java.util.List;
import java.util.Optional;

@Service
public class IngredientService {

    @Autowired
    private IngredientRepository ingredientRepository;

    // Get all ingredients
    public List<IngredientEntity> getAllIngredients() {
        return ingredientRepository.findAll();
    }

    // Get ingredient by ID
    public Optional<IngredientEntity> getIngredientById(int id) {
        return ingredientRepository.findById(id);
    }

    // Save or update an ingredient
    public IngredientEntity saveIngredient(IngredientEntity ingredient) {
        return ingredientRepository.save(ingredient);
    }

    // Delete an ingredient
    public void deleteIngredient(int id) {
        ingredientRepository.deleteById(id);
    }
}
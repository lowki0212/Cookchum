package projectappdev.supercook.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import projectappdev.supercook.entity.IngredientEntity;

@Repository
public interface IngredientRepository extends JpaRepository<IngredientEntity, Integer> {
    // Additional custom queries can be defined here if needed
}
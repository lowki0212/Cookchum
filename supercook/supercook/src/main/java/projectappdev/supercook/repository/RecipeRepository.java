package projectappdev.supercook.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import  projectappdev.supercook.entity.RecipeEntity;

@Repository
public interface RecipeRepository extends JpaRepository<RecipeEntity, Integer> {
    // You can add custom query methods here if needed, for example:
    List<RecipeEntity> findByNameContaining(String name);
    List<RecipeEntity> findByEstimatedCostLessThan(float cost);
}
package projectappdev.supercook.repository;



import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import projectappdev.supercook.entity.FavRecipeEntity;

@Repository
public interface FavRecipeRepository extends JpaRepository<FavRecipeEntity, Integer>{
	
	//this is user-defined method to search a user record by name
	public List<FavRecipeEntity> findByUser_UserId(int userId);


	
	//you may define more methods for searching, for instance, in this interface

}
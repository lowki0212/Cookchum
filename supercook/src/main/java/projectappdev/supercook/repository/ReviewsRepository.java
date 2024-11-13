package projectappdev.supercook.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import projectappdev.supercook.entity.ReviewsEntity;

@Repository
public interface ReviewsRepository extends JpaRepository<ReviewsEntity, Integer>{
	
	//this is user-defined method to search a user record by name
	public List<ReviewsEntity> findByUser_UserId(int userId);

	
	
	//you may define more methods for searching, for instance, in this interface

}
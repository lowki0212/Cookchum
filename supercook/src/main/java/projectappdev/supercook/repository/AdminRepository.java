package projectappdev.supercook.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import projectappdev.supercook.entity.AdminEntity;

@Repository
public interface AdminRepository extends JpaRepository<AdminEntity, Integer> {
    Optional<AdminEntity> findByEmail(String email);
}

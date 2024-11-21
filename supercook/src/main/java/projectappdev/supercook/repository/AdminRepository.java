package projectappdev.supercook.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import projectappdev.supercook.entity.AdminEntity;


@Repository
public interface AdminRepository extends JpaRepository<AdminEntity, Integer> {
	public List<AdminEntity> findByAdminId(int adminId);
	public Optional<AdminEntity> findByEmail(String email);
}

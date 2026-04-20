package rs.ac.metropolitan.socialmediamanager.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import rs.ac.metropolitan.socialmediamanager.model.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUsername(String username);

}

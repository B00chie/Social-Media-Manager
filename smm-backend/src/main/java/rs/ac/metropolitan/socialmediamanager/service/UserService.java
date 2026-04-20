package rs.ac.metropolitan.socialmediamanager.service;

import rs.ac.metropolitan.socialmediamanager.model.User;

import java.util.List;
import java.util.Optional;

public interface UserService {

    User save(User user);

    Optional<User> findByUsername(String username);

    List<User> findAll();

    Optional<User> findById(Long id);

    void delete(Long id);
}

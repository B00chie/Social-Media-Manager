package rs.ac.metropolitan.socialmediamanager.controller;

import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;

import jakarta.validation.Valid;
import rs.ac.metropolitan.socialmediamanager.dto.*;
import rs.ac.metropolitan.socialmediamanager.model.User;
import rs.ac.metropolitan.socialmediamanager.service.*;


@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

   @PostMapping
    public ResponseEntity<UserResponseDTO> create(
            @Valid @RequestBody UserRequestDTO dto
    ) {
        User user = new User();
        user.setUsername(dto.getUsername());
        user.setPassword(dto.getPassword());

        User saved = userService.save(user);

        UserResponseDTO reponse = new UserResponseDTO();
        reponse.setId(saved.getId());
        reponse.setUsername(saved.getUsername());
        return ResponseEntity.status(HttpStatus.CREATED).body(reponse);
    }

    @GetMapping
    public List<UserResponseDTO> getAll(){
       return userService.findAll()
       .stream()
       .map(user -> {
        UserResponseDTO dto = new UserResponseDTO();

        dto.setId(user.getId());
        dto.setUsername(user.getUsername());

        return dto;
       })
       .toList();
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        userService.findById(id).orElseThrow(() -> new RuntimeException("User not found"));

        userService.delete(id);
    }
    @GetMapping("/me")
public ResponseEntity<?> getCurrentUser(Authentication authentication) {
    return ResponseEntity.ok(authentication.getName());
}
}

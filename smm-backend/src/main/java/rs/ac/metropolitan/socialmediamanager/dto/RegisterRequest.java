package rs.ac.metropolitan.socialmediamanager.dto;

import lombok.Data;

@Data
public class RegisterRequest {
    private String username;
    private String password;
}
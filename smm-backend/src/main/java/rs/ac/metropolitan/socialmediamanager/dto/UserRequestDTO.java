package rs.ac.metropolitan.socialmediamanager.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UserRequestDTO {

    @NotBlank
    private String username;

    @Size(min = 6)
    private String password;
}

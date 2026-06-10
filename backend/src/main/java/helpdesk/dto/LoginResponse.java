package helpdesk.dto;

import helpdesk.entity.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoginResponse {

    private Long id;

    private String token;

    private String fullName;

    private String email;

    private Role role;
}
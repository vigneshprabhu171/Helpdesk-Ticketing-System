package helpdesk.service;

import helpdesk.dto.LoginRequest;
import helpdesk.dto.RegisterRequest;
import helpdesk.entity.User;
import helpdesk.repository.UserRepository;
import org.springframework.stereotype.Service;
import helpdesk.dto.LoginResponse;
import helpdesk.security.JwtService;


@Service
public class UserService {

    private final UserRepository userRepository;
    private final JwtService jwtService;

    public UserService(
            UserRepository userRepository,
            JwtService jwtService) {

        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }

    public String registerUser(RegisterRequest request) {

        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            return "Email already exists!";
        }

        User user = new User();

        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());
        user.setRole(request.getRole());

        userRepository.save(user);

        return "User registered successfully!";
    }

    public LoginResponse loginUser(LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        if (!user.getPassword().equals(request.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        String token = jwtService.generateToken(user.getEmail());

        return new LoginResponse(
                user.getId(),
                token,
                user.getFullName(),
                user.getEmail(),
                user.getRole()
        );
    }
}
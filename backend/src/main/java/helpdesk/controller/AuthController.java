package helpdesk.controller;

import helpdesk.dto.LoginRequest;
import helpdesk.dto.RegisterRequest;
import helpdesk.service.UserService;
import org.springframework.web.bind.annotation.*;
import helpdesk.dto.LoginResponse;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public String register(@RequestBody RegisterRequest request) {
        return userService.registerUser(request);
    }

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {
        return userService.loginUser(request);
    }
}
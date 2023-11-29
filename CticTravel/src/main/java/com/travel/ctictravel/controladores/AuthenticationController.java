package com.travel.ctictravel.controladores;


import com.travel.ctictravel.dao.JwtAuthenticationResponse;
import com.travel.ctictravel.dao.request.SignUpRequest;
import com.travel.ctictravel.dao.request.SigninRequest;
import com.travel.ctictravel.servicios.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthenticationController {
    private final AuthenticationService authenticationService;

    @PostMapping("/register")
    public ResponseEntity<JwtAuthenticationResponse> signup(@RequestBody SignUpRequest request){
        return ResponseEntity.ok(authenticationService.signup(request));
    }

    @PostMapping("/login")
    public ResponseEntity<JwtAuthenticationResponse> signin(@RequestBody SigninRequest request){
        return ResponseEntity.ok(authenticationService.signin(request));
    }

    @GetMapping("/user")
    public ResponseEntity<JwtAuthenticationResponse> user(){
        return ResponseEntity.ok(authenticationService.user());
    }

}

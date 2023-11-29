package com.travel.ctictravel.servicios;

import com.travel.ctictravel.dao.JwtAuthenticationResponse;
import com.travel.ctictravel.dao.request.SignUpRequest;
import com.travel.ctictravel.dao.request.SigninRequest;

public interface AuthenticationService {

    JwtAuthenticationResponse signup(SignUpRequest request);

    JwtAuthenticationResponse signin(SigninRequest request);

    JwtAuthenticationResponse user();
}

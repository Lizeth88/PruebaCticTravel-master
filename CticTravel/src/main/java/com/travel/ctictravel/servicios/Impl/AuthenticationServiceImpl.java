package com.travel.ctictravel.servicios.Impl;


import com.travel.ctictravel.dao.JwtAuthenticationResponse;
import com.travel.ctictravel.dao.request.SignUpRequest;
import com.travel.ctictravel.dao.request.SigninRequest;
import com.travel.ctictravel.modelos.Role;
import com.travel.ctictravel.modelos.Usuario;
import com.travel.ctictravel.repositorios.RoleRepository;
import com.travel.ctictravel.repositorios.UsuarioRepository;
import com.travel.ctictravel.servicios.AuthenticationService;
import com.travel.ctictravel.servicios.JwtService;
import com.travel.ctictravel.servicios.RoleService;
import com.travel.ctictravel.servicios.UsuarioService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.hibernate.ObjectNotFoundException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService{

    private final UsuarioRepository userRepository;
    private final RoleService roleService;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;



    @Override
    public JwtAuthenticationResponse signup(SignUpRequest request) {
      // Verificar si el correo electrónico ya existe en la base de datos
      if (userRepository.existsByEmail(request.getEmail())) {
        throw new RuntimeException("Error al registrar el usuario. El correo electrónico ya está en uso.");
      }

      // Obtener el rol 'CLIENT' de la base de datos
      Role role = roleService.findRoleByNombre("CLIENT").orElseThrow(() -> new RuntimeException("No se pudo encontrar el rol con el nombre 'CLIENT' en la base de datos."));

      // Construir un nuevo objeto Usuario con la información proporcionada en la solicitud
      var user = Usuario.builder()
              .nombre(request.getNombre())
              .email(request.getEmail())
              .password(passwordEncoder.encode(request.getPassword()))
              .roles(Collections.singleton(role)).build();

      // Guardar el nuevo usuario en la base de datos
      userRepository.save(user);

      // Generar un token JWT para el usuario recién registrado
      var jwt = jwtService.generateToken(user);

      // Construir y devolver una respuesta que incluye el token JWT y detalles del usuario
      return JwtAuthenticationResponse.builder().token(jwt).usuario(user).build();
    }

    @Transactional
    @Override
    public JwtAuthenticationResponse signin(SigninRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));

        // Buscar al usuario en el repositorio por su dirección de correo electrónico. Sino se encuentra manda una excepción
        var user = userRepository.findAllByEmail(request.getEmail()).orElseThrow(() -> new IllegalArgumentException("Invalido correo o contraseña."));

       System.out.println(user.getRoles());

        // Agregue los roles del usuario al objeto Usuario
        Set<Role> roles = user.getRoles();
        user.setRoles(roles);

        System.out.println(user.getRoles());
        var jwt = jwtService.generateToken(user);
        return JwtAuthenticationResponse.builder().token(jwt).usuario(user).build();
    }

    @Override
    public JwtAuthenticationResponse user(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        System.out.println(authentication.getPrincipal().toString());
        if (authentication != null && authentication.getPrincipal() instanceof UserDetails) {
          UserDetails userDetails = (UserDetails) authentication.getPrincipal();
          String email = userDetails.getUsername();

          Usuario usuario = userRepository.findAllByEmail(email)
            .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado"));

          return JwtAuthenticationResponse.builder().usuario(usuario).build();
        } else {
          throw new RuntimeException("Usuario no autenticado");
        }


    }
}

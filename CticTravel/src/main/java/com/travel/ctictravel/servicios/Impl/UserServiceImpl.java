package com.travel.ctictravel.servicios.Impl;

import com.travel.ctictravel.modelos.Usuario;
import com.travel.ctictravel.repositorios.UsuarioRepository;
import com.travel.ctictravel.servicios.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UsuarioRepository userRepository;

    @Override
    public UserDetailsService userDetailsService(){
        return username -> {
          // Si no se encuentra el usuario, lanza una excepción
          Usuario usuario = userRepository.findAllByEmail(username).orElseThrow(()-> new UsernameNotFoundException("Usuario no Encontrado"));

          // Devuelve un objeto User con la información del usuario encontrado
          return new User(usuario.getEmail(),usuario.getPassword(), usuario.getAuthorities());
        };
    }
}

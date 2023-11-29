package com.travel.ctictravel.configuraciones;

import com.travel.ctictravel.servicios.UserService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;


@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private static final Logger log = LoggerFactory.getLogger(SecurityConfig.class);

    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final UserService userService;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
      http.csrf(AbstractHttpConfigurer::disable)
        // Desactiva la protección CSRF, útil para APIs RESTful.
        .authorizeHttpRequests(request -> request.requestMatchers("/api/auth/**").permitAll().anyRequest().authenticated())
        // Define reglas de autorización. Permite todas las solicitudes a "/api/login/**" sin autenticación,
        // pero requiere autenticación para cualquier otra solicitud.

        .sessionManagement(manager -> manager.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
        // Configura la gestión de sesiones para que sea sin estado (stateless), no se utilizan sesiones HTTP.

        .cors(cors -> cors
          .configurationSource(request -> {
            CorsConfiguration corsConfig = new CorsConfiguration();
            corsConfig.addAllowedOrigin("http://localhost:4200");
            corsConfig.addAllowedOrigin("/**");
            corsConfig.addAllowedHeader("*");
            corsConfig.addExposedHeader("Access-Control-Allow-Origin");
            corsConfig.addExposedHeader("Access-Control-Allow-Credentials");
            corsConfig.addAllowedMethod("*");
            corsConfig.setAllowCredentials(true);
            corsConfig.setMaxAge(3500L);
            return corsConfig;
          }))
        // Configura la política CORS para permitir solicitudes desde "http://localhost:4200" y cualquier origen.
        // Especifica los encabezados y métodos permitidos.

        .authenticationProvider(authenticationProvider()).addFilterBefore(
          jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
      // Configura el proveedor de autenticación y agrega un filtro personalizado (jwtAuthenticationFilter)
      // antes del filtro estándar de Spring Security (UsernamePasswordAuthenticationFilter).

      return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userService.userDetailsService());
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config)
            throws Exception {
        return config.getAuthenticationManager();
    }

}

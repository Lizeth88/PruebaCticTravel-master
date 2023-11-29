package com.travel.ctictravel.configuraciones;

import io.jsonwebtoken.ExpiredJwtException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class ManejadorExcepciones {

  @ExceptionHandler(RuntimeException.class)
  @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
  public ResponseEntity<Object> handleRuntimeException(RuntimeException e) {

    // Verifica si el mensaje de la excepción es nulo y proporciona un mensaje predeterminado

    String mensajeError = (e.getMessage() != null) ? e.getMessage() : "Ocurrió un error interno en el servidor.";

    // Crear un objeto que contenga el mensaje de error
    ErrorResponse errorResponse = new ErrorResponse(mensajeError);

    return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
  }

  @ExceptionHandler(ExpiredJwtException.class)
  @ResponseStatus(HttpStatus.UNAUTHORIZED)
  public ResponseEntity<Object> handleExpiredJwtException(ExpiredJwtException e) {
    // Obtener información específica de la excepción
    String mensajeError = "Token JWT expirado. " + e.getMessage();

    System.out.println(mensajeError);
    // Crear un objeto que contenga el mensaje de error
    ErrorResponse errorResponse = new ErrorResponse(mensajeError);

    return new ResponseEntity<>(errorResponse, HttpStatus.UNAUTHORIZED);
  }

  // Clase para representar el cuerpo de la respuesta con un mensaje de error
  private static class ErrorResponse {
    private final String mensaje;

    public ErrorResponse(String mensaje) {
      this.mensaje = mensaje;
    }

    public String getMensaje() {
      return mensaje;
    }
  }
}

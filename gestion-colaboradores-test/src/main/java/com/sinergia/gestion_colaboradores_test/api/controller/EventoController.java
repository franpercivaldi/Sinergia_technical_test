package com.sinergia.gestion_colaboradores_test.api.controller;

import com.sinergia.gestion_colaboradores_test.api.dto.EventoDTO;
import com.sinergia.gestion_colaboradores_test.api.model.Evento;
import com.sinergia.gestion_colaboradores_test.api.service.EventoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/eventos")
public class EventoController {

  @Autowired
  private EventoService eventoService;

  // Get para obtener todos los eventos
  @GetMapping
  public ResponseEntity<Iterable<Evento>> obtenerEventos() {
    try {
      Iterable<Evento> eventos = eventoService.findAll();
      return new ResponseEntity<>(eventos, HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Obtener un metodo por id
  @GetMapping("/{id}")
  public ResponseEntity<Evento> obtenerEventoPorId(@PathVariable Long id) {
    try {
      Evento evento = eventoService.findById(id);
      return new ResponseEntity<>(evento, HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Método para crear un evento
  @PostMapping
  public ResponseEntity<Evento> crearEvento(@RequestBody EventoDTO eventoDTO) {
    try {
      Evento nuevoEvento = eventoService.crearEvento(eventoDTO);
      return new ResponseEntity<>(nuevoEvento, HttpStatus.CREATED);
    } catch (IllegalArgumentException e) {
      return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
    } catch (Exception e) {
      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

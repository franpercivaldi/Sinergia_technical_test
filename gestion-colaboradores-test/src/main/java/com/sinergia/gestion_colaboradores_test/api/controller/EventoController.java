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

  // Obtener un evento por id. Debe devolver tambien todos los colaboradores
  // asociados a ese evento. Separados por tareas mecanicas y no mecanicas
  @GetMapping("/{id}")
  public ResponseEntity<EventoDTO> obtenerEventoPorId(@PathVariable Long id) {
    try {
      EventoDTO eventoDTO = eventoService.findById(id);
      return new ResponseEntity<>(eventoDTO, HttpStatus.OK);
    } catch (IllegalArgumentException e) {
      return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
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

  // Método para borrar un evento
  @DeleteMapping("/{id}")
  public ResponseEntity<HttpStatus> borrarEvento(@PathVariable Long id) {
    try {
      eventoService.deleteById(id);
      return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    } catch (IllegalArgumentException e) {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    } catch (Exception e) {
      return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

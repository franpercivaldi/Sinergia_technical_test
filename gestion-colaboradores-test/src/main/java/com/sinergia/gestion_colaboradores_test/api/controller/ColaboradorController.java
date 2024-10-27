package com.sinergia.gestion_colaboradores_test.api.controller;

import java.util.List;

import com.sinergia.gestion_colaboradores_test.api.model.Colaborador;
import com.sinergia.gestion_colaboradores_test.api.service.ColaboradorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/colaboradores")
public class ColaboradorController {

  // Inyeccion de Servicio
  @Autowired
  private ColaboradorService colaboradorService;

  // Devolver todos los colaboradores
  @GetMapping
  public List<Colaborador> getAll() {
    return colaboradorService.findAll();
  }

  // Crear colaborador
  @PostMapping
  public ResponseEntity<String> create(@RequestBody Colaborador colaborador) {
    if (colaboradorService.existsByNombreAndApellido(colaborador.getNombre(), colaborador.getApellido())) {
      return ResponseEntity.badRequest().body("Colaborador ya existe");
    }
    colaboradorService.save(colaborador);
    return ResponseEntity.ok("Colaborador registrado correctamente");
  }

  // Editar colaborador
  @PutMapping("/{id}")
  public ResponseEntity<String> update(@PathVariable Long id, @RequestBody Colaborador colaborador) {
    Colaborador existingColaborador = colaboradorService.findById(id);
    if (existingColaborador == null) {
      return ResponseEntity.notFound().build(); // 404
    }
    colaborador.setId(id);
    colaboradorService.save(colaborador);
    return ResponseEntity.ok("Colaborador modificado correctamente");
  }

  // Eliminar colaborador
  @DeleteMapping("/{id}")
  public ResponseEntity<String> delete(@PathVariable Long id) {
    colaboradorService.deleteById(id);
    return ResponseEntity.ok("Colaborador eliminado correctamente");
  }

  // Retornar colaboradores asociados a una tarea, tarea_id es el id de la tarea
  @GetMapping("/tarea/{tarea_id}")
  public List<Colaborador> getByTarea(@PathVariable Long tarea_id) {
    return colaboradorService.findByTarea(tarea_id);
  }

}
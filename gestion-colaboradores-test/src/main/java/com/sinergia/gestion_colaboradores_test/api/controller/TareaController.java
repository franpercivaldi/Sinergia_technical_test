package com.sinergia.gestion_colaboradores_test.api.controller;

import com.sinergia.gestion_colaboradores_test.api.model.Tarea;
import com.sinergia.gestion_colaboradores_test.api.service.TareaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tareas")
public class TareaController {

  @Autowired
  private TareaService tareaService;

  @GetMapping("/mecanicas")
  public List<Tarea> getMecanicas() {
    return tareaService.getMecanicas();
  }

  @GetMapping("/no-mecanicas")
  public List<Tarea> getNoMecanicas() {
    return tareaService.getNoMecanicas();
  }
}

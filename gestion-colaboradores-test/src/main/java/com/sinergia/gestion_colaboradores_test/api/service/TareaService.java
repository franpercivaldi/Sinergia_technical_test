package com.sinergia.gestion_colaboradores_test.api.service;

import com.sinergia.gestion_colaboradores_test.api.model.Tarea;
import com.sinergia.gestion_colaboradores_test.api.model.TipoTarea;
import com.sinergia.gestion_colaboradores_test.api.repository.TareaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TareaService {

  @Autowired
  private TareaRepository tareaRepository;

  public List<Tarea> getMecanicas() {
    return tareaRepository.findByTipo(TipoTarea.MECANICA);
  }

  public List<Tarea> getNoMecanicas() {
    return tareaRepository.findByTipo(TipoTarea.NO_MECANICA);
  }
}

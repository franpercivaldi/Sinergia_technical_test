package com.sinergia.gestion_colaboradores_test.api.service;

import com.sinergia.gestion_colaboradores_test.api.dto.EventoDTO;
import com.sinergia.gestion_colaboradores_test.api.dto.TareaConColaboradoresDTO;
import com.sinergia.gestion_colaboradores_test.api.model.Colaborador;
import com.sinergia.gestion_colaboradores_test.api.model.Evento;
import com.sinergia.gestion_colaboradores_test.api.model.Tarea;
import com.sinergia.gestion_colaboradores_test.api.repository.ColaboradorRepository; // Asegúrate de tener el repositorio de Colaborador
import com.sinergia.gestion_colaboradores_test.api.repository.EventoRepository;
import com.sinergia.gestion_colaboradores_test.api.repository.TareaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class EventoService {

  @Autowired
  private EventoRepository eventoRepository;

  @Autowired
  private TareaRepository tareaRepository;

  @Autowired
  private ColaboradorRepository colaboradorRepository; // Repositorio para verificar colaboradores

  public List<Evento> findAll() {
    return eventoRepository.findAll();
  }

  public Evento crearEvento(EventoDTO eventoDTO) {
    Evento evento = new Evento();
    evento.setTitulo(eventoDTO.getTitulo());
    // Convertir la fecha de String a LocalDate
    try {
      LocalDate fecha = LocalDate.parse(eventoDTO.getFecha(), DateTimeFormatter.ISO_DATE);
      evento.setFecha(fecha);
    } catch (DateTimeParseException e) {
      throw new IllegalArgumentException("Formato de fecha no válido. Debe ser YYYY-MM-DD.");
    }

    // Validar y asignar tareas mecánicas
    List<Tarea> tareasMecanicas = new ArrayList<>();
    for (TareaConColaboradoresDTO tareaDTO : eventoDTO.getTareasMecanicas()) {
      Optional<Tarea> tareaOpt = tareaRepository.findById(tareaDTO.getId());
      if (tareaOpt.isPresent()) {
        Tarea tarea = tareaOpt.get();
        List<Colaborador> colaboradores = new ArrayList<>();

        for (Long colaboradorId : tareaDTO.getColaboradoresIds()) {
          Optional<Colaborador> colaboradorOpt = colaboradorRepository.findById(colaboradorId);
          if (colaboradorOpt.isPresent() && tarea.getColaboradores().contains(colaboradorOpt.get())) {
            colaboradores.add(colaboradorOpt.get());
          } else {
            // Manejo de error: el colaborador no existe o no está asociado a la tarea
            throw new IllegalArgumentException("Colaborador con ID " + colaboradorId
                + " no existe o no está asociado a la tarea con ID " + tareaDTO.getId());
          }
        }
        tarea.setColaboradores(colaboradores); // Asignar todos los colaboradores válidos
        tareasMecanicas.add(tarea);
      } else {
        // Manejo de error: la tarea no existe
        throw new IllegalArgumentException("Tarea con ID " + tareaDTO.getId() + " no existe.");
      }
    }

    // Validar y asignar tareas no mecánicas
    List<Tarea> tareasNoMecanicas = new ArrayList<>();
    for (TareaConColaboradoresDTO tareaDTO : eventoDTO.getTareasNoMecanicas()) {
      Optional<Tarea> tareaOpt = tareaRepository.findById(tareaDTO.getId());
      if (tareaOpt.isPresent()) {
        Tarea tarea = tareaOpt.get();
        List<Colaborador> colaboradores = new ArrayList<>();

        for (Long colaboradorId : tareaDTO.getColaboradoresIds()) {
          Optional<Colaborador> colaboradorOpt = colaboradorRepository.findById(colaboradorId);
          if (colaboradorOpt.isPresent()) {
            colaboradores.add(colaboradorOpt.get());
          } else {
            // Manejo de error: el colaborador no existe
            throw new IllegalArgumentException("Colaborador con ID " + colaboradorId + " no existe.");
          }
        }
        tarea.setColaboradores(colaboradores); // Asignar todos los colaboradores válidos
        tareasNoMecanicas.add(tarea);
      } else {
        // Manejo de error: la tarea no existe
        throw new IllegalArgumentException("Tarea con ID " + tareaDTO.getId() + " no existe.");
      }
    }

    evento.setTareasMecanicas(tareasMecanicas);
    evento.setTareasNoMecanicas(tareasNoMecanicas);

    return eventoRepository.save(evento);
  }
}

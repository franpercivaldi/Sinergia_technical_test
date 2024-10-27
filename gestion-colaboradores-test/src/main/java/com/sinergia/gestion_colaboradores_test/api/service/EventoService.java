package com.sinergia.gestion_colaboradores_test.api.service;

import com.sinergia.gestion_colaboradores_test.api.dto.EventoDTO;
import com.sinergia.gestion_colaboradores_test.api.dto.TareaConColaboradoresDTO;
import com.sinergia.gestion_colaboradores_test.api.model.Colaborador;
import com.sinergia.gestion_colaboradores_test.api.model.Evento;
import com.sinergia.gestion_colaboradores_test.api.model.Tarea;
import com.sinergia.gestion_colaboradores_test.api.repository.ColaboradorRepository; // Asegúrate de tener el repositorio de Colaborador
import com.sinergia.gestion_colaboradores_test.api.repository.EventoRepository;
import com.sinergia.gestion_colaboradores_test.api.repository.TareaRepository;

import jakarta.transaction.Transactional;

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

  // Obtener un evento por id. Debe devolver tambien todos los colaboradores
  // asociados a ese evento. Separados por tareas mecanicas y no mecanicas
  public EventoDTO findById(Long id) {
    Optional<Evento> eventoOpt = eventoRepository.findById(id);
    if (eventoOpt.isPresent()) {
      Evento evento = eventoOpt.get();

      // Construir DTO para el evento
      EventoDTO eventoDTO = new EventoDTO();
      eventoDTO.setTitulo(evento.getTitulo());
      eventoDTO.setFecha(evento.getFecha().toString());

      // Crear las listas de tareas mecánicas y no mecánicas con colaboradores
      List<TareaConColaboradoresDTO> tareasMecanicasDTO = new ArrayList<>();
      List<TareaConColaboradoresDTO> tareasNoMecanicasDTO = new ArrayList<>();

      // Procesar tareas mecánicas
      for (Tarea tarea : evento.getTareasMecanicas()) {
        TareaConColaboradoresDTO tareaDTO = new TareaConColaboradoresDTO();
        tareaDTO.setId(tarea.getId());
        // Obtener IDs de colaboradores asociados a esta tarea
        List<Long> colaboradoresIds = tarea.getColaboradores().stream()
            .map(Colaborador::getId)
            .toList();
        tareaDTO.setColaboradoresIds(colaboradoresIds);

        tareasMecanicasDTO.add(tareaDTO);
      }

      // Procesar tareas no mecánicas
      for (Tarea tarea : evento.getTareasNoMecanicas()) {
        TareaConColaboradoresDTO tareaDTO = new TareaConColaboradoresDTO();
        tareaDTO.setId(tarea.getId());

        // Obtener IDs de colaboradores asociados a esta tarea
        List<Long> colaboradoresIds = tarea.getColaboradores().stream()
            .map(Colaborador::getId)
            .toList();
        tareaDTO.setColaboradoresIds(colaboradoresIds);

        tareasNoMecanicasDTO.add(tareaDTO);
      }

      eventoDTO.setTareasMecanicas(tareasMecanicasDTO);
      eventoDTO.setTareasNoMecanicas(tareasNoMecanicasDTO);

      return eventoDTO;
    } else {
      throw new IllegalArgumentException("Evento con ID " + id + " no encontrado.");
    }
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

  // Método para borrar un evento
  @Transactional
  public void deleteById(Long id) {
    Optional<Evento> eventoOpt = eventoRepository.findById(id);
    if (eventoOpt.isPresent()) {
      Evento evento = eventoOpt.get();

      // Desvincular colaboradores de tareas mecánicas
      for (Tarea tarea : evento.getTareasMecanicas()) {
        tarea.getColaboradores().clear(); // Limpia la lista de colaboradores
        tareaRepository.save(tarea); // Guarda los cambios en la tarea
      }

      // Desvincular colaboradores de tareas no mecánicas
      for (Tarea tarea : evento.getTareasNoMecanicas()) {
        tarea.getColaboradores().clear();
        tareaRepository.save(tarea);
      }

      // Aquí puedes decidir eliminar las tareas si lo deseas
      // O puedes simplemente dejarlas si podrían ser usadas en otro lugar
      evento.getTareasMecanicas().forEach(tarea -> tareaRepository.delete(tarea));
      evento.getTareasNoMecanicas().forEach(tarea -> tareaRepository.delete(tarea));

      // Finalmente, eliminar el evento
      eventoRepository.deleteById(id);
    } else {
      throw new IllegalArgumentException("Evento con ID " + id + " no encontrado.");
    }
  }

}

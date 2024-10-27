package com.sinergia.gestion_colaboradores_test.api.repository;

import com.sinergia.gestion_colaboradores_test.api.model.Colaborador;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ColaboradorRepository extends JpaRepository<Colaborador, Long> {
  boolean existsByNombreAndApellido(String nombre, String apellido); // Metodo personalizado

  List<Colaborador> findByTareasId(Long tarea_id); // Metodo personalizado
}
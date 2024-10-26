package com.sinergia.gestion_colaboradores_test.api.repository;

import com.sinergia.gestion_colaboradores_test.api.model.Colaborador;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ColaboradorRepository extends JpaRepository<Colaborador, Long> {
  boolean existsByNombreAndApellido(String nombre, String apellido); // Metodo personalizado
}
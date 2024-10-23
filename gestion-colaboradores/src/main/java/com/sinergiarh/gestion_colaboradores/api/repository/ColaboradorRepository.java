package com.sinergiarh.gestion_colaboradores.api.repository;

import com.sinergiarh.gestion_colaboradores.api.model.Colaborador;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ColaboradorRepository extends JpaRepository<Colaborador, Long> {
  boolean existsByNombreAndApellido(String nombre, String apellido); // Metodo personalizado
}
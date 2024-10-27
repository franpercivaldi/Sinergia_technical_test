package com.sinergia.gestion_colaboradores_test.api.repository;

import com.sinergia.gestion_colaboradores_test.api.model.Evento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EventoRepository extends JpaRepository<Evento, Long> {
}

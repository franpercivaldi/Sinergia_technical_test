package com.sinergia.gestion_colaboradores_test.api.repository;

import com.sinergia.gestion_colaboradores_test.api.model.Tarea;
import com.sinergia.gestion_colaboradores_test.api.model.TipoTarea;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TareaRepository extends JpaRepository<Tarea, Long> {
  List<Tarea> findByTipo(TipoTarea tipo);
}

package com.sinergia.gestion_colaboradores_test.api.dto;

import java.util.List;

public class EventoDTO {
  private String titulo;
  private String fecha;
  private List<TareaConColaboradoresDTO> tareasMecanicas;
  private List<TareaConColaboradoresDTO> tareasNoMecanicas;

  // Getters y Setters

  public String getTitulo() {
    return titulo;
  }

  public void setTitulo(String titulo) {
    this.titulo = titulo;
  }

  public String getFecha() {
    return fecha;
  }

  public void setFecha(String fecha) {
    this.fecha = fecha;
  }

  public List<TareaConColaboradoresDTO> getTareasMecanicas() {
    return tareasMecanicas;
  }

  public void setTareasMecanicas(List<TareaConColaboradoresDTO> tareasMecanicas) {
    this.tareasMecanicas = tareasMecanicas;
  }

  public List<TareaConColaboradoresDTO> getTareasNoMecanicas() {
    return tareasNoMecanicas;
  }

  public void setTareasNoMecanicas(List<TareaConColaboradoresDTO> tareasNoMecanicas) {
    this.tareasNoMecanicas = tareasNoMecanicas;
  }
}

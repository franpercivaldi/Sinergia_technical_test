package com.sinergia.gestion_colaboradores_test.api.dto;

import java.util.List;

public class TareaConColaboradoresDTO {
  private Long id;
  private List<Long> colaboradoresIds; // Lista de IDs de colaboradores

  // Getters y Setters

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public List<Long> getColaboradoresIds() {
    return colaboradoresIds;
  }

  public void setColaboradoresIds(List<Long> colaboradoresIds) {
    this.colaboradoresIds = colaboradoresIds;
  }
}

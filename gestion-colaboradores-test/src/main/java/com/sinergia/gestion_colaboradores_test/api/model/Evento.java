package com.sinergia.gestion_colaboradores_test.api.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "eventos")
public class Evento {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false)
  private String titulo;

  @Column(nullable = false)
  private LocalDate fecha;

  @OneToMany(cascade = CascadeType.ALL)
  @JoinColumn(name = "evento_id")
  private List<Tarea> tareasMecanicas; // Mantiene las tareas mecánicas

  @OneToMany(cascade = CascadeType.ALL)
  @JoinColumn(name = "evento_id")
  private List<Tarea> tareasNoMecanicas; // Mantiene las tareas no mecánicas

  // Getters y Setters

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getTitulo() {
    return titulo;
  }

  public void setTitulo(String titulo) {
    this.titulo = titulo;
  }

  public LocalDate getFecha() {
    return fecha;
  }

  public void setFecha(LocalDate fecha) {
    this.fecha = fecha;
  }

  public List<Tarea> getTareasMecanicas() {
    return tareasMecanicas;
  }

  public void setTareasMecanicas(List<Tarea> tareasMecanicas) {
    this.tareasMecanicas = tareasMecanicas;
  }

  public List<Tarea> getTareasNoMecanicas() {
    return tareasNoMecanicas;
  }

  public void setTareasNoMecanicas(List<Tarea> tareasNoMecanicas) {
    this.tareasNoMecanicas = tareasNoMecanicas;
  }
}

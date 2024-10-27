package com.sinergia.gestion_colaboradores_test.api.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "colaboradores")
public class Colaborador {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false)
  private String nombre;

  @Column(nullable = false)
  private String apellido;

  private String celular;

  @Column(nullable = false)
  private String email;

  @Enumerated(EnumType.STRING)
  @Column(nullable = false)
  private Genero genero;

  private boolean inactivo;

  @Column(name = "fecha_inicio_ausencia")
  private String fechaInicioAusencia;

  @Column(name = "fecha_fin_ausencia")
  private String fechaFinAusencia;

  @ManyToMany
  @JoinTable(name = "colaborador_tarea", joinColumns = @JoinColumn(name = "colaborador_id"), inverseJoinColumns = @JoinColumn(name = "tarea_id"))
  private List<Tarea> tareas;

  // Getters y Setters

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getNombre() {
    return nombre;
  }

  public void setNombre(String nombre) {
    this.nombre = nombre;
  }

  public String getApellido() {
    return apellido;
  }

  public void setApellido(String apellido) {
    this.apellido = apellido;
  }

  public String getCelular() {
    return celular;
  }

  public void setCelular(String celular) {
    this.celular = celular;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public Genero getGenero() {
    return genero;
  }

  public void setGenero(Genero genero) {
    this.genero = genero;
  }

  public boolean isInactivo() {
    return inactivo;
  }

  public void setInactivo(boolean inactivo) {
    this.inactivo = inactivo;
  }

  public String getFechaInicioAusencia() {
    return fechaInicioAusencia;
  }

  public void setFechaInicioAusencia(String fechaInicioAusencia) {
    this.fechaInicioAusencia = fechaInicioAusencia;
  }

  public String getFechaFinAusencia() {
    return fechaFinAusencia;
  }

  public void setFechaFinAusencia(String fechaFinAusencia) {
    this.fechaFinAusencia = fechaFinAusencia;
  }

  public List<Tarea> getTareas() {
    return tareas;
  }

  public void setTareas(List<Tarea> tareas) {
    this.tareas = tareas;
  }
}

enum Genero {
  FEMENINO, MASCULINO
}

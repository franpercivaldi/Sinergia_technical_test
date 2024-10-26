package com.sinergia.gestion_colaboradores_test.api.service;

import org.springframework.stereotype.Service;

import java.util.List;

import com.sinergia.gestion_colaboradores_test.api.model.Colaborador;
import com.sinergia.gestion_colaboradores_test.api.repository.ColaboradorRepository;
import org.springframework.beans.factory.annotation.Autowired;

@Service
public class ColaboradorService {

  @Autowired
  private ColaboradorRepository colaboradorRepository;

  public List<Colaborador> findAll() {
    return colaboradorRepository.findAll();
  }

  public Colaborador save(Colaborador colaborador) {
    return colaboradorRepository.save(colaborador);
  }

  public void deleteById(Long id) {
    colaboradorRepository.deleteById(id);
  }

  public boolean existsByNombreAndApellido(String nombre, String apellido) {
    return colaboradorRepository.existsByNombreAndApellido(nombre, apellido);
  }

  public Colaborador findById(Long id) {
    return colaboradorRepository.findById(id).orElse(null);
  }

}
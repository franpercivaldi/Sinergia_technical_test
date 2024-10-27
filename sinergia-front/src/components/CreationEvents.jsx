import React, { useState } from 'react';
import {
  Dialog, DialogActions, DialogContent, DialogTitle, Button,
  TextField, MenuItem, Select, InputLabel, FormControl, Chip, Box
} from '@mui/material';

export default function CreationEvent({ open, onClose, selectedDate, onSave, colaboradoresByRol, tareasNoMecanicas, colaboradores, tareasMecanicasIds }) {
  const [eventTitle, setEventTitle] = useState('');
  const [assignedCollaborators, setAssignedCollaborators] = useState({});
  const [errorMessage, setErrorMessage] = useState('');

  // Requisitos mínimos de colaboradores para cada rol
  const minimumCollaborators = {
    acomodador: 2,
    tecnicoSonido: 2,
    audio: 1,
    video: 1,
    plataforma: 1,
  };

  const handleCollaboratorChange = (role, selectedCollaborators) => {
    setAssignedCollaborators((prev) => ({
      ...prev,
      [role]: selectedCollaborators
    }));
  };

  const handleDeleteCollaborator = (role, collaboratorToDelete) => {
    setAssignedCollaborators((prev) => ({
      ...prev,
      [role]: prev[role].filter((collaborator) => collaborator !== collaboratorToDelete),
    }));
  };

  // Función de validación de requisitos mínimos
  const validateCollaborators = () => {
    for (const role in minimumCollaborators) {
      const selected = assignedCollaborators[role] || [];
      if (selected.length < minimumCollaborators[role]) {
        setErrorMessage(`La tarea "${role}" necesita al menos ${minimumCollaborators[role]} colaboradores.`);
        return false;
      }
    }

    // Si no tiene titulo no se puede guardar
    if (!eventTitle) {
      setErrorMessage('El evento debe tener un título.');
      return false;
    }

    setErrorMessage('');
    return true;
  };

  const handleSave = () => {
    if (!validateCollaborators()) {
      return; // No guardar si no se cumple la validación
    }
    const event = {
      titulo: eventTitle,
      fecha: selectedDate,
      tareasMecanicas: Object.entries(assignedCollaborators)
        .filter(([role]) => Object.keys(colaboradoresByRol).includes(role))
        .map(([role, collaborators]) => ({
          id: tareasMecanicasIds[role],
          colaboradoresIds: collaborators.map((colaborador) => colaborador.id)
        })),
      tareasNoMecanicas: Object.entries(assignedCollaborators)
        .filter(([role]) => tareasNoMecanicas.map((tarea) => tarea.id).includes(role))
        .map(([tarea, collaborators]) => ({
          id: tarea,
          colaboradoresIds: collaborators.map((colaborador) => colaborador.id)
        }))
    };
    onSave(event);
    setEventTitle('');
    setAssignedCollaborators({});
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg">
      <DialogTitle>Crear Evento</DialogTitle>
      <DialogContent>
        <TextField
          label="Título del Evento"
          value={eventTitle}
          onChange={(e) => setEventTitle(e.target.value)}
          fullWidth
          margin="dense"
        />

        <Box sx={{ display: 'flex', gap: 4 }}>
          <Box sx={{ flex: 1 }}>
            <DialogTitle>Tareas Mecánicas</DialogTitle>
            {Object.entries(colaboradoresByRol).map(([role, collaborators]) => (
              <FormControl key={role} fullWidth margin="dense">
                <InputLabel>{role}</InputLabel>
                <Select
                  multiple
                  value={assignedCollaborators[role] || [] }
                  onChange={(e) => handleCollaboratorChange(role, e.target.value)}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip
                          key={value.id}
                          label={`${value.nombre} ${value.apellido}`}
                          onDelete={() => handleDeleteCollaborator(role, value)}
                        />
                      ))}
                    </Box>
                  )}
                >
                  {collaborators.map((colaborador) => (
                    <MenuItem key={colaborador.id} value={colaborador}>
                      {`${colaborador.nombre} ${colaborador.apellido}`}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            ))}
          </Box>

          <Box sx={{ flex: 1 }}>
            <DialogTitle>Tareas Especiales</DialogTitle>
            {tareasNoMecanicas.map((tarea) => (
              <FormControl key={tarea.id} fullWidth margin="dense">
                <InputLabel>{tarea.nombre}</InputLabel>
                <Select
                  multiple
                  value={assignedCollaborators[tarea.id] || [] }
                  onChange={(e) => handleCollaboratorChange(tarea.id, e.target.value)}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip
                          key={value.id}
                          label={`${value.nombre} ${value.apellido}`}
                          onDelete={() => handleDeleteCollaborator(tarea.id, value)}
                        />
                      ))}
                    </Box>
                  )}
                >
                  {colaboradores.map((colaborador) => (
                    <MenuItem key={colaborador.id} value={colaborador}>
                      {`${colaborador.nombre} ${colaborador.apellido}`}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            ))}
          </Box>
        </Box>

        {errorMessage && (
          <Box color="error.main" mt={2}>
            {errorMessage}
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">Cancelar</Button>
        <Button onClick={handleSave} color="primary">Guardar</Button>
      </DialogActions>
    </Dialog>
  );
}

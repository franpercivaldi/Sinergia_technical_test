import React, { useState } from 'react';
import {
  Dialog, DialogActions, DialogContent, DialogTitle, Button,
  TextField, MenuItem, Select, InputLabel, FormControl, Chip, Box
} from '@mui/material';

export default function CreationEvent({ open, onClose, selectedDate, onSave, colaboradoresByRol}) {
  const [eventTitle, setEventTitle] = useState('');
  const [assignedCollaborators, setAssignedCollaborators] = useState({});

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

  const handleSave = () => {
    const newEvent = { title: eventTitle, date: selectedDate, collaborators: assignedCollaborators };
    onSave(newEvent);
    setEventTitle('');
    setAssignedCollaborators({});
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Crear Evento</DialogTitle>
      <DialogContent>
        {/* Título del evento */}
        <TextField
          label="Título del Evento"
          value={eventTitle}
          onChange={(e) => setEventTitle(e.target.value)}
          fullWidth
          margin="dense"
        />

        {/* Asignacion de tareas mecanicas */}
        <DialogTitle>Tareas Mecanicas</DialogTitle>
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

        {/* Asignacion de Otro tipo de tareas */}
        <DialogTitle>Tareas Especiales</DialogTitle>

      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">Cancelar</Button>
        <Button onClick={handleSave} color="primary">Guardar</Button>
      </DialogActions>
    </Dialog>
  );
}
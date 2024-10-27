import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getEventoById } from '../api/services/eventoService';
import {
  TextField, Button, Box, Typography, FormControl, InputLabel, Select, MenuItem, Chip
} from '@mui/material';

export default function EventDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const data = await getEventoById(id);
        setEvent(data);
      } catch (error) {
        console.error('Error al cargar evento:', error);
      }
    };

    fetchEvent();
  }, [id]);

  const handleSave = async () => {
    try {
      // await updateEvento(event);
      // navigate('/calendar'); // Redirigir de nuevo al calendario después de guardar
      console.log('Evento guardado:', event);
    } catch (error) {
      console.error('Error al actualizar evento:', error);
    }
  };

  if (!event) return <Typography>Cargando...</Typography>;

  const handleTareaChange = (type, tareaId, field, value) => {
    setEvent((prevEvent) => ({
      ...prevEvent,
      [type]: prevEvent[type].map((tarea) =>
        tarea.id === tareaId ? { ...tarea, [field]: value } : tarea
      ),
    }));
  };

  return (
    <Box style={{backgroundColor:'white'}}>
      <Typography variant="h4">Editar Evento</Typography>

      {/* Campo para editar el título */}
      <TextField
        label="Título del Evento"
        value={event.titulo}
        onChange={(e) => setEvent({ ...event, titulo: e.target.value })}
        fullWidth
        margin="dense"
      />

      {/* Campo para editar la fecha */}
      <TextField
        label="Fecha del Evento"
        type="date"
        value={event.fecha}
        onChange={(e) => setEvent({ ...event, fecha: e.target.value })}
        fullWidth
        margin="dense"
      />

      {/* Campos para tareas mecánicas */}
      <Typography variant="h6">Tareas Mecánicas</Typography>
      {event.tareasMecanicas.map((tarea) => (
        <FormControl key={tarea.id} fullWidth margin="dense">
          <TextField
            label={`Nombre de la Tarea (${tarea.tipo})`}
            value={tarea.nombre}
            onChange={(e) => handleTareaChange("tareasMecanicas", tarea.id, "nombre", e.target.value)}
          />
        </FormControl>
      ))}

      {/* Campos para tareas no mecánicas */}
      <Typography variant="h6">Tareas No Mecánicas</Typography>
      {event.tareasNoMecanicas.map((tarea) => (
        <FormControl key={tarea.id} fullWidth margin="dense">
          <TextField
            label={`Nombre de la Tarea (${tarea.tipo})`}
            value={tarea.nombre}
            onChange={(e) => handleTareaChange("tareasNoMecanicas", tarea.id, "nombre", e.target.value)}
          />
        </FormControl>
      ))}

      <Button onClick={handleSave} color="primary" variant="contained">
        Guardar
      </Button>
    </Box>
  );
}

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getEventoById } from '../api/services/eventoService';
import { getColaboradores } from '../api/services/colaboradoresService';
import { deleteEvento } from '../api/services/eventoService';
import {TextField, Button, Box, Typography, FormControl, Chip, Paper} from '@mui/material';
import Grid from '@mui/material/Grid2';

export default function EventDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [colaboradores, setColaboradores] = useState([]);

  // Diccionarios de tareas
  const tareasMecanicas = {
    1: 'Acomodador',
    2: 'Técnico de Sonido',
    3: 'Audio',
    4: 'Video',
    5: 'Plataforma',
  };

  const tareasNoMecanicas = {
    10: 'Palabras de apertura',
    11: 'Tematica',
    12: 'Escenificacion',
    13: 'Palabras de cierre',
    14: 'Discurso',
  };

  useEffect(() => {
    const fetchData = async () => {
      const event = await getEventoById(id);
      const colaboradores = await getColaboradores();
      setEvent(event);
      setColaboradores(colaboradores);
    };
    fetchData();
  }, [id]);

  const getColaboradorNombre = (id) => {
    const colaborador = colaboradores.find(c => c.id === id);
    return colaborador ? colaborador.nombre : 'Desconocido';
  };

  const handleDelete = async () => {
    try {
      await deleteEvento(id);
      navigate('/calendar');
    } catch(error) {
      console.error('Error al borrar evento:', error);
    }
  };

  if (!event) return <Typography>Cargando...</Typography>;

  return (
    <Box style={{ backgroundColor: 'white', padding: '16px' }}>
      <Typography variant="h4">Evento {event.titulo}</Typography>

      {/* Campo para editar la fecha */}
      <TextField
        label="Fecha del Evento"
        value={event.fecha}
        margin="dense"
        readOnly="true"
      />

      {/* Campos para tareas mecánicas */}
      <Typography variant="h6" style={{ marginTop: '20px' }}>Tareas Mecánicas</Typography>
      {event.tareasMecanicas.map((tarea) => (
        <Paper key={tarea.id} style={{ padding: '16px', marginTop: '8px' }} elevation={2}>
          <FormControl fullWidth margin="dense">
            <TextField
              label="Nombre de la Tarea"
              value={tareasMecanicas[tarea.id] || 'Desconocido'}
              margin="dense"
            />
          </FormControl>
          <Typography variant="body1">Colaboradores:</Typography>
          <Grid container spacing={1}>
            {tarea.colaboradoresIds.map((colaboradorId) => (
              <Grid item key={colaboradorId}>
                <Chip label={getColaboradorNombre(colaboradorId)} />
              </Grid>
            ))}
          </Grid>
        </Paper>
      ))}

      {/* Campos para tareas no mecánicas */}
      <Typography variant="h6" style={{ marginTop: '20px' }}>Tareas No Mecánicas</Typography>
      {event.tareasNoMecanicas.map((tarea) => (
        <Paper key={tarea.id} style={{ padding: '16px', marginTop: '8px' }} elevation={2}>
          <FormControl fullWidth margin="dense">
            <TextField
              label="Nombre de la Tarea"
              value={tareasNoMecanicas[tarea.id] || 'Desconocido'}
              margin="dense"
              InputProps={{
                readOnly: true,
              }}
            />
          </FormControl>
          <Typography variant="body1">Colaboradores:</Typography>
          <Grid container spacing={1}>
            {tarea.colaboradoresIds.map((colaboradorId) => (
              <Grid item key={colaboradorId}>
                <Chip label={getColaboradorNombre(colaboradorId)} />
              </Grid>
            ))}
          </Grid>
        </Paper>
      ))}

      <Button onClick={handleDelete} color="error" variant="contained" style={{ marginTop: '20px' }}>
        Borrar
      </Button>
    </Box>
  );
}

import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";
import Box from '@mui/material/Box';
import Sidebar from '../components/Sidebar';
import CreationEvents from '../components/CreationEvents';
import {getColaboradoresByTareaId} from '../api/services/colaboradoresService';
import {getTareasNoMecanicas} from '../api/services/tareasService';
import {getColaboradores} from '../api/services/colaboradoresService';
import {saveEvento} from '../api/services/eventoService';


export default function CalendarPage() {
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [tareasMecanicasIds, setTareasMecanicasIds] = useState({});
  
  // Todos los colaboradores
  const [colaboradores, setColaboradores] = useState([]);

  // Colaboradores por rol
  const [colaboradoresByRol, setColaboradoresByRol] = useState({
    acomodador: [],
    tecnicoSonido: [],
    audio: [],
    video: [],
    plataforma: [],
  });

  // Tareas no mecanicas
  const [tareasNoMecanicas, setTareasNoMecanicas] = useState([]);

  const [events, setEvents] = useState([
    { title: 'Evento 1', date: new Date().toISOString().split('T')[0] }
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {

        // Obtener todos los colaboradores
        const colaboradores = await getColaboradores();
        setColaboradores(colaboradores);

        // Obtener tareas no mecanicas
        const tareasNoMecanicas = await getTareasNoMecanicas();
        setTareasNoMecanicas(tareasNoMecanicas);

        // Obtener tareas no mecanicas
        const acomodadores = await getColaboradoresByTareaId(1);
        const tecnicosSonido = await getColaboradoresByTareaId(2);
        const audio = await getColaboradoresByTareaId(3);
        const video = await getColaboradoresByTareaId(4);
        const plataformas = await getColaboradoresByTareaId(5);

        setColaboradoresByRol({
          acomodador: acomodadores,
          tecnicoSonido: tecnicosSonido,
          audio: audio,
          video: video,
          plataforma: plataformas,
        });

        setTareasMecanicasIds({
          acomodador: 1,
          tecnicoSonido: 2,
          audio: 3,
          video: 4,
          plataforma: 5,
        });

      } catch (error) {
        console.error('Error al obtener colaboradores por rol:', error);
      }
    };

    fetchData();
  }, []);


  const handleDateClick = (arg) => {
    setSelectedDate(arg.dateStr);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleSaveEvent = (newEvent) => {
    saveEvento(newEvent)
      .then((response) => {
        setEvents([...events, {
          title: response.titulo,
          date: response.fecha,
        }]);
      })
      .catch((error) => {
        console.error('Error al guardar evento:', error);
      }
    );
  };

  return (
    <Box style={{ height: '100vh', width: '100vw', display: 'flex', flexDirection: 'column' }}>
      <Sidebar />
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        height={window.innerHeight}
        events={events}
        dateClick={handleDateClick}
      />
      <CreationEvents
        open={open}
        onClose={handleClose}
        selectedDate={selectedDate}
        onSave={handleSaveEvent}
        colaboradoresByRol={colaboradoresByRol}
        tareasNoMecanicas={tareasNoMecanicas}
        colaboradores={colaboradores}
        tareasMecanicasIds={tareasMecanicasIds}
      />
    </Box>
  );
}

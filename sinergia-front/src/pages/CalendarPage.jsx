import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";
import Box from '@mui/material/Box';
import Sidebar from '../components/Sidebar';
import CreationEvents from '../components/CreationEvents';
import {getColaboradoresByTareaId} from '../api/services/colaboradoresService';

export default function CalendarPage() {
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState([
    { title: 'Evento 1', date: new Date().toISOString().split('T')[0] }
  ]);

  const [colaboradoresByRol, setColaboradoresByRol] = useState({
    acomodador: [],
    tecnicoSonido: [],
    audio: [],
    video: [],
    plataforma: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
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
    setEvents([...events, newEvent]);
    setOpen(false);
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
      />
    </Box>
  );
}

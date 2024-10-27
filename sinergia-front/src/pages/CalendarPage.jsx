import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";
import Box from '@mui/material/Box';
import Sidebar from '../components/Sidebar';
import CreationEvents from '../components/CreationEvents';
import { useNavigate } from 'react-router-dom';
import { getColaboradoresByTareaId } from '../api/services/colaboradoresService';
import { getTareasNoMecanicas } from '../api/services/tareasService';
import { getColaboradores } from '../api/services/colaboradoresService';
import { saveEvento, getEventos } from '../api/services/eventoService';

export default function CalendarPage() {
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [tareasMecanicasIds, setTareasMecanicasIds] = useState({});
  const [colaboradores, setColaboradores] = useState([]);
  const [colaboradoresByRol, setColaboradoresByRol] = useState({
    acomodador: [],
    tecnicoSonido: [],
    audio: [],
    video: [],
    plataforma: [],
  });
  const [tareasNoMecanicas, setTareasNoMecanicas] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const eventos = await getEventos();
        const events = eventos.map((evento) => ({
          title: evento.titulo,
          date: evento.fecha,
          extendedProps: evento // Guardar información completa del evento
        }));
        setEvents(events);

        const colaboradores = await getColaboradores();
        setColaboradores(colaboradores);

        const tareasNoMecanicas = await getTareasNoMecanicas();
        setTareasNoMecanicas(tareasNoMecanicas);

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
          extendedProps: response // Guardar información completa del evento
        }]);
      })
      .catch((error) => {
        console.error('Error al guardar evento:', error);
      });
  };

  const handleEventClick = (info) => {
    const eventId = info.event.extendedProps.id;
    navigate(`/event/${eventId}`);
  };

  return (
    <Box style={{ height: '100vh', width: '100vw', display: 'flex', flexDirection: 'column' }}>
      <Sidebar />
      <FullCalendar
        events={events}
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        height={window.innerHeight}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
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

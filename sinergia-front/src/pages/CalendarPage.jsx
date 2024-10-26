import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import Box from '@mui/material/Box';
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick

export default function CalendarPage() {
  const handleDateClick = (arg) => {
    alert('date click! ' + arg.dateStr);
  };

  // Obtener la fecha de mañana en formato ISO
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const formattedDate = tomorrow.toISOString().split('T')[0]; // Formato YYYY-MM-DD

  return (
    <Box
      style={{
        height: '100vh',
        width: '100vw',
      }}
    >
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        height={window.innerHeight}
        events={[
          { title: 'event 1', date: formattedDate }, // Evento para mañana
        ]}
        dateClick={handleDateClick} // Llamar funcion cuando se hace click en una fecha
      />
    </Box>
  );
}

import React, { useState } from 'react';
import { Calendar, Badge, List } from 'rsuite';
import { styled } from '@mui/material/styles';

// Estilos para el calendario
const Styles = styled('div')({
  '.calendar-todo-item-badge': {
    marginTop: '5px',
    width: '8px',
    height: '8px',
    backgroundColor: '#2196f3',
    borderRadius: '50%',
  },
});

// Función para obtener la lista de tareas según la fecha
function getTodoList(date) {
  if (!date) return [];
  const day = date.getDate();

  switch (day) {
    case 10:
      return [
        { time: '10:30 am', title: 'Meeting' },
        { time: '12:00 pm', title: 'Lunch' },
      ];
    case 15:
      return [
        { time: '09:30 am', title: 'Products Introduction Meeting' },
        { time: '12:30 pm', title: 'Client entertaining' },
        { time: '02:00 pm', title: 'Product design discussion' },
        { time: '05:00 pm', title: 'Product test and acceptance' },
        { time: '06:30 pm', title: 'Reporting' },
      ];
    default:
      return [];
  }
}

// Renderizado de las celdas del calendario con la lista de tareas
function renderCell(date) {
  const list = getTodoList(date);
  if (list.length) {
    return <Badge className="calendar-todo-item-badge" />;
  }
  return null;
}

const CalendarEvents = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleSelect = date => {
    setSelectedDate(date);
  };

  return (
    <Styles>
      <div style={{ display: 'flex', gap: '10px' }}>
        <Calendar
          compact
          renderCell={renderCell}
          onSelect={handleSelect}
          bordered
          style={{ width: 320 }}
        />
        <TodoList date={selectedDate} />
      </div>
    </Styles>
  );
};

// Componente de lista de tareas
const TodoList = ({ date }) => {
  const list = getTodoList(date);
  if (!list.length) {
    return <div style={{ padding: '1rem' }}>No tasks for this date</div>;
  }

  return (
    <List bordered style={{ width: '100%' }}>
      {list.map(item => (
        <List.Item key={item.time}>
          <div>{item.time}</div>
          <div>{item.title}</div>
        </List.Item>
      ))}
    </List>
  );
};

export default CalendarEvents;

import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';

// Define el estilo de los botones
const buttonStyles = {
  transition: 'all 0.3s ease',
  '&:hover': {
    boxShadow: 3, // Efecto de elevación en hover
    transform: 'translateY(-4px)', // Mover hacia arriba
  },
  margin: '30% 0 30% 0', // Agregar un poco de margen
};

const Sidebar = () =>  {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box
      sx={{
        width: 250,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center', // Centrar horizontalmente
        padding: 2, // Agregar un poco de padding
      }}
      role="presentation"
      onClick={toggleDrawer(false)}
    >
      {/* Boton Home */}
      <Button sx={buttonStyles}>
        <HomeOutlinedIcon fontSize="large" />
      </Button>
      {/* Boton de personal */}
      <Button sx={buttonStyles}>
        <GroupsOutlinedIcon fontSize="large" />
      </Button>
      {/* Boton de calendario */}
      <Button sx={buttonStyles}>
        <CalendarTodayOutlinedIcon fontSize="large" />
      </Button>
    </Box>
  );

  return (
    <div>
      <Button onClick={toggleDrawer(true)}>Open drawer</Button>
      <Drawer
        open={open}
        onClose={toggleDrawer(false)}
        sx={{
          '& .MuiDrawer-paper': {
            backgroundColor: 'rgba(255, 255, 255, .9)', // Fondo blanco con opacidad
          },
        }}>
        {DrawerList}
      </Drawer>
    </div>
  );
}

export default Sidebar;
import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';

export default function TemporaryDrawer() {
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
      <Button>
        <HomeOutlinedIcon fontSize="large" />
      </Button>
      {/* Boton de personal */}
      <Button style={{ margin: '10px 0' }}>
        <GroupsOutlinedIcon fontSize="large" />
      </Button>
      {/* Boton de calendario */}
      <Button style={{ margin: '10px 0' }}>
        <CalendarTodayOutlinedIcon fontSize="large" />
      </Button>
    </Box>
  );

  return (
    <div>
      <Button onClick={toggleDrawer(true)}>Open drawer</Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}

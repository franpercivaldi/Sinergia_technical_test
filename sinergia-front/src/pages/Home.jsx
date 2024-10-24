import React from 'react';
import Sidebar from '../components/Sidebar';
import ListColaboradores from '../components/ListColaboradores';
import DatosPersonales from '../components/DatosPersonales';
import Grid from '@mui/material/Grid2';

const Home = () => {

  const colaboradores = [
    {id:1, name:'João'},
    {id:2, name:'Maria'},
    {id:3, name:'José'},
    {id:1, name:'João'},
    {id:2, name:'Maria'},
    {id:3, name:'José'},
    {id:1, name:'João'},
  ]


  return(
    <Grid container sx={{minHeight:'100vh', minWidth:'100vw'}}>
      <Sidebar />
      {/* First part of the screen */}
      <Grid
        size={3}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          height: '100vh',
          overflow: 'hidden',
        }}
      >
        <ListColaboradores colaboradores={colaboradores}/>
      </Grid>

      {/* Second part of the screen */}
      <Grid
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          height: '100vh',
        }}
      >
        <DatosPersonales />
      </Grid>
    </Grid>
  );
}

export default Home;

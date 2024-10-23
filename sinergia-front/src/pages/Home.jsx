import React from 'react';
import Sidebar from '../components/Sidebar';
import ListColaboradores from '../components/ListColaboradores';
import Grid from '@mui/material/Grid2';

const Home = () => {

  const colaboradores = [
    {id:1, name:'João'},
    {id:2, name:'Maria'},
    {id:3, name:'José'},
    {id:4, name:'Pedro'},
  ]


  return(
    <Grid container sx={{minHeight:'100%', minWidth:'100vw'}}>
      <Sidebar />
      {/* First part of the screen */}
      <Grid
        size={4}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'left',
        }}
      >
        <ListColaboradores colaboradores={colaboradores}/>
      </Grid>

      {/* Second part of the screen */}
      <Grid >
      </Grid>
    </Grid>
  );
}

export default Home;

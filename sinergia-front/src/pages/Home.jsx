import React from 'react';
import Sidebar from '../components/Sidebar';
import Grid from '@mui/material/Grid2';

const Home = () => {
  return(
    <Grid container sx={{minHeight:'100%', minWidth:'100vw'}}>
      {/* First part of the screen */}
      <Grid size={6} sx={{backgroundColor:'red'}}>
        <Sidebar />
      </Grid>

      {/* Second part of the screen */}
      <Grid size={6} sx={{backgroundColor:'blue'}}>
        <h1>Home</h1>
      </Grid>
    </Grid>
  );
}

export default Home;

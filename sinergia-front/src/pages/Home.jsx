import React from 'react';
import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import ListColaboradores from '../components/ListColaboradores';
import DatosPersonales from '../components/DatosPersonales';
import Grid from '@mui/material/Grid2';

import { getColaboradores } from '../api/services/colaboradoresService';

const Home = () => {
  const [colaboradores, setColaboradores] = useState([]);

  useEffect(() => {
    const fetchAllColaboradores = async () => {
      try {
        const colaboradores = await getColaboradores();
        setColaboradores(colaboradores);
      } catch (error) {
        console.log("ERROR ==>", error);
      }
    }
    fetchAllColaboradores();
    console.log('==>', colaboradores);
  }, [])


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

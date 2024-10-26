import React from 'react';
import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import ListColaboradores from '../components/ListColaboradores';
import DatosPersonales from '../components/DatosPersonales';
import Grid from '@mui/material/Grid2';

// Llamadas a la API
import { getColaboradores } from '../api/services/colaboradoresService';
import {deleteColaborador} from '../api/services/colaboradoresService';
import {createColaborador} from '../api/services/colaboradoresService';


const Home = () => {
  const [colaboradores, setColaboradores] = useState([]);

  useEffect(() => {
    const fetchAllColaboradores = async () => {
      try {
        const colaboradores = await getColaboradores();
        console.log("COLABORADORES ==>", colaboradores);
        setColaboradores(colaboradores);
      } catch (error) {
        console.log("ERROR ==>", error);
      }
    };

    fetchAllColaboradores();
  }, []);

  const handleCreateColaborador = async (datos) => {
    try {
      await createColaborador(datos);
      // Actualiza la lista de colaboradores
      const colaboradores = await getColaboradores();
      setColaboradores(colaboradores);
    } catch (error) {
      console.error('Error al guardar colaborador:', error);
    }
  };

  const handleDeleteColaborador = async (id) => {
    try {
      await deleteColaborador(id);
      // Actualiza la lista excluyendo el colaborador eliminado
      setColaboradores(prevColaboradores =>
        prevColaboradores.filter(colaborador => colaborador.id !== id)
      );
    } catch (error) {
      console.error("Error al borrar colaborador:", error);
    }
  };


  return(
    <Grid container sx={{minHeight:'100vh', minWidth:'100vw'}}>
      <Sidebar />
      {/* First part of the screen */}
      <Grid
        size={4}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          height: '100vh',
          overflow: 'hidden',
        }}
      >
        <ListColaboradores
          colaboradores={colaboradores}
          onDelete={handleDeleteColaborador}
        />
      </Grid>

      {/* Second part of the screen */}
      <Grid
      size={7}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          height: '100vh',
        }}
      >
        <DatosPersonales onAdd={handleCreateColaborador} />
      </Grid>
    </Grid>
  );
}

export default Home;

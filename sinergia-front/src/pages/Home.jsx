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
import {updateColaborador} from '../api/services/colaboradoresService';

const Home = () => {
  const [colaboradores, setColaboradores] = useState([]);
  const [colaboradorEnEdicion, setColaboradorEnEdicion] = useState(null);

  useEffect(() => {
    const fetchAllColaboradores = async () => {
      try {
        const colaboradores = await getColaboradores();
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
      const colaboradores = await getColaboradores();
      setColaboradores(colaboradores);
    } catch (error) {
      console.error('Error al guardar colaborador:', error);
    }
  };

  const handleDeleteColaborador = async (id) => {
    try {
      await deleteColaborador(id);
      setColaboradores(prevColaboradores =>
        prevColaboradores.filter(colaborador => colaborador.id !== id)
      );
    } catch (error) {
      console.error("Error al borrar colaborador:", error);
    }
  };

  const handleEditColaborador = (id, colaborador) => {
    setColaboradorEnEdicion(colaborador);
  };

  const handleUpdateColaborador = async (id, datos) => {
    try {
      await updateColaborador(id, datos);
      const colaboradores = await getColaboradores();
      setColaboradores(colaboradores);
      setColaboradorEnEdicion(null); // Salir de modo edición
    } catch (error) {
      console.error("Error al editar colaborador:", error);
    }
  };

  const handleCancelEdit = () => {
    setColaboradorEnEdicion(null); // Salir de modo edición
  };

  return (
    <Grid container sx={{ minHeight: '100vh', minWidth: '100vw' }}>
      <Sidebar />
      <Grid size={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', height: '100vh', overflow: 'hidden' }}>
        <ListColaboradores
          colaboradores={colaboradores}
          onDelete={handleDeleteColaborador}
          onEdit={handleEditColaborador}
        />
      </Grid>

      <Grid size={7} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', height: '100vh' }}>
        <DatosPersonales
          onAdd={handleCreateColaborador}
          onEdit={handleUpdateColaborador}
          onCancel={handleCancelEdit}
          colaboradorEnEdicion={colaboradorEnEdicion}
        />
      </Grid>
    </Grid>
  );
}

export default Home;

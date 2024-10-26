import React, { useState } from 'react';
import { Paper, TextField, Box, FormControlLabel, Checkbox, RadioGroup, Radio, Button, Typography, createTheme, ThemeProvider } from '@mui/material';
import SelectDates from './SelectDates';
import {createColaborador} from '../api/services/colaboradoresService';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      paper: '#424242',
    },
    text: {
      primary: '#ffffff',
    },
  },
});

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: '100%',
    width: '100%',
    padding: '20px',
    margin: '20px',
    boxShadow: '0 0 10px #000',
    borderRadius: '10px',
  },
  input: {
    marginBottom: '15px',
    width: '95%',
    backgroundColor: '#424242',
    borderRadius: '5px',
    '& .MuiInputBase-root': {
      color: '#ffffff',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#757575',
      },
      '&:hover fieldset': {
        borderColor: '#ffffff',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#ffffff',
      },
    },
  },
  buttonContainer: {
    display: 'flex',
    width: '95%',
    marginTop: '20px',
    justifyContent: 'flex-end',
  },
  checkboxGroup: {
    width: '95%',
    marginBottom: '20px',
  },
};

const DatosPersonales = () => {
  const [datos, setDatos] = useState({
    nombre: '',
    apellido: '',
    celular: '',
    email: '',
    genero: '',
    inactivo: false,
    fechaInicioAusencia: null,
    fechaFinAusencia: null,
  });

  const handleChange = (e) => {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
  };

  const handleDateChange = (newValue) => {
    // Actualiza el estado con las nuevas fechas seleccionadas
    setDatos({
      ...datos,
      fechaInicioAusencia: newValue[0].toISOString().split('T')[0],
      fechaFinAusencia: newValue[1].toISOString().split('T')[0],
    });
  };

  const handleSubmit = async () => {
    try {
      await createColaborador(datos);
      setDatos({
        nombre: '',
        apellido: '',
        celular: '',
        email: '',
        genero: '',
        inactivo: false,
        fechaInicioAusencia: null,
        fechaFinAusencia: null,
      });
    } catch (error) {
      console.error('Error al guardar colaborador:', error);
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Paper style={styles.container}>
        <TextField
          label="Nombre"
          name="nombre"
          value={datos.nombre}
          onChange={handleChange}
          sx={styles.input}
        />
        <TextField
          label="Apellido"
          name="apellido"
          value={datos.apellido}
          onChange={handleChange}
          sx={styles.input}
        />
        <TextField
          label="Celular"
          name="celular"
          value={datos.celular}
          onChange={handleChange}
          sx={styles.input}
        />
        <TextField
          label="Email"
          name="email"
          value={datos.email}
          onChange={handleChange}
          sx={styles.input}
        />

        <Box sx={styles.checkboxGroup}>
          <Typography variant="h6">Género</Typography>
          <RadioGroup row name="genero" value={datos.genero} onChange={handleChange}>
            <FormControlLabel value="MASCULINO" control={<Radio />} label="Masculino" />
            <FormControlLabel value="FEMENINO" control={<Radio />} label="Femenino" />
          </RadioGroup>
        </Box>

        <FormControlLabel
          control={
            <Checkbox
              checked={datos.inactivo}
              onChange={(e) => setDatos({ ...datos, inactivo: e.target.checked })}
              name="inactivo"
            />
          }
          label="Inactivo"
        />

        <SelectDates onChange={handleDateChange}/>

        <Box sx={styles.buttonContainer}>
          <Button variant="contained" color='primary' onClick={handleSubmit}>
            Guardar
          </Button>
        </Box>
      </Paper>
    </ThemeProvider>
  );
};

export default DatosPersonales;

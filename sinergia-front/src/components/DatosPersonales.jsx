import React, { useState } from 'react';
import { Paper, TextField, Box, FormControlLabel, Checkbox, RadioGroup, Radio, Button, Typography, createTheme, ThemeProvider } from '@mui/material';

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
    justifyContent: 'space-between',
    width: '95%',
    marginTop: '20px',
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
    asignaciones: {
      apertura: false,
      tematica: false,
      escenificacion: false,
      cierre: false,
      discursos: false,
      lector: false,
      ayudante: false,
    },
    tareasMecanicas: {
      acomodador: false,
      tecnicoSonido: false,
      audio: false,
      video: false,
      plataforma: false,
    },
    inactivo: false,
  });

  const handleChange = (e) => {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckboxChange = (e, category) => {
    setDatos({
      ...datos,
      [category]: {
        ...datos[category],
        [e.target.name]: e.target.checked,
      },
    });
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
            <FormControlLabel value="Masculino" control={<Radio />} label="Masculino" />
            <FormControlLabel value="Femenino" control={<Radio />} label="Femenino" />
          </RadioGroup>
        </Box>

        {/* TODO: agregar periodo de licencia --> Como un select picker de fecha??? */}

        <Box sx={styles.checkboxGroup}>
          <Typography variant="h6">Asignaciones</Typography>
          {['apertura', 'tematica', 'escenificacion', 'cierre', 'discursos', 'lector', 'ayudante'].map((asignacion) => (
            <FormControlLabel
              key={asignacion}
              control={
                <Checkbox
                  checked={datos.asignaciones[asignacion]}
                  onChange={(e) => handleCheckboxChange(e, 'asignaciones')}
                  name={asignacion}
                />
              }
              label={asignacion.charAt(0).toUpperCase() + asignacion.slice(1)}
            />
          ))}
        </Box>

        <Box sx={styles.checkboxGroup}>
          <Typography variant="h6">Tareas Mecánicas</Typography>
          {['acomodador', 'tecnicoSonido', 'audio', 'video', 'plataforma'].map((tarea) => (
            <FormControlLabel
              key={tarea}
              control={
                <Checkbox
                  checked={datos.tareasMecanicas[tarea]}
                  onChange={(e) => handleCheckboxChange(e, 'tareasMecanicas')}
                  name={tarea}
                />
              }
              label={tarea.charAt(0).toUpperCase() + tarea.slice(1).replace(/([A-Z])/g, ' $1')}
            />
          ))}
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

        <Box sx={styles.buttonContainer}>
          <Button variant="contained" color="primary">
            Guardar
          </Button>
          <Button variant="outlined" color="secondary">
            Editar
          </Button>
        </Box>
      </Paper>
    </ThemeProvider>
  );
};

export default DatosPersonales;

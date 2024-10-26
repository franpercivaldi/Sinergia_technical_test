import React, { useState, useEffect} from 'react';
import { Paper, TextField, Box, FormControlLabel, Checkbox, RadioGroup, Radio, Button, Typography, createTheme, ThemeProvider } from '@mui/material';
import SelectDates from './SelectDates';

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
    justifyContent: 'flex-end',
    marginTop: 'auto',
  },
  checkboxGroup: {
    width: '95%',
    marginBottom: '20px',
  },
};

const DatosPersonales = ({ onAdd, onEdit, onCancel, colaboradorEnEdicion }) => {
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

  useEffect(() => {
    if (colaboradorEnEdicion) {
      console.log('colab en edicion =>', colaboradorEnEdicion);
      setDatos(colaboradorEnEdicion); // Rellena el formulario con los datos del colaborador en edición
    } else {
      resetDatos(); // Si no hay colaborador en edición, resetea el formulario
    }
  }, [colaboradorEnEdicion]);

  const handleChange = (e) => {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
  };

  const handleDateChange = (newValue) => {
    setDatos({
      ...datos,
      fechaInicioAusencia: newValue[0].toISOString().split('T')[0],
      fechaFinAusencia: newValue[1].toISOString().split('T')[0],
    });
  };

  const resetDatos = () => {
    setDatos({
      nombre: '',
      apellido: '',
      celular: '',
      email: '',
      genero: '',
      inactivo: false ?? false,
      fechaInicioAusencia: null,
      fechaFinAusencia: null,
    });
  }

  const handleSubmit = () => {
    if (colaboradorEnEdicion) {
      onEdit(colaboradorEnEdicion.id, datos); // Llama a la función de edición
    } else {
      onAdd(datos); // Llama a la función de creación
    }
    resetDatos();
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Paper style={styles.container}>
        <TextField label="Nombre" name="nombre" value={datos.nombre} onChange={handleChange} sx={styles.input} />
        <TextField label="Apellido" name="apellido" value={datos.apellido} onChange={handleChange} sx={styles.input} />
        <TextField label="Celular" name="celular" value={datos.celular} onChange={handleChange} sx={styles.input} />
        <TextField label="Email" name="email" value={datos.email} onChange={handleChange} sx={styles.input} />

        <Box sx={styles.checkboxGroup}>
          <Typography variant="h6">Género</Typography>
          <RadioGroup row name="genero" value={datos.genero} onChange={handleChange}>
            <FormControlLabel value="MASCULINO" control={<Radio />} label="Masculino" />
            <FormControlLabel value="FEMENINO" control={<Radio />} label="Femenino" />
          </RadioGroup>
        </Box>

        <FormControlLabel
          control={
            <Checkbox checked={datos.inactivo} onChange={(e) => setDatos({ ...datos, inactivo: e.target.checked })} name="inactivo" />
          }
          label="Inactivo"
        />

        <SelectDates onChange={handleDateChange} />

        <Box sx={styles.buttonContainer}>
          {colaboradorEnEdicion ? (
            <>
              <Button variant="contained" color="primary" onClick={handleSubmit}>
                Guardar Edición
              </Button>
              <Button variant="outlined" color="secondary" onClick={onCancel}>
                Cancelar
              </Button>
            </>
          ) : (
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Guardar
            </Button>
          )}
        </Box>
      </Paper>
    </ThemeProvider>
  );
};

export default DatosPersonales;

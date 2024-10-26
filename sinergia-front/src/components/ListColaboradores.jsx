import React, { useState } from 'react';
import { Paper, Box, TextField, ThemeProvider, createTheme } from '@mui/material';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';


// Estilos
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: '100%',
    width: '90%',
    overflow: 'auto',
    scrollbarWidth: 'thin',
    scrollbarColor: '#424242 #212121',
    boxShadow: '0 0 10px #000',
    borderRadius: '10px',
    padding: '20px',
    margin: '20px',
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '7%',
    width: '95%',
    padding: '10px',
    margin: '5px',
    transition: 'background-color 0.3s, box-shadow 0.3s',
    '&:hover': {
      backgroundColor: '#616161', // Cambio de color de fondo al hacer hover
      boxShadow: '0 4px 20px rgba(0,0,0,0.5)', // Sombra más pronunciada en hover
    },
  },
  searchBox: {
    marginBottom: '20px',
    width: '95%',
    backgroundColor: '#424242',
    borderRadius: '25px',
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
};

// Crear el tema oscuro
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      paper: '#424242', // Color oscuro para los Papers
    },
    text: {
      primary: '#ffffff', // Color de texto blanco en modo oscuro
    },
  },
});

const ListColaboradores = ({ colaboradores, onDelete, onEdit}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredColaboradores = colaboradores.filter((colaborador) =>
    colaborador.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <ThemeProvider theme={darkTheme}>
      <Box style={styles.container}>
        {/* Input de búsqueda */}
        <TextField
          variant="outlined"
          placeholder="Buscar..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={styles.searchBox}
        />

        {/* Lista de colaboradores filtrada */}
        {filteredColaboradores.map((colaborador) => (
          <Paper
            key={colaborador.id}
            style={styles.item}
            elevation={3}
            sx={{
              '&:hover': {
                backgroundColor: '#616161', // Cambio de fondo
                boxShadow: '0 4px 20px rgba(0,0,0,0.5)', // Sombra al hacer hover
              },
            }}
          >
            {colaborador.nombre + ' ' + colaborador.apellido}
            <DeleteForeverOutlinedIcon onClick={() => onDelete(colaborador.id)} />
            <EditOutlinedIcon onClick={() => onEdit(colaborador.id, colaborador)} />
          </Paper>
        ))}
      </Box>
    </ThemeProvider>
  );
};

export default ListColaboradores;

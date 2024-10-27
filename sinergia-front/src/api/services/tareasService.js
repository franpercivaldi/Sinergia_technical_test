import axios from 'axios';

// obtener todas las tareas no_mecanicas
export const getTareas = async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/tareas/no-mecanicas', {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: false,
    });
    return response.data;
  } catch(error) {
    console.log(error);
    throw error;
  }
}
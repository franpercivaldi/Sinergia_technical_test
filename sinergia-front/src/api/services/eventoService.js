import axios from 'axios';

// obtener todos los eventos
export const getEventos = async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/eventos', {
      withCredentials: false,
    });
    return response.data;
  } catch(error) {
    console.log(error);
    throw error;
  }
}

// obtener evento por id
export const getEventoById = async (id) => {
  try {
    const response = await axios.get(`http://localhost:8080/api/eventos/${id}`, {
      withCredentials: false,
    });
    return response.data;
  } catch(error) {
    console.log(error);
    throw error;
  }
}


// guardar un evento
export const saveEvento = async (evento) => {
  try {
    const response = await axios.post('http://localhost:8080/api/eventos', evento, {
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
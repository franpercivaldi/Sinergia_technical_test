import axios from 'axios';


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
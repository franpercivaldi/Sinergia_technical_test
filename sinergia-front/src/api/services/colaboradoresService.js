import axios from 'axios';

export const getColaboradores = async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/colaboradores', {
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
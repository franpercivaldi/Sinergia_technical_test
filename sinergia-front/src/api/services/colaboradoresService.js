import axios from 'axios';

export const getColaboradores = async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/colaboradores', {
      headers: {
        'Content-Type': 'application/json',
      },
      auth: {
        username: 'user',
        password: 'f479a691-925e-4fcd-9bfc-fc7231b452ec',
      },
    });
    return response.data;
  } catch(error) {
    console.log(error);
    throw error;
  }
}
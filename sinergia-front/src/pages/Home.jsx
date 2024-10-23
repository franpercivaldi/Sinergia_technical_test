import React from 'react';
import Sidebar from '../components/Sidebar';

const style = {
  height: '100vh',
}

const Home = () => {
  return(
    <div style={style}>
      <h1>Home</h1>
      <p>Welcom!</p>
      <Sidebar />
    </div>
  );
}

export default Home;

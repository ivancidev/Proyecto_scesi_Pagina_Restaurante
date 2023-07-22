import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

const  NotFound = ()=> {
  return (
    <div>
      <h2>404 - Página no encontrada</h2>
      <p>Lo sentimos, la página que buscas no existe.</p>
      <Link to="/login">Ir a la página de inicio</Link>
    </div>
  );
}

export default NotFound;


import React from  'react'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Home from './pages/Home';
import Login from './components/Login';
import Productos from './pages/Productos';
import Registro from './components/Registro';
import ViewCard from './Views/ViewCard';
import { useEffect, useState } from 'react';




const App = () => {

  const routes = [];
  const [platos, setPlatos] = useState([]);

  useEffect(() => {
    const fetchPlatos = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/platos`
        );
        const data = await response.json();
        setPlatos(data);
      } catch (error) {
        console.error("Error al obtener el cliente:", error);
      }
    };

    fetchPlatos();
  }, []);


  platos.forEach((plato) =>{
    routes.push({
      path: plato.nombrePlato,
      element: <ViewCard plato={plato}/>,
    })
  });

  
  return (
    <>
      <Router>
          <Routes>
          <Route path='/' exact element={<Home/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path="/productos" element={<Productos/>}></Route>
          <Route path='/registro' element={<Registro/>}></Route>
          {routes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element}></Route>
          ))}
          

          </Routes>
          
      </Router>
    </>
  )
}


export default App
  






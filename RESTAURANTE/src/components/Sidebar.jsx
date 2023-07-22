import React, { useState, useEffect } from "react";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { FiArrowLeft } from "react-icons/fi";
import {BsPersonSquare, BsMoonFill, BsXCircleFill} from "react-icons/bs";
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Sidebar = (props) => {
  const { showMenu, setShowMenu } = props
  const{propUser, setUser} = props
  const [cambioCuenta, setCambio] = useState({
    nombre: "",
    newNombre:"",
    contraseña: "",
    newContraseña: "",
  })
  const {ventana, setVentana}= props
  const {cambioFondo, setFondo} = props
  const navigate = useNavigate()
  const [cliente, setCliente] = useState([]);


  useEffect(() => {
    
    const fetchClient = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/cliente/correo/${propUser.correo}`);
          if(!response.ok){
            throw new Error('Error al obtener los datos del cliente');
          }
        const data = await response.json();
        setCliente(data);
      } catch (error) {
        console.error("Error al obtener el correo del cliente:", error);
      }
    };

    fetchClient();
  }, []);


  const handlClickVentana = () =>{
    setVentana(!ventana)
  }

  const inputChange = (event)=>{
    setCambio({
        ...cambioCuenta,
        [event.target.name]: event.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
      axios.post('http://localhost:4000/cambioUsuario', cambioCuenta).then(({data})=>{
          console.log(data)
          navigate('/login')
      }).catch(({response})=>{
          e.preventDefault()
          console.log(response.data)
      })

  }

  const cerrarPaginaAnterior = () => {
    window.history.back();
    navigate('/login')
    
  };


  return (
    <div
      className={`${cambioFondo ? "bg-stone-800":"bg-orange-600"} fixed lg:left-0 top-0 w-60 h-full flex-col justify-between py-6 rounded-tr-xl rounded-br-xl z-20 transition-all ${
        showMenu ? "left-0" : "-left-full"
      }`}
    >
      
      <div>
        <div className="flex justify-end">
          <button onClick={() => setShowMenu(false)}>
          {<FiArrowLeft className="text-[30px] text-white mr-5 hover:text-[#262837]"/>}
          </button>
        </div>
        <ul className="pl-4">
          <li>
            <div className="flex justify-center">
            <img className="w-[100px]" src={cliente.avatar}/>
            </div>
            <p className="text-center mb-3 text-[18px] text-white">{cliente.nombre}</p>
          </li>
          <li className="p-4 rounded-tl-xl rounded-bl-xl flex hover:bg-[#262837] hover:cursor-pointer mt-32" onClick={handlClickVentana}>
            <BsPersonSquare className="text-2xl text-white" /> 
            <p className="ml-3 text-white">Cambiar contraseña</p>  
            
          </li>
          <li className="p-4 rounded-tl-xl rounded-bl-xl flex hover:bg-[#262837] hover:cursor-pointer mt-2" onClick={()=> setFondo(!cambioFondo)}>
            <BsMoonFill className="text-2xl text-white" /> 
            <p className="ml-3 text-white">Cambiar aspecto</p>  
            
          </li>
        </ul>
      </div>
      <div>
        <ul className="pl-4 mt-2">
          <li className="hover:bg-[#262837] p-4 rounded-tl-xl rounded-bl-xl group transition-colors flex hover:cursor-pointer" onClick={cerrarPaginaAnterior}>
              <RiLogoutCircleRLine className="text-2xl text-white" />
              <p className="ml-3 text-white">Salir</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;

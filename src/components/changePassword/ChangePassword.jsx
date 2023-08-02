import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { BsXCircleFill} from "react-icons/bs";

const ChangePassword = (props) => {
    const {ventana, setVentana} = props
    const [cambioCuenta, setCambio] = useState({
        nombre: "",
        newNombre:"",
        contraseña: "",
        newContraseña: "",
      })
    const navigate = useNavigate();
    const {propUser} = props
    const [cliente, setCliente] = useState([]);


    const inputChange = (event)=>{
        setCambio({
            ...cambioCuenta,
            [event.target.name]: event.target.value
        })
      }

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


  return (
    <header className={`fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-75 ${ventana ? "flex transition-all":"hidden transition-all"}`}>
        <div className="absolute flex items-center justify-center left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 transition-all">
        <form className=' transition-all bg-cyan-600 p-8 rounded-lg shadow-lg w-[300px] md:w-[450px] lg:w-[550px] overflow-y-auto h-[650px]'>
          <div className='w-full'>
            <div className="flex justify-end hover:cursor-pointer" onClick={()=> setVentana(false)}>
              <BsXCircleFill className="text-[26px] text-white"/>
            </div>
            <div className='flex justify-center'>
              <img src={cliente.avatar} alt="logo" className='rounded-[50%] w-[100px] mb-5'/>
            </div>  
          </div>
          
            <label className="font2 block text-white font-semibold mb-2" id='nom'> Usuario: </label>

            <input type="text"  className="border-b-[4px] 
             border-orange-600  rounded-lg p-2 w-full bg-transparent  focus:bg-transparent outline-none placeholder-blue-50" name='nombre'  aria-labelledby='nom' placeholder='Ingresa tu nombre' value={cambioCuenta.nombre} onChange={inputChange}/>

            <label className="font2 block text-white font-semibold mb-2 mt-4" id='nom'> Nuevo Usuario: </label>

            <input type="text"  className="border-b-[4px] 
          border-orange-600  rounded-lg p-2 w-full bg-transparent  focus:bg-transparent outline-none placeholder-blue-50" name='newNombre'  aria-labelledby='nom' placeholder='Ingresa tu nuevo usuario'
            value={cambioCuenta.newNombre} onChange={inputChange}/>

            <label className="font2 block text-white font-semibold mb-2 mt-5" id='cont'>Contraseña:</label>

            <input type="password" autoComplete='on'  className="border-b-[4px] 
             border-orange-600  rounded-lg p-2 w-full bg-transparent  focus:bg-transparent outline-none placeholder-blue-50" name='contraseña' aria-labelledby='cont' placeholder='Ingresa tu contraseña' value={cambioCuenta.contraseña} onChange={inputChange}/>
            
            <label className="font2 block text-white font-semibold mb-2 mt-5" id='cont'>Nueva Constraseña:</label>

            <input type="password" autoComplete='on'  className="border-b-[4px] 
             border-orange-600  rounded-lg p-2 w-full bg-transparent  focus:bg-transparent outline-none placeholder-blue-50" name='newContraseña' aria-labelledby='cont' placeholder='Ingresa tu nueva contraseña' value={cambioCuenta.newContraseña} onChange={inputChange}/>

            <div className="font2 flex justify-center">
            <button onClick={handleSubmit}  className="bg-orange-600 text-white px-16 py-2 rounded-lg mt-[30px] hover:bg-orange-500" >Cambiar</button>
            
          </div>
        </form>
        </div>

      </header>
  )
}

export default ChangePassword
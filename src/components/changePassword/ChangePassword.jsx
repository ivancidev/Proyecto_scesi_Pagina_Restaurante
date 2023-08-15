import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { BsXCircleFill} from "react-icons/bs";

const ChangePassword = (props) => {
    const {window, setWindow} = props
    const [changeAccount, setChangeAccount] = useState({
        name: "",
        newName:"",
        password: "",
        newPassword: "",
      })
    const navigate = useNavigate();
    const [client, setClient] = useState([]);

    const user_global = JSON.parse(sessionStorage.getItem("user_logged"))


    const inputChange = (event)=>{
        setChangeAccount({
            ...changeAccount,
            [event.target.name]: event.target.value
        })
      }

      useEffect(() => {
    
        const fetchClient = async () => {
          try {
            const response = await fetch(
              `http://localhost:4000/email/${user_global.email}`);
              if(!response.ok){
                throw new Error('Error al obtener los datos del cliente');
              }
            const data = await response.json();
            setClient(data);
          } catch (error) {
            console.error("Error al obtener el correo del cliente:", error);
          }
        };
    
        fetchClient();
      }, []);

      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post('http://localhost:4000/changeUser', changeAccount);
          console.log(response.data);
          navigate('/login');
        } catch (error) {
          console.error(error.response ? error.response.data : 'An error occurred');
        }
      };
      


  return (
    <header className={`fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-75 ${window ? "flex transition-all":"hidden transition-all"}`}>
        <div className="absolute flex items-center justify-center left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 transition-all">
        <form className=' transition-all bg-cyan-600 p-8 rounded-lg shadow-lg w-[300px] md:w-[450px] lg:w-[550px] overflow-y-auto h-[650px]'>
          <div className='w-full'>
            <div className="flex justify-end hover:cursor-pointer" onClick={()=> setWindow(false)}>
              <BsXCircleFill className="text-[26px] text-white"/>
            </div>
            <div className='flex justify-center'>
              <img src={client.avatar} alt="logo" className='rounded-[50%] w-[100px] mb-5'/>
            </div>  
          </div>
          
            <label className="font2 block text-white font-semibold mb-2"> Usuario: </label>

            <input type="text"  className="border-b-[4px] 
             border-orange-600  rounded-lg p-2 w-full bg-transparent  focus:bg-transparent outline-none placeholder-blue-50" name='name'  aria-labelledby='nom' placeholder='Ingresa tu nombre' value={changeAccount.name} onChange={inputChange}/>

            <label className="font2 block text-white font-semibold mb-2 mt-4"> Nuevo Usuario: </label>

            <input type="text"  className="border-b-[4px] 
          border-orange-600  rounded-lg p-2 w-full bg-transparent  focus:bg-transparent outline-none placeholder-blue-50" name='newName' placeholder='Ingresa tu nuevo usuario'
            value={changeAccount.newName} onChange={inputChange}/>

            <label className="font2 block text-white font-semibold mb-2 mt-5">Contraseña:</label>

            <input type="password" autoComplete='on'  className="border-b-[4px] 
             border-orange-600  rounded-lg p-2 w-full bg-transparent  focus:bg-transparent outline-none placeholder-blue-50" name='password' aria-labelledby='cont' placeholder='Ingresa tu contraseña' value={changeAccount.password} onChange={inputChange}/>
            
            <label className="font2 block text-white font-semibold mb-2 mt-5">Nueva Constraseña:</label>

            <input type="password" autoComplete='on'  className="border-b-[4px] 
             border-orange-600  rounded-lg p-2 w-full bg-transparent  focus:bg-transparent outline-none placeholder-blue-50" name='newPassword' aria-labelledby='cont' placeholder='Ingresa tu nueva contraseña' value={changeAccount.newPassword} onChange={inputChange}/>

            <div className="font2 flex justify-center">
            <button onClick={handleSubmit}  className="bg-orange-600 text-white px-16 py-2 rounded-lg mt-[30px] hover:bg-orange-500" >Cambiar</button>
            
          </div>
        </form>
        </div>

      </header>
  )
}

export default ChangePassword
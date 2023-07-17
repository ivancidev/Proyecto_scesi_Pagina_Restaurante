import React, { useState } from 'react'
import logo from '../assets/imagenes/logo.png'
import { FaUserCircle } from 'react-icons/fa';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const Registro = () => {

  const navigate = useNavigate()
  const [newUser, setNewUser] = useState({
    nombre: "",
    correo: "",
    contraseña: "",
    telefono: "",
    fecha: "",
    genero: "",
    avatar: "",
  })



  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (imageName) => {
    setSelectedImage(imageName);
    newUser.avatar = imageName
  };


  const onChange = (event)=>{
    setNewUser({
        ...newUser,
        [event.target.name]: event.target.value
    })
}

const onSubmit = (e) =>{
  e.preventDefault()
        axios.post('http://localhost:4000/restaurante/registro', newUser).then(({data})=>{
            console.log(data)
            console.log("Se encontro al cliente")
            navigate('/productos', {state:{prop:newUser}})
            
        }).catch(({response})=>{
            e.preventDefault()
            console.log(response.data)
        })
}



  return (
    <section className='flex items-center justify-center h-auto bg-[url(./assets/imagenes/fondoregistro.jpg)] bg-cover  bg-center w-[100%] overflow-hidden'>
      <div className='w-[100%] flex h-[100vh] ml-[10px] justify-between'>

        <div className='ml-[80px] mt-[15px] h-[97vh]  w-[600px] bg-white p-4 rounded-[30px]'>
        <div>
          <h2 className='font2 text-center  text-[35px] mb-[18px]'>Registrate</h2>
        
          <div className='flex justify-center'>
            {<FaUserCircle className='text-[130px]'/>}
          </div>
        </div>

    <form className='h-auto w-full rounded-[20px] flex p-4'>
      <div className='mr-10 w-[340px]'>
        <label className="font2 block  font-semibold mb-1 text-[16px]" id='nom'> Nombre: </label>

        <input type="text"  className="border-b-[4px] 
      border-orange-500  rounded-lg p-2    w-full bg-transparent   focus:bg-transparent outline-none" name='nombre' value={newUser.nombre}  aria-labelledby='nom' placeholder='Ingresa tu nombre' onChange={onChange}/>

        <label className="font2 block font-semibold text-[16px] mt-3" id='nom'> Email: </label>

       <input type="email"  className="border-b-[4px] 
      border-orange-500  rounded-lg p-2    w-full bg-transparent  focus:bg-transparent outline-none " name='correo' value={newUser.correo}  aria-labelledby='nom' placeholder='Ingresa tu email' onChange={onChange}/>

        <label className="font2 mt-3 block  font-semibold text-[16px]" id='nom'> Telefono: </label>

        <input type="text"  className="border-b-[4px] 
      border-orange-500  rounded-lg p-2    w-full bg-transparent  focus:bg-transparent outline-none " name='telefono' value={newUser.telefono}  aria-labelledby='nom' placeholder='Ingresa tu numero' onChange={onChange}/>

        <label className="font2 mt-3 block  font-semibold text-[16px]" id='pass'> Contraseña: </label>

        <input type="password"  className="border-b-[4px] 
      border-orange-500  rounded-lg p-2    w-full bg-transparent  focus:bg-transparent outline-none "  value={newUser.contraseña} onChange={onChange} name='contraseña'  aria-labelledby='nom' placeholder='Ingresa tu contraseña' autoComplete='on'/>


        <label className="font2 mt-3 block  font-semibold text-[16px]" id='nom'> Fecha de nacimiento: </label>

        <input type="date"  className="border-b-[4px] 
      border-orange-500 rounded-lg p-2 w-full bg-transparent  focus:bg-transparent outline-none   mb-3" value={newUser.fecha} name='fecha'  aria-labelledby='nom' onChange={onChange}/>

      </div>

      <div className='w-[290px]'>
        <p className='font2 font-bold mb-3 text-[16px]'>Selecciona un genero:</p>
        <span className='ml-[15px] mt-6'>   
        <input type="radio" name='genero' value='masculino' onChange={onChange} /> Masculino 
        <input type="radio" name='genero' value='femenino' className='ml-[20px]' onChange={onChange}/> Femenino <br />
        </span>

      <div className='mt-5'>
          <p className='font2 font-bold text-[16px]'>Selecciona un avatar:</p>
      <ul className='flex ml-2 mt-4'>
        <li onClick={() => handleImageClick("https://api.dicebear.com/6.x/adventurer/svg?seed=Jasmine")}>
          <img src="https://api.dicebear.com/6.x/adventurer/svg?seed=Jasmine" alt="Image 1" className='w-[90px] '/>
        </li>
        <li onClick={() => handleImageClick("https://api.dicebear.com/6.x/adventurer/svg?seed=Chester")}>
          <img src="https://api.dicebear.com/6.x/adventurer/svg?seed=Chester" alt="Image 2" className='w-[90px]' />
        </li>
        <li onClick={() => handleImageClick("https://api.dicebear.com/6.x/adventurer/svg?seed=Harley")}>
        <img src="https://api.dicebear.com/6.x/adventurer/svg?seed=Harley" alt="Image 2" className='w-[90px]' />
        </li>
       
      </ul>

      <ul className='flex ml-2'>
          <li onClick={() => handleImageClick("https://api.dicebear.com/6.x/adventurer/svg?seed=Midnight")}>
          <img src="https://api.dicebear.com/6.x/adventurer/svg?seed=Midnight" alt="Image 2" className='w-[90px] hover:cursor-pointer' />
          </li>
              <li onClick={() => handleImageClick("https://api.dicebear.com/6.x/adventurer/svg?seed=Chloe")}>
                <img src="https://api.dicebear.com/6.x/adventurer/svg?seed=Chloe" alt="Image 2" className='w-[90px] hover:cursor-pointer' />
              </li>
              <li onClick={() => handleImageClick("https://api.dicebear.com/6.x/adventurer/svg?seed=Nala")}>
                <img src="https://api.dicebear.com/6.x/adventurer/svg?seed=Nala" alt="Image 2" className='w-[90px] hover:cursor-pointer' />
          </li>
        </ul>

      <ul className='flex ml-2'>
      <li onClick={() => handleImageClick("https://api.dicebear.com/6.x/adventurer/svg?seed=Shadow")}>
        <img src="https://api.dicebear.com/6.x/adventurer/svg?seed=Shadow" alt="Image 2" className='w-[90px]' />
        </li>
        <li onClick={() => handleImageClick("https://api.dicebear.com/6.x/adventurer/svg?seed=Leo")}>
        <img src="https://api.dicebear.com/6.x/adventurer/svg?seed=Leo" alt="Image 2" className='w-[90px]' />
        </li>
        <li onClick={() => handleImageClick("https://api.dicebear.com/6.x/adventurer/svg?seed=Boo")}>
        <img src="https://api.dicebear.com/6.x/adventurer/svg?seed=Boo" alt="Image 2" className='w-[90px]' />
        </li>
      </ul>
        {selectedImage && (
        <p className='text-orange-500 text-[15px] mt-4'>Imagen seleccionada</p>
        )}

      </div>

      </div>
   
    </form>
        
        <div className='flex justify-center'>
          <button  className="bg-orange-500 text-white px-40 py-2 rounded-lg mt-[30px] hover:bg-orange-600" onClick={onSubmit} >
            Registrarse
          </button>
        </div>

      </div>

        
      <div className='mt-[12px] mb-[20px] w-[800px] items-center flex '>
          
          <div className='bg-white p-8 rounded-[20px] mr-[120px] ml-[25px]'>
          <div className='flex justify-center mb-[20px]'>
            <img src={logo} alt="asd" className='w-[150px] rounded-[50%]' />
          </div>
            <p>
          ¡Bienvenidos a nuestro restaurante!

          En nuestro acogedor restaurante, nos enorgullece ofrecer una experiencia gastronómica excepcional para todos nuestros comensales. Nuestro objetivo es brindar una combinación perfecta de deliciosos sabores, ingredientes frescos y un servicio amable y atento.

          Nuestro talentoso equipo de chefs expertos se esfuerza por crear platos exquisitos que despierten tus sentidos y te hagan disfrutar de cada bocado. Desde deliciosas entradas hasta tentadores platos principales y postres indulgentes, cada plato está cuidadosamente preparado con pasión y dedicación.
          Nuestro equipo de servicio está comprometido en hacer que tu visita sea especial y se encargará de que te sientas atendido en todo momento. Nos esforzamos por superar tus expectativas y asegurarnos de que tengas una experiencia gastronómica inolvidable.

          <strong className='font2 text-blue-600 text-center mt-[10px]'>¡Esperamos recibirte pronto en nuestro restaurante y brindarte una experiencia culinaria excepcional que deleitará tus sentidos y dejará una impresión duradera en tu paladar!</strong>
            </p>
          </div>
          
      </div>

      </div>
    </section>
  )
}

export default Registro
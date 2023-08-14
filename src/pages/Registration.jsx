import React, { useState } from "react";
import logo from "../assets/imagenes/logo.png";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useForm } from "../components/hooks/useForm";
import { validationRegister } from "../components/helpers/validationRegister";
import axios from "axios";

const Registration = () => {
  const { user, handleImageClick, handleChange } = useForm({
    name: "",
    email: "",
    password: "",
    phone: "",
    avatar: "",
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validationRegister(user);
    setErrors(newErrors);
  
    if (Object.keys(newErrors).length === 0) {
      try {
        await axios.post("http://localhost:4000/register", user);
        sessionStorage.setItem("guest_session_id", "sdfsdf23423");
        setTimeout(() => {
          navigate("/products", { state: { prop: user } });
        });
      } catch (error) {
        console.log(error.response);
      }
    }
  };
  

  return (
    <section className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-[url(./assets/imagenes/fondoregistro.jpg)] bg-cover  bg-center w-[100%] p-1 gap-14">
      <div className=" mt-[15px] h-[93vh] md:w-[500px]  w-[350px] bg-white p-4 rounded-[30px]">
        <div>
          <h2 className="font2 text-center  text-[35px] mb-[18px]">
            Registrate
          </h2>

          <div className="flex justify-center">
            {<FaUserCircle className="text-[130px]" />}
          </div>
        </div>

        <form className="h-auto w-full rounded-[20px] flex p-4">
          <div className="mr-10 w-[340px]">
            <label className="font2 block  font-semibold mb-1 text-[16px]">
              {" "}
              Usuario:{" "}
            </label>

            <input
              type="text"
              className="border-b-[4px] 
      border-orange-500  rounded-lg p-2    w-full bg-transparent   focus:bg-transparent outline-none"
              name="name"
              value={user.name}
              placeholder="Ingresa tu nombre"
              onChange={handleChange}
            />

            {errors.name && <span className="text-red-500">{errors.name}</span>}

            <label className="font2 block font-semibold text-[16px] mt-3">
              {" "}
              Email:{" "}
            </label>

            <input
              type="email"
              className="border-b-[4px] 
      border-orange-500  rounded-lg p-2    w-full bg-transparent  focus:bg-transparent outline-none "
              name="email"
              value={user.email}
              placeholder="Ingresa tu email"
              onChange={handleChange}
            />
            {errors.email && (
              <span className="text-red-500">{errors.email}</span>
            )}

            <label className="font2 mt-3 block  font-semibold text-[16px]">
              {" "}
              Celular:{" "}
            </label>

            <input
              type="text"
              className="border-b-[4px] 
      border-orange-500  rounded-lg p-2    w-full bg-transparent  focus:bg-transparent outline-none "
              name="phone"
              value={user.phone}
              placeholder="Ingresa tu numero"
              onChange={handleChange}
            />
            {errors.phone && (
              <span className="text-red-500">{errors.phone}</span>
            )}

            <label
              className="font2 mt-3 block  font-semibold text-[16px]"
              id="pass"
            >
              {" "}
              Contraseña:{" "}
            </label>

            <input
              type="password"
              className="border-b-[4px] 
      border-orange-500  rounded-lg p-2    w-full bg-transparent  focus:bg-transparent outline-none "
              value={user.password}
              onChange={handleChange}
              name="password"
              aria-labelledby="nom"
              placeholder="Ingresa tu contraseña"
              autoComplete="on"
            />
            {errors.password && (
              <span className="text-red-500">{errors.password}</span>
            )}
          </div>

          <div className="w-[290px]">
            <div className="mt-5">
              <p className="font2 font-bold text-[16px]">
                Selecciona un avatar:
              </p>
              <ul className="flex ml-2 mt-4">
                <li
                  onClick={() =>
                    handleImageClick(
                      "https://api.dicebear.com/6.x/adventurer/svg?seed=Jasmine"
                    )
                  }
                >
                  <img
                    src="https://api.dicebear.com/6.x/adventurer/svg?seed=Jasmine"
                    alt="Image 1"
                    className="w-[90px] "
                  />
                </li>
                <li
                  onClick={() =>
                    handleImageClick(
                      "https://api.dicebear.com/6.x/adventurer/svg?seed=Chester"
                    )
                  }
                >
                  <img
                    src="https://api.dicebear.com/6.x/adventurer/svg?seed=Chester"
                    alt="Image 2"
                    className="w-[90px]"
                  />
                </li>
                <li
                  onClick={() =>
                    handleImageClick(
                      "https://api.dicebear.com/6.x/adventurer/svg?seed=Harley"
                    )
                  }
                >
                  <img
                    src="https://api.dicebear.com/6.x/adventurer/svg?seed=Harley"
                    alt="Image 2"
                    className="w-[90px]"
                  />
                </li>
              </ul>

              <ul className="flex ml-2">
                <li
                  onClick={() =>
                    handleImageClick(
                      "https://api.dicebear.com/6.x/adventurer/svg?seed=Midnight"
                    )
                  }
                >
                  <img
                    src="https://api.dicebear.com/6.x/adventurer/svg?seed=Midnight"
                    alt="Image 2"
                    className="w-[90px] hover:cursor-pointer"
                  />
                </li>
                <li
                  onClick={() =>
                    handleImageClick(
                      "https://api.dicebear.com/6.x/adventurer/svg?seed=Chloe"
                    )
                  }
                >
                  <img
                    src="https://api.dicebear.com/6.x/adventurer/svg?seed=Chloe"
                    alt="Image 2"
                    className="w-[90px] hover:cursor-pointer"
                  />
                </li>
                <li
                  onClick={() =>
                    handleImageClick(
                      "https://api.dicebear.com/6.x/adventurer/svg?seed=Nala"
                    )
                  }
                >
                  <img
                    src="https://api.dicebear.com/6.x/adventurer/svg?seed=Nala"
                    alt="Image 2"
                    className="w-[90px] hover:cursor-pointer"
                  />
                </li>
              </ul>

              <ul className="flex ml-2">
                <li
                  onClick={() =>
                    handleImageClick(
                      "https://api.dicebear.com/6.x/adventurer/svg?seed=Shadow"
                    )
                  }
                >
                  <img
                    src="https://api.dicebear.com/6.x/adventurer/svg?seed=Shadow"
                    alt="Image 2"
                    className="w-[90px]"
                  />
                </li>
                <li
                  onClick={() =>
                    handleImageClick(
                      "https://api.dicebear.com/6.x/adventurer/svg?seed=Leo"
                    )
                  }
                >
                  <img
                    src="https://api.dicebear.com/6.x/adventurer/svg?seed=Leo"
                    alt="Image 2"
                    className="w-[90px]"
                  />
                </li>
                <li
                  onClick={() =>
                    handleImageClick(
                      "https://api.dicebear.com/6.x/adventurer/svg?seed=Boo"
                    )
                  }
                >
                  <img
                    src="https://api.dicebear.com/6.x/adventurer/svg?seed=Boo"
                    alt="Image 2"
                    className="w-[90px]"
                  />
                </li>
              </ul>
              {user.avatar != "" && (
                <p className="text-orange-500 text-[15px] mt-4">
                  Imagen seleccionada
                </p>
              )}
              {errors.avatar && (
                <span className="text-red-500">{errors.avatar}</span>
              )}
            </div>
          </div>
        </form>

        <div className="flex justify-center">
          <button
            className="bg-orange-500 text-white px-8 md:px-16 lg:px-32 py-2 rounded-lg mt-5 md:mt-10 lg:mt-20 hover:bg-orange-600"
            onClick={handleSubmit}
          >
            Registrarse
          </button>
        </div>
      </div>

      <div className="mb-10 md:w-[800px] w-[350px]">
        <div className="bg-white p-8 rounded-[30px] md:ml-[25px]">
          <div className="flex justify-center mb-4">
            <img src={logo} alt="asd" className="w-40 rounded-full" />
          </div>
          <p>
            ¡Bienvenidos a nuestro restaurante! En nuestro acogedor restaurante,
            nos enorgullece ofrecer una experiencia gastronómica excepcional
            para todos nuestros comensales. Nuestro objetivo es brindar una
            combinación perfecta de deliciosos sabores, ingredientes frescos y
            un servicio amable y atento. Nuestro talentoso equipo de chefs
            expertos se esfuerza por crear platos exquisitos que despierten tus
            sentidos y te hagan disfrutar de cada bocado. Desde deliciosas
            entradas hasta tentadores platos principales y postres indulgentes,
            cada plato está cuidadosamente preparado con pasión y dedicación.
            Nuestro equipo de servicio está comprometido en hacer que tu visita
            sea especial y se encargará de que te sientas atendido en todo
            momento. Nos esforzamos por superar tus expectativas y asegurarnos
            de que tengas una experiencia gastronómica inolvidable.
            <strong className="font2 text-blue-600 block mt-4">
              ¡Esperamos recibirte pronto en nuestro restaurante y brindarte una
              experiencia culinaria excepcional que deleitará tus sentidos y
              dejará una impresión duradera en tu paladar!
            </strong>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Registration;

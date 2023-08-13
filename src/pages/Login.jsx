import React, { useState, useEffect } from "react";
import axios from "axios";
import logo from "../assets/imagenes/logo.png";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [client, setClient] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [dishes, setDishes] = useState([]);
  const [errors, setErrors] = useState({});
  const [clientFromDb, setClientFromDb] = useState([]);

  const inputChange = (event) => {
    setClient({
      ...client,
      [event.target.name]: event.target.value,
    });
  };

  const handleRegistrationClick = () => navigate("/registration");

  const validateForm = () => {
    let newErrors = {};

    if (!client.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(client.email)) {
      newErrors.email = "Email is not valid";
    }

    if (!client.password) {
      newErrors.password = "Password is required";
    } else if (client.password !== clientFromDb.contraseña) {
      newErrors.password = "Incorrect password";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const newErrors = validateForm();
      setErrors(newErrors);

      if (Object.keys(newErrors).length === 0) {
        const response = await axios.post("http://localhost:4000/login", client);
        sessionStorage.setItem("guest_session_id", "sdfsdf23423");
        setTimeout(() => {
          navigate("/products", { state: { prop: client } });
          console.log(response.data);
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    sessionStorage.removeItem("guest_session_id");
  }, []);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/menus/${"friedmenu"}`
        );
        const data = await response.json();
        setDishes(data);
      } catch (error) {
        console.error("Error getting dishes:", error);
      }
    };

    fetchImages();
  }, []);

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/email/${client.email}`
        );
        const data = await response.json();
        setClientFromDb(data);
      } catch (error) {
        console.error("Error getting client:", error);
      }
    };

    fetchClient();
  }, [client.email]);

  return (
    <section className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-[url(./assets/imagenes/fondoregistro.jpg)] bg-cover bg-center w-full p-10 gap-6">

      <form className="mx-4 md:w-[450px] p-6 md:h-[600px] rounded-3xl bg-white">
        <div className="w-full">
          <h1 className="font2 text-center mb-5 text-3xl font-bold">
            Iniciar Sesion
          </h1>
          <div className="flex justify-center">
            <img src={logo} alt="logo" className="rounded-full w-32 mb-5" />
          </div>
        </div>

        <div className="flex justify-center">
          <div className="w-[310px]">
            <label className="font2 block mb-2 text-lg" id="email">
              Email:
            </label>
            <input
              type="email"
              className="border-b-4 border-green-600 rounded-lg p-2 w-full bg-transparent focus:bg-transparent outline-none placeholder-slate-600"
              value={client.email}
              onChange={inputChange}
              name="email"
              aria-labelledby="email"
              placeholder="Enter your email"
            />
            {errors.email && <span className="text-red-500">{errors.email}</span>}

            <label className="font2 text-lg block mb-2 mt-7" id="pass">
              Contraseña:
            </label>
            <input
              type="password"
              autoComplete="on"
              className="border-b-4 border-green-600 rounded-lg p-2 w-full bg-transparent focus:bg-transparent outline-none placeholder-slate-600"
              value={client.password}
              onChange={inputChange}
              name="password"
              aria-labelledby="pass"
              placeholder="Enter your password"
            />
            {errors.password && <span className="text-red-500">{errors.password}</span>}
          </div>
        </div>
        <div className="font2 flex justify-center">
          <button
            onClick={handleSubmit}
            className="bg-green-600 text-white px-20 py-2 rounded-lg mt-[60px] hover:bg-green-500"
          >
            Enviar
          </button>
        </div>
        <span className="flex justify-center text-center mt-4 mb-4" >¿No tienes una cuenta? <p className="text-blue-500 underline hover:cursor-pointer" onClick={handleRegistrationClick}>Registrate aqui</p> </span>
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl bg-white p-6 mt-10 sm:order-last rounded-[20px]">
        <h1 className="col-span-full text-center text-[28px] font-bold font2">
        🧑‍🍳Te espera una gran variedad de platos🍲
        </h1>
        <p className="col-span-full text-center text-[19px] font-bold font2">¡¡Vamos inicia sesión!!</p>
        {dishes.map((image) => (
          <div key={image.idMenu} className="flex justify-center">
            <img
              src={image.imagen}
              alt="login1"
              className="w-[160px] h-[160px] rounded-full"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Login;


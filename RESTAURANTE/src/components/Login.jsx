import React, { useState, useEffect } from "react";
import axios from "axios";
import logo from "../assets/imagenes/logo.png";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [cliente, setCliente] = useState({
    correo: "",
    contraseña: "",
  });
  const navigate = useNavigate();
  const [platos, setPlatos] = useState([]);
  const [errores, setErrores] = useState({});
  const [clienteBd, setClienteBd] = useState([])

  const inputChange = (event) => {
    setCliente({
      ...cliente,
      [event.target.name]: event.target.value,
    });
  };

  const validateForm = () => {
    let nuevosErrores = {};

    // Validación del campo email
    if (!cliente.correo) {
      nuevosErrores.correo = "El email es obligatorio";
    } else if (!/\S+@\S+\.\S+/.test(cliente.correo)) {
      nuevosErrores.correo = "El email no es válido";
    }

    // Validación del campo password
    if (!cliente.contraseña) {
      nuevosErrores.contraseña = "La contraseña es obligatoria";
    } else if (cliente.contraseña.length < 6) {
      nuevosErrores.contraseña = "La contraseña debe tener al menos 6 caracteres";
    }else if(cliente.contraseña != clienteBd.contraseña){
      nuevosErrores.contraseña = "La contraseña es incorrecta";
    }

    return nuevosErrores;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevosErrores = validateForm();
    setErrores(nuevosErrores);

    try {
      if (Object.keys(nuevosErrores).length === 0) {
        axios.post("http://localhost:4000/restaurante/cliente", cliente).then(({ data }) => {
            sessionStorage.setItem("guest_session_id", "sdfsdf23423");
            setTimeout(() => {
              navigate("/productos", { state: { prop: cliente } });
              console.log(data);
            });
          })
          .catch(({ response }) => {
            e.preventDefault();
            console.log(response.data);
          });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    sessionStorage.removeItem("guest_session_id");
  }, []);

  useEffect(() => {
    const fetchImagenes = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/platos/${"fritos"}`
        );
        const data = await response.json();
        setPlatos(data);
      } catch (error) {
        console.error("Error al obtener el cliente:", error);
      }
    };

    fetchImagenes();
  }, []);

  useEffect(() => {
    const fetchCliente = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/cliente/correo/${cliente.correo}`
        );
        const data = await response.json();
        setClienteBd(data);
      } catch (error) {
        console.error("Error al obtener el cliente:", error);
      }
    };

    fetchCliente();
  }, [cliente.correo]);

  return (
    <section className="flex items-center justify-center min-h-screen bg-[url(./assets/imagenes/fondoregistro.jpg)] bg-cover bg-center w-full">
      <div className="mx-auto">
        <form className="mx-4 md:w-[450px] p-6 md:h-[600px] rounded-3xl bg-white">
          <div className="w-full">
            <h1 className="font2 text-center mb-5 text-3xl font-bold">
              Iniciar Sesión
            </h1>
            <div className="flex justify-center">
              <img src={logo} alt="logo" className="rounded-full w-32 mb-5" />
            </div>
          </div>

          <div className="flex justify-center">
            <div className="w-[310px]">
              <label className="font2 block  mb-2 text-lg" id="nom">
                Correo:
              </label>
              <input
                type="email"
                className="border-b-4 border-green-600 rounded-lg p-2 w-full bg-transparent focus:bg-transparent outline-none placeholder-slate-600"
                value={cliente.correo}
                onChange={inputChange}
                name="correo"
                aria-labelledby="correo"
                placeholder="Ingresa tu correo"
              />
              {errores.correo && <span className="text-red-500">{errores.correo}</span>}

              <label className="font2 text-lg block mb-2 mt-7" id="cont">
                Contraseña:
              </label>
              <input
                type="password"
                autoComplete="on"
                className="border-b-4 border-green-600 rounded-lg p-2 w-full bg-transparent focus:bg-transparent outline-none placeholder-slate-600"
                value={cliente.contraseña}
                onChange={inputChange}
                name="contraseña"
                aria-labelledby="cont"
                placeholder="Ingresa tu contraseña"
              />
              {errores.contraseña && <span className="text-red-500">{errores.contraseña}</span>}
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
        </form>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl mx-auto bg-white p-6 mt-10 order-first sm:order-last rounded-[20px]">
        <h1 className="col-span-full text-center text-2xl font-bold mb-4">
          🧑‍🍳Te espera una gran variedad de platos🍲
        </h1>
        {platos.map((imagen) => (
          <div key={imagen.idPlato} className="flex justify-center">
            <img
              src={imagen.imagen}
              alt="login1"
              className="w-40 h-40 rounded-full"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Login;

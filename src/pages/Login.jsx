import React, { useState, useEffect } from "react";
import axios from "axios";
import logo from "../assets/imagenes/logo.png";
import { useNavigate } from "react-router-dom";
import { useForm } from "../components/hooks/useForm";
import { useApiRequest } from "../components/hooks/useApiRequest";
import { validateForm } from "../components/helpers/validateForm";
import { useSelector, useDispatch } from "react-redux";
import { addUser } from "../redux/userSlice";



const Login = () => {

  const { user, handleChange } = useForm({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const { data: dishes } = useApiRequest(
    `http://localhost:4000/menus/${"friedmenu"}`
  );
  const { data: clientFromDb } = useApiRequest(
    `http://localhost:4000/email/${user.email}`
  );

  const handleRegistrationClick = () => navigate("/registration");

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(addUser(user))
    const newErrors = validateForm(user, clientFromDb);
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await axios.post(
          "http://localhost:4000/login",
          user
        );
        sessionStorage.setItem("guest_session_id", "sdfsdf23423");
        setTimeout(() => {
          navigate("/products");
          console.log(response.data);
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    sessionStorage.removeItem("guest_session_id");
  }, []);

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
              value={user.email}
              onChange={handleChange}
              name="email"
              aria-labelledby="email"
              placeholder="Enter your email"
            />
            {errors.email && (
              <span className="text-red-500">{errors.email}</span>
            )}

            <label className="font2 text-lg block mb-2 mt-7" id="pass">
              Contraseña:
            </label>
            <input
              type="password"
              autoComplete="on"
              className="border-b-4 border-green-600 rounded-lg p-2 w-full bg-transparent focus:bg-transparent outline-none placeholder-slate-600"
              value={user.password}
              onChange={handleChange}
              name="password"
              aria-labelledby="pass"
              placeholder="Enter your password"
            />
            {errors.password && (
              <span className="text-red-500">{errors.password}</span>
            )}
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
        <span className="flex justify-center text-center mt-4 mb-4">
          ¿No tienes una cuenta?{" "}
          <p
            className="text-blue-500 underline hover:cursor-pointer"
            onClick={handleRegistrationClick}
          >
            Registrate aqui
          </p>{" "}
        </span>
      </form>

      <div className="max-w-5xl mx-auto bg-white p-6 mt-2 rounded-[20px]">
      <h1 className="col-span-full text-center text-[28px] font-bold font2">
        🧑‍🍳Te espera una gran variedad de platos🍲
      </h1>
      <p className="col-span-full text-center text-[19px] font-bold font2 mb-4">
        ¡¡Vamos inicia sesión!!
      </p>
      <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 ${dishes && dishes.length === 1 ? 'mx-auto' : ''}`}>
        {dishes && dishes.length > 0 ? (
          dishes.map((dish) => (
            <img
              key={dish.idMenu}
              src={dish.imagen}
              alt="imagen.jpg"
              className="w-[190px] h-[190px] md:h-[180px] lg:h-[180px] rounded-full mx-auto"
            />
          ))
        ) : (
          <div>Cargando platos...</div>
        )}
      </div>
    </div>
    </section>
  );
};

export default Login;

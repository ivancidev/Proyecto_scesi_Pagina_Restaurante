import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const Comentarios = (props) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const { propCliente } = props;
  const [cliente, setCliente] = useState([]);
  const fechaHora = new Date().toLocaleDateString()+" "+new Date().getHours()+":"+new Date().getMinutes()+":"+new Date().getSeconds()
  const [comentarios, setComentarios] = useState("");
  const [comentariosBD, setComentariosBD] = useState([])

  const agregarComentario = (myCliente, fechaYHora, coment) => {
    const nuevoComentario = {
      avatar: myCliente.avatar,
      nombre: myCliente.nombre,
      fechaYhora: fechaHora,
      comentario: coment,
    };
    // Actualizar el estado agregando el nuevo comentario al arreglo existente
    setComentarios(nuevoComentario);
    onSubmit(nuevoComentario);
    console.log(comentarios);
  };

  const handleInputChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setComments([...comments, newComment]);
    agregarComentario(cliente, fechaHora, newComment);
    setNewComment("");
  };
  


  useEffect(() => {
    const fetchClient = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/cliente/correo/${propCliente.correo}`
        );
        const data = await response.json();
        setCliente(data);
      } catch (error) {
        console.error("Error al obtener el cliente:", error);
      }
    };

    fetchClient();
  }, [propCliente.correo]);

  useEffect(()=>{
    const fetchComentarios = async()=>{
        try {
            const response = await fetch('http://localhost:4000/comentarios')
            const data = await response.json()
            setComentariosBD(data)
        } catch (error) {
            console.error('Error al obtener los dientes:', error)
        }
    }
    fetchComentarios()
}, [])

  const onSubmit = (comen) => {
    axios
      .post("http://localhost:4000/restaurante/comentarios", comen)
      .then(({ data }) => {
        console.log(data);
        console.log("Se guardo el comentario");
      })
      .catch(({ response }) => {
        console.log(response.data);
      });
  };

  return (
    <header>
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Comentarios de las personas</h2>

        {comentariosBD.map((comment) => (
          <div className="bg-white rounded-lg shadow p-4 mb-4" key={comment.idComentario}>
            <div className="flex items-center">
              <img
                className="w-12 h-12 rounded-full mr-4"
                src={comment.avatar}
                alt="Avatar del usuario"
              />
              <div>
                <p className="font-bold text-black">{comment.nombre}</p>
                <p className="text-gray-500 text-sm">
                  {comment.fechaYhora}
                </p>
              </div>
            </div>
            <p className="text-gray-800 mt-2">{comment.comentario}</p>
          </div>
        ))}
        {comments.map((comment, index) => (
          <div className="bg-white rounded-lg shadow p-4 mb-4" key={index}>
            <div className="flex items-center">
              <img
                className="w-10 h-10 rounded-full mr-4"
                src={cliente.avatar}
                alt="Avatar del usuario"
              />
              <div>
                <p className="font-bold text-black">{cliente.nombre}</p>
                <p className="text-gray-500 text-sm">
                  {fechaHora}
                </p>
              </div>
            </div>
            <p className="text-gray-800 mt-2">{comment}</p>
          </div>
        ))}


        <form className="mt-4">
          <textarea
            value={newComment}
            onChange={handleInputChange}
            className="w-full p-4 rounded text-black" placeholder="Comentario"
          />
          <button
            type="submit"
            className="bg-[#d60e0e] text-white px-4 py-2 rounded mt-2"
            onClick={handleSubmit}
          >
            Comentar
          </button>
        </form>
      </div>
    </header>
  );
};

export default Comentarios;

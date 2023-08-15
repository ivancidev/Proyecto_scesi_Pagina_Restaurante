import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const Comments = (props) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [client, setClient] = useState([]);
  const dateHour = new Date().toLocaleDateString()+" "+new Date().getHours()+":"+new Date().getMinutes()+":"+new Date().getSeconds()
  const [newComments, setNewComments] = useState("");
  const [commentsBD, setCommmentsBD] = useState([])

  const user_global = JSON.parse(sessionStorage.getItem("user_logged"))
  


  const agregarComentario = (myCliente, fechaYHora, coment) => {
    const nuevoComentario = {
      avatar: myCliente.avatar,
      nombre: myCliente.nombre,
      fechaYhora: dateHour,
      comentario: coment,
    };
    // Actualizar el estado agregando el nuevo comentario al arreglo existente
    setNewComments(nuevoComentario);
    onSubmit(nuevoComentario);
  };

  const handleInputChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setComments([...comments, newComment]);
    agregarComentario(client, dateHour, newComment);
    setNewComment("");
  };
  


  useEffect(() => {
    const fetchClient = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/email/${user_global.email}`
        );
        const data = await response.json();
        setClient(data);
      } catch (error) {
        console.error("Error al obtener el cliente:", error);
      }
    };

    fetchClient();
  }, [user_global.email]);

  useEffect(()=>{
    const fetchComments = async()=>{
        try {
            const response = await fetch('http://localhost:4000/comments')
            const data = await response.json()
            setCommmentsBD(data)
        } catch (error) {
            console.error('Error al obtener los dientes:', error)
        }
    }
    fetchComments()
}, [])

  const onSubmit = (coment) => {
    axios
      .post("http://localhost:4000/addComments", coment)
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
        {commentsBD.map((comment) => (
          <div className="bg-white rounded-[15px] shadow p-4 mb-4" key={comment.idComentario}>
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
          <div className="bg-white shadow rounded-[15px] p-4 mb-4" key={index}>
            <div className="flex items-center">
              <img
                className="w-12 h-12 rounded-full mr-4"
                src={client.avatar}
                alt="Avatar del usuario"
              />
              <div>
                <p className="font-bold text-black">{client.nombre}</p>
                <p className="text-gray-500 text-sm">
                  {dateHour}
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
            className="w-full p-4 rounded-[15px] text-black" placeholder="Escribe tu comentario"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-[12px] mt-4 w-full"
            onClick={handleSubmit}
          >
            Comentar
          </button>
        </form>
      </div>
    </header>
  );
};

export default Comments;

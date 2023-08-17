import React from "react";
import useComments from "../hooks/useComments";

const Comments = () => {
  const {
    comments,
    commentsRedi,
    newComment,
    setNewComment,
    client,
    formattedDate,
    handleSubmit,
  } = useComments();

  return (
    <header>
      <div className="p-4">
        {commentsRedi != null ? (
          commentsRedi.map((comment) => (
            <div
              className="bg-white rounded-[15px] shadow p-4 mb-4"
              key={comment.idComentario}
            >
              <div className="flex items-center">
                <img
                  className="w-12 h-12 rounded-full mr-4"
                  src={comment.avatar}
                  alt="Avatar del usuario"
                />
                <div>
                  <p className="font-bold text-black">{comment.nombre}</p>
                  <p className="text-gray-500 text-sm">{comment.fechaYhora}</p>
                </div>
              </div>
              <p className="text-gray-800 mt-2">{comment.comentario}</p>
            </div>
          ))
        ) : (
          <div>Cargando..</div>
        )}
        {comments.map((comment, index) => (
          <div className="bg-white shadow rounded-[15px] p-4 mb-4" key={index}>
            <div className="flex items-center">
              <img
                className="w-12 h-12 rounded-full mr-4"
                src={client[0].avatar}
                alt="Avatar del usuario"
              />
              <div>
                <p className="font-bold text-black">{client[0].nombre}</p>
                <p className="text-gray-500 text-sm">{formattedDate}</p>
              </div>
            </div>
            <p className="text-gray-800 mt-2">{comment}</p>
          </div>
        ))}

        <form className="mt-4">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-full p-4 rounded-[15px] text-black"
            placeholder="Escribe tu comentario"
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

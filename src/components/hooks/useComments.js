import { useState, useEffect } from 'react';
import axios from 'axios';
import useApiRequest from './useApiRequest'; // Importa el hook useApiRequest

const useComments = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const user_global = JSON.parse(sessionStorage.getItem('user_logged'));
  const formattedDate = new Date().toLocaleString('es');
  const { data: commentsRedi } = useApiRequest(
    "http://localhost:4000/comments"
  );
  const { data: client } = useApiRequest(
    `http://localhost:4000/email/${user_global.email}`
  );

  const addComment = (user, comment) => {
    const newCommentObj = {
      avatar: user.avatar,
      nombre: user.nombre,
      fechaYhora: formattedDate,
      comentario: comment,
    };
    onSubmit(newCommentObj);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newComment.trim() !== '') {
      setComments([...comments, newComment]);
      addComment(client[0], newComment);
      setNewComment('');
    }
  };

  const onSubmit = (comment) => {
    axios
      .post('http://localhost:4000/addComments', comment)
      .then(({ data }) => {
        console.log(data);
        console.log('Se guardó el comentario');
      })
      .catch(({ response }) => {
        console.log(response.data);
      });
  };

  return {
    comments,
    commentsRedi,
    newComment,
    client,
    formattedDate,
    setNewComment,
    handleSubmit,
  };
};

export default useComments;

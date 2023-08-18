import { useState } from 'react';
import axios from 'axios';
import useApiRequest from './useApiRequest'; 
import { createNewPostComments, getPostComments, getPostEmail, getUserFromLocalStorage } from '../../api/posts';
const useComments = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const user_global = getUserFromLocalStorage()
  const formattedDate = new Date().toLocaleString('es');
  const { data: commentsRedi } = useApiRequest(getPostComments());
  const { data: client } = useApiRequest(getPostEmail(user_global.email));

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
      .post(createNewPostComments(), comment)
      .then(({ data }) => {
        console.log(data);
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

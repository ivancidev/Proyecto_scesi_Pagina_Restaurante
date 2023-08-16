import { useState } from 'react';
import axios from 'axios';

const useKeepBd = (userChange, navigate) => {

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/changeUser",
        userChange
      );
      console.log(response.data);
      navigate("/login");
    } catch (error) {
      console.error(error)
    } 
  };

  return {
    handleSubmit,
  };
};

export default useKeepBd;

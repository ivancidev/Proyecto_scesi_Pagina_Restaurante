import { useState } from "react";

export const useForm = (initialState = {}) => {
  const [user, setUser] = useState(initialState);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleImageClick = (imageName) => {
    setUser((prevUser) => ({
      ...prevUser,
      avatar: imageName,
    }));
  };
  
  return { user, handleImageClick, handleChange };
};
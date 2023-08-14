import { useState } from 'react';

export const useForm = (initialState = {}) => {
  const [formState, setFormState] = useState(initialState);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  return { formState, handleChange };
};


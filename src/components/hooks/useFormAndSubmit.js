// useFormAndSubmit.js
import { useEffect, useState } from 'react';
import validateForm from '../helpers/validateForm'
import axios from 'axios';
import validationRegister from '../helpers/validationRegister';

const useFormAndSubmit = (user, clientFromDb = {}, url) => {
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (navigateFunction) => {
    let newErrors = null
    if (Object.keys(clientFromDb).length > 0) {
        newErrors = validateForm(user, clientFromDb);
      } else {
        newErrors = validationRegister(user);
      }
  
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);

      try {
        await axios.post(url, user);
        sessionStorage.setItem("guest_session_id", "sdfsdf23423");
        sessionStorage.setItem("user_logged", JSON.stringify(user));
        setTimeout(() => {
          navigateFunction()
        });
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    sessionStorage.removeItem("guest_session_id");
  }, []);

  return {
    errors,
    isLoading,
    handleSubmit,
  };
};

export default useFormAndSubmit;

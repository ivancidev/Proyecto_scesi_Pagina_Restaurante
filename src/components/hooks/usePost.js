import axios from "axios";
import { useState } from "react";

const usePost = ( url, client, ) => {

    const [confirmation, setConfirmation] = useState(false)
    const [buy, setBuy] = useState(false)

    const handleSubmit = async () => {
        try {
          const response = await axios.post( url, client );
          console.log(response.data);
        } catch (error) {
          console.error(error)
        } 
      };
    
      return {
        confirmation, 
        setConfirmation,
        buy,
        setBuy,
        handleSubmit,
      };
}

export default usePost
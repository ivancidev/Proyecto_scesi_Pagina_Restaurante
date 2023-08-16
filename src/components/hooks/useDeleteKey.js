import axios from "axios";

const useDeleteKey = (url) => {

    const deleteKey = async () => {
        try {
          const response = await axios.delete(url);
          console.log(response.data.message);
        } catch (error) {
          console.log('Ocurrió un error al intentar eliminar la clave.');
        }
      };
  
    return {
      deleteKey,
    };
  };
  
  export default useDeleteKey;
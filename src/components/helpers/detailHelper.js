export const concatenarNombresPlatos = (products, setNombresOrden) => {
    const nombres = products.map((plato) => plato.nombreMenu).join(", ");
    setNombresOrden(nombres);
  };
  
  export const validarTarjeta = (cuartoCheck, tarjeta) => {
    let nuevosErrores = {};
  
    if (!cuartoCheck) {
      if (!tarjeta) {
        nuevosErrores.tarjeta = "El numero de la tarjeta es obligatorio";
      } else if (isNaN(tarjeta)) {
        nuevosErrores.tarjeta = "Debe ser numeros";
      } else if (tarjeta.length < 16) {
        nuevosErrores.tarjeta = "Debe tener 16 numeros";
      }
    }
  
    return nuevosErrores;
  };
  
  export const validarForm = (nombre, direccion, telefono, tarjeta) => {
    let nuevosErrores = {};
  
    if (!nombre) {
      nuevosErrores.nombre = "El nombre de usuario es obligatorio";
    }
  
    if (!direccion) {
      nuevosErrores.direccion = "La direccion es obligatoria";
    }
  
    if (!telefono) {
      nuevosErrores.telefono = "El telefono es obligatorio";
    } else if (isNaN(telefono) || telefono.length !== 8 || !/^[67]/.test(telefono)) {
      nuevosErrores.telefono = "El telefono es inválido";
    }
  
    if (!tarjeta) {
      nuevosErrores.tarjeta = "El numero de la tarjeta es obligatorio";
    } else if (isNaN(tarjeta) || tarjeta.length !== 16) {
      nuevosErrores.tarjeta = "La tarjeta es inválida";
    }
  
    return nuevosErrores;
  };
  
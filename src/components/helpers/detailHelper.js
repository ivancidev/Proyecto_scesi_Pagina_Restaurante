export const concatenateNamesDishes = (products, setOrderNames) => {
    const names = products.map((dish) => dish.nombreMenu).join(", ");
    setOrderNames(names);
  };
  
  export const validateCard = (fourthCheck, numberCard) => {
    let newErrors = {};
  
    if (!fourthCheck) {
      if (!numberCard) {
        newErrors.numberCard = "El numero de la tarjeta es obligatorio";
      } else if (isNaN(numberCard)) {
        newErrors.numberCard = "Debe ser numeros";
      } else if (numberCard.length < 16) {
        newErrors.numberCard = "Debe tener 16 numeros";
      }
    }
  
    return newErrors;
  };
  
  export const validateForm = (name, addres, phone, numberCard) => {
    let newErrors = {};
  
    if (!name) {
      newErrors.name = "El nombre de usuario es obligatorio";
    }
  
    if (!addres) {
      newErrors.addres = "La direccion es obligatoria";
    }
  
    if (!phone) {
      newErrors.phone = "El telefono es obligatorio";
    } else if (isNaN(phone) || phone.length !== 8 || !/^[67]/.test(phone)) {
      newErrors.phone = "El telefono es inválido";
    }
  
    if (!numberCard) {
      newErrors.numberCard = "El numero de la tarjeta es obligatorio";
    } else if (isNaN(numberCard)) {
      newErrors.numberCard = "Debe ser numeros";
    } else if (numberCard.length < 16) {
      newErrors.numberCard= "Debe tener 16 numeros";
    }
  
    return newErrors;
  };
  
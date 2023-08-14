export const validationRegister = (user) => {
  let newErrors = {};
  const exRegular = /^(?=.*[A-Z])(?=.*\d)[A-Z\d!@#$%^&*()_+=[\]{}|\\,.?: -]*$/i;

  //Validacion del nombre
  if (!user.name) {
    newErrors.name = "El nombre es obligatorio";
  } else if (user.name.length < 3) {
    newErrors.name = "El nombre al menos debe tener 3 caracteres";
  }
  // Validación del campo email
  if (!user.email) {
    newErrors.email = "El email es obligatorio";
  } else if (!/\S+@\S+\.\S+/.test(user.email)) {
    newErrors.email = "El email no es válido";
  }

  // Validación del campo password
  if (!user.password) {
    newErrors.password = "La contraseña es obligatoria";
  } else if (user.password.length < 6) {
    newErrors.password = "La contraseña debe tener al menos 6 caracteres";
  } else if (!exRegular.test(user.password)) {
    newErrors.password =
      "Contraseña debe tener al menos un numero, letra mayuscula o un caracter especial";
  }

  if (!user.phone) {
    newErrors.phone = "El telefono es obligatorio";
  } else if (isNaN(user.phone)) {
    newErrors.phone = "Debe ser numeros";
  } else if (user.phone.length < 8) {
    newErrors.phone = "Debe tener 8 numeros";
  } else if (!/^[67]/.test(user.phone)) {
    newErrors.phone = "Debe iniciar con con 6 o 7";
  }

  if (!user.avatar) {
    newErrors.avatar = "Selecciona un avatar";
  }

  return newErrors;
};

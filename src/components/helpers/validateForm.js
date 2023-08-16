
export const validateForm = (client, clientFromDb) => {
  let errors = {};

  if (!client.email) {
    errors.email = "El email es obligatorio";
  } else if (!/\S+@\S+\.\S+/.test(client.email)) {
    errors.email = "El email no es válido";
  }

  if (!client.password) {
    errors.password = "La contraseña es obligatoria";
  } else if (client.password !== clientFromDb[0].contraseña) {
    errors.password = "La contraseña no es valida";
  }

  return errors;
};

export default validateForm;


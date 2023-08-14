
export const validateForm = (client, clientFromDb) => {
  let errors = {};

  if (!client.email) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(client.email)) {
    errors.email = "Email is not valid";
  }

  if (!client.password) {
    errors.password = "Password is required";
  } else if (client.password !== clientFromDb.contraseña) {
    errors.password = "Incorrect password";
  }

  return errors;
};


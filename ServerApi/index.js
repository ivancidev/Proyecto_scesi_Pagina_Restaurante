const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const app = express();
app.use(cors());
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: "10mb" }));

const baseD = {
  host: "localhost",
  user: "root",
  password: "",
  database: "restaurante",
  port: "3307",
};

app.get("/", (req, res) => {
  res.send("hola desde tu primera ruta de la Api");
});

app.post("/restaurante/cliente", (req, res) => {
  const { correo, contraseña } = req.body;
  const values = [correo, contraseña];
  var connection = mysql.createConnection(baseD);
  connection.query(
    "SELECT * FROM cliente WHERE correo = ? AND contraseña = ?",
    values,
    (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        if (result.length > 0) {
          res.status(200).send("Usuario encontrado");
        } else {
          res.status(400).send("Cliente no existe");
        }
      }
    }
  );
  connection.end();
});

app.post("/cambioContraseña", (req, res) => {
  const { nombre, newNombre, contraseña, newContraseña } = req.body;
  const params = [newNombre, newContraseña, nombre];
  var connection = mysql.createConnection(baseD);
  connection.query(
    "UPDATE cliente SET nombre = ?, contraseña = ? WHERE nombre = ?",
    params,
    (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send("Usuario cambiado");
      }
    }
  );
  connection.end();
});

app.post("/restaurante/registro", (req, res) => {
  const { nombre, correo, contraseña, telefono, avatar } =
    req.body;
  const params = [
    [nombre, correo, contraseña, telefono, avatar],
  ];
  var connection = mysql.createConnection(baseD);
  connection.query(
    "INSERT INTO cliente (nombre, correo, contraseña, telefono, avatar) VALUES ?",
    [params],
    (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send("Usuario creado");
      }
    }
  );
  connection.end();
});

app.post("/restaurante/comentarios", (req, res) => {
  const { avatar, nombre, fechaYhora, comentario } = req.body;
  const params = [[avatar, nombre, fechaYhora, comentario]];
  var connection = mysql.createConnection(baseD);
  connection.query(
    "INSERT INTO comentario (avatar, nombre, fechaYhora, comentario) VALUES ?",
    [params],
    (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send("Comentario agregado");
      }
    }
  );
  connection.end();
});

app.post('/detalleCompra', (req, res) => {
  const { nombre, direccion, telefono, tarjeta } = req.body;
  const nombresPlatos = req.body.nombresPlatos; // Concatenar los nombres de los platos en una cadena
  const totalPrecio = req.body.totalPrecio;
  const fechaEntrega = req.body.fechaEntrega;
  const horaEnvio = req.body.horaEnvio;

  const detalleCompraData = {
    nombre,
    direccion,
    telefono,
    tarjeta,
    nombresPlatos,
    totalPrecio,
    fechaEntrega,
    horaEnvio,
  };
  const connection = mysql.createConnection(baseD);

  connection.query('INSERT INTO detalleCompra SET ?', detalleCompraData, (err, result) => {
    if (err) {
      console.error('Error al insertar los datos:', err);
      res.status(500).send('Error al insertar los datos');
    } else {
      console.log('Datos insertados correctamente:', result);
      res.status(200).send('Compra realizada con éxito');
    }
    connection.end(); // Cierra la conexión después de ejecutar la consulta
  });
});

app.post('/detalleCompraRestaurante', (req, res) => {
  const {nombre, telefono, tarjeta} = req.body
  const nombresPlatos = req.body.nombresPlatos
  const totalPrecio = req.body.totalPrecio
  const fechaCompra = req.body.fechaEntrega;
  const horaCompra = req.body.horaEnvio;
  const tiempoLlegada = req.body.valorCombox
  const numeroMesa = req.body.numeroMesa

  var detalleCompraData = {
    numeroMesa,
    tarjeta,
    nombresPlatos,
    tiempoLlegada,
    fechaCompra,
    horaCompra,
    telefono,
    nombre,
    totalPrecio
  }

  const connection = mysql.createConnection(baseD);

  connection.query('INSERT INTO detallecomprarestaurante SET ?', detalleCompraData, (err, result) => {
    if (err) {
      console.error('Error al insertar los datos:', err);
      res.status(500).send('Error al insertar los datos');
    } else {
      console.log('Datos insertados correctamente:', result);
      res.status(200).send('Compra realizada con éxito');
    }
    connection.end(); // Cierra la conexión después de ejecutar la consulta
  });


})

app.get("/comentarios", (req, res) => {
  var connection = mysql.createConnection(baseD);
  connection.query("SELECT * FROM comentario", (error, result) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.setHeader("Content-Type", "application/json"); // Configurar la cabecera de respuesta como JSON
      res.status(200).send(JSON.stringify(result)); // Convertir el resultado a JSON y enviarlo como respuesta
    }
  });
  connection.end();
});



//mostrar los platos
app.get("/platos", (req, res) => {
	var connection = mysql.createConnection(baseD)
	connection.query("SELECT * FROM plato", (error, result)=>{
		if (error) {
			res.status(500).send(error)
		}else{
			res.setHeader("Content-Type", "application/json"); 
      res.status(200).send(JSON.stringify(result)); 
		}
	})
})

app.get("/platos/:tipo", (req, res) => {
  const tipoPlato = req.params.tipo;
  var connection = mysql.createConnection(baseD);
  var consulta = ""
  
  // la función escape de mysql para evitar posibles ataques de inyección de SQL
  const tipoPlatoEscaped = connection.escape(`${tipoPlato}%`);
  if(tipoPlato == "fritos"){
    consulta = "SELECT * FROM plato WHERE nombrePlato NOT LIKE '%sopa%' AND nombrePlato NOT LIKE '%jugo%' AND nombrePlato NOT LIKE '%desayuno%' AND nombrePlato NOT LIKE '%postre%'"
  }else{
    consulta = "SELECT * FROM plato WHERE nombrePlato LIKE " + tipoPlatoEscaped
  }
  
  connection.query(consulta, (error, result) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.setHeader("Content-Type", "application/json"); 
      res.status(200).send(JSON.stringify(result));
    }
  });
});



//buscar por correo al cliente
  app.get('/cliente/correo/:correo', (req, res) => {
	const clientCorreo = req.params.correo;
	var connection = mysql.createConnection(baseD);
	connection.query('SELECT * FROM cliente WHERE correo = ?', clientCorreo, (error, result) => {
	  if (error) {
		res.status(500).send(error);
	  } else {
		if (result.length > 0) {
		  res.setHeader('Content-Type', 'application/json');
		  res.status(200).send(JSON.stringify(result[0])); // Devuelve el primer cliente encontrado
		} else {
		  res.status(404).send('Cliente no encontrado');
		}
	  }
	});
	connection.end();
  });





app.listen(4000, () => console.log("hola soy el servidor"));

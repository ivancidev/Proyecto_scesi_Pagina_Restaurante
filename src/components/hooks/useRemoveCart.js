import { useEffect } from "react";


const useRemoveCart = (products, idMenu ,setIdMenu, totalPrice, setTotalPrice, key) => {


    const removeOrder = (productoId) => {
        // Buscar el producto por su ID en el array
        const index = products.findIndex(
          (producto) => producto.idMenu === productoId
        );
    
        if (index !== -1) {
          // Obtener el producto actual y su cantidad
          const productoActual = products[index];
          const nuevaCantidad = productoActual.cantidad - 1;
          setTotalPrice(totalPrice - productoActual.precioMenu);
    
          // Actualizar la cantidad y el precio total del producto
          if (nuevaCantidad > 0) {
            const productsActualizados = [...products];
            productsActualizados[index] = {
              ...productoActual,
              cantidad: nuevaCantidad,
              precioTotal: nuevaCantidad * productoActual.precioMenu,
            };
            console.log(productsActualizados);
            sessionStorage.setItem(
              key,
              JSON.stringify(productsActualizados)
            );
          } else {
            // Si la cantidad llega a cero, eliminar el producto del array
            console.log("Productos " + products);
            const productsActualizados = products.filter(
              (producto) => producto.idMenu !== productoId
            );
            console.log("Productos actualizados " + productsActualizados);
            sessionStorage.setItem(
              key,
              JSON.stringify(productsActualizados)
            );
          }
        }
      };

      useEffect(() => {
        if (products != null) {
          removeOrder(idMenu);
          setIdMenu(0);
        }
      });
    


  return { products, idMenu,setIdMenu, totalPrice, setTotalPrice};
}

export default useRemoveCart
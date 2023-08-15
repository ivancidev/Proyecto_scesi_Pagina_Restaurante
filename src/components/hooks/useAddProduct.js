import { useState } from "react";

export const useAddProduct = (totalPrice, setTotalPrice) => {
  const products_storage = JSON.parse(sessionStorage.getItem("add_products"));

  const handlePrecio = (p) => {
    setTotalPrice(parseInt(totalPrice) + parseInt(p));
  };

  const addProduct = (dish) => {
    let products = [];

  if (products_storage === null) {
    // Si products es null, inicializar como un array vacío
    products = [];
  } else {
    products = [...products_storage];
  }
    // Buscar si el producto ya está en el array
    const index = products.findIndex(
      (product) => product.idMenu === dish.idMenu
    );

    if (index !== -1) {
      // Si el producto ya está en el array, actualizar su cantidad y precio total
      const productsActualizados = [...products];
      productsActualizados[index].cantidad += 1;
      productsActualizados[index].precioTotal =
        productsActualizados[index].cantidad *
        productsActualizados[index].precioMenu;
      handlePrecio(productsActualizados[index].precioMenu);
      sessionStorage.setItem("add_products", JSON.stringify(productsActualizados));
    } else {
      // Si el producto no está en el array, agregarlo con cantidad 1 y precio total
      const nuevoProducto = {
        ...dish,
        cantidad: 1,
        precioTotal: dish.precioMenu,
      };
      handlePrecio(dish.precioMenu);
      products.push(nuevoProducto)
      sessionStorage.setItem("add_products", JSON.stringify(products));
    }
  }

  return {
    addProduct,
  };
};

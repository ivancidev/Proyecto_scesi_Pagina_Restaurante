
export const useAddProduct = (totalPrice, setTotalPrice) => {
  const products_storage = JSON.parse(sessionStorage.getItem("add_products")) || [];

  const handlePrecio = (p) => {
    setTotalPrice(parseInt(totalPrice) + parseInt(p));
  };

  const updateProduct = (products, index, dish) => {
    const updatedProducts = [...products];
    updatedProducts[index].cantidad += 1;
    updatedProducts[index].precioTotal =
      updatedProducts[index].cantidad * updatedProducts[index].precioMenu;
    handlePrecio(updatedProducts[index].precioMenu);
    sessionStorage.setItem("add_products", JSON.stringify(updatedProducts));
  };

  const addProduct = (dish) => {
    let products = [...products_storage];
    const index = products.findIndex((product) => product.idMenu === dish.idMenu);

    if (index !== -1) {
      updateProduct(products, index, dish);
    } else {
      const nuevoProducto = {
        ...dish,
        cantidad: 1,
        precioTotal: dish.precioMenu,
      };
      handlePrecio(dish.precioMenu);
      products.push(nuevoProducto);
      sessionStorage.setItem("add_products", JSON.stringify(products));
    }
  };

  return {
    addProduct,
  };
};


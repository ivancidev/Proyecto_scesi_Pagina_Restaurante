import { useState } from 'react';

export const useProductState = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showOrder, setShowOrder] = useState(false);
  const [changeBackground, setChangeBackground] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [food, setFood] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [dishes, setDishes] = useState([]);
  const [dish, setDish] = useState("menuFried");
  const [window, setWindow] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
    setShowOrder(false);
  };

  const toggleOrders = () => {
    setShowOrder(!showOrder);
    setShowMenu(false);
  };

  return {
    showMenu,
    setShowMenu,
    showOrder,
    setShowOrder,
    changeBackground,
    setChangeBackground,
    modalOpen,
    setModalOpen,
    food,
    setFood,
    totalPrice,
    setTotalPrice,
    dishes,
    setDishes,
    dish,
    setDish,
    window,
    setWindow,
    toggleMenu,
    toggleOrders,
  };
};

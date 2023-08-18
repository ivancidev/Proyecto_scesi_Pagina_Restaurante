import React from "react";
import { useState } from "react";
import OptionButton from "../Purchase Options/OptionButton";
import { BsXCircleFill } from "react-icons/bs";
import useApiRequest from "../hooks/useApiRequest";
import DetailBuy from "../DetailsBuy/DetailBuy";
import { getPostEmail, getUserFromLocalStorage } from "../../api/posts";

const ViewBuy = ({ showButtons, setShowButtons, totalPrice }) => {
  const [selectionOption, setSelectionOption] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const user_global = getUserFromLocalStorage();
  const { data: client } = useApiRequest(getPostEmail(user_global.email));

  return (
    <header className="fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-75">
      <div className="absolute top-0 right-0 m-4">
        <BsXCircleFill
          onClick={() => setShowButtons(false)}
          className="text-3xl text-white hover:text-slate-300 cursor-pointer"
        />
      </div>
      <div className="container mx-auto px-4 z-50 transition-all">
        <div className="flex justify-center">
          {/*OpcionBoton */}
          <OptionButton
            openModal={openModal}
            setOpenModal={setOpenModal}
            showButtons={showButtons}
            setSelectionOption={setSelectionOption}
          />
          <div className={`${openModal ? "flex justify-center" : "hidden"}`}>
            <div className={`flex justify-center`}>
              {client !== null ? (
                <DetailBuy
                  selectionOption={selectionOption}
                  setOpenModal={setOpenModal}
                  client={client}
                  totalPrice={totalPrice}
                  setShowButtons={setShowButtons}
                />
              ) : (
                "Cargando"
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default ViewBuy;

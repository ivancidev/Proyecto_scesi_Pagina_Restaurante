import React from "react";
import { useState } from "react";
import OptionButton from "../Purchase Options/OptionButton";
import Details from "../Purchase Details/Details";
import {BsXCircleFill} from "react-icons/bs"

const ViewBuy = (props) => {
  const { showButtons, setShowButtons } = props;
  const [selectionOption, setSelectionOption] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const {client} = props
  const {totalPrice} = props

  return (
    <header className="fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-75">
        <div className="absolute top-0 right-0 m-4">
        <BsXCircleFill onClick={()=>setShowButtons(false)} className="text-3xl text-white hover:text-slate-300 cursor-pointer" />
      </div>
      <div className="container mx-auto px-4 z-50 transition-all">
        <div className="flex justify-center">
          {/*OpcionBoton */}
          <OptionButton
            openModal={openModal}
            setOpenModal = {setOpenModal}
            showButtons={showButtons}
            setSelectionOption = {setSelectionOption}
          />
          <div className={`${openModal ? "flex justify-center" : "hidden"}`}>
            <div
              className={`flex justify-center`}
            >
              <Details selectionOption = {selectionOption} setOpenModal={setOpenModal} client = {client} totalPrice={totalPrice} setShowButtons = {setShowButtons}/>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default ViewBuy;

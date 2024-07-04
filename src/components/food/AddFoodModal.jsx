import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import Modal from "react-modal";

export default function AddFoodModal({ handleAddFoodItem }) {
  const [name, setName] = useState("");
  const [serving, setServing] = useState("");
  const [protein, setProtein] = useState("");
  const [calories, setCalories] = useState("");
  const [sugar, setSugar] = useState("");

  Modal.setAppElement();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddFoodItem(name, serving, protein, calories, sugar);
    setName("");
    setServing("");
    setProtein("");
    setCalories("");
    setSugar("");
    setIsOpen(false);
  };

  Modal.setAppElement();
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "500px",
      height: "500px",
      backgroundColor: "#2e3039",
      zIndex: 1000,
    },
    overlay: {
      zIndex: 999, // Ensure the overlay is also above other components
    },
  };
  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <p>Add Food</p>
        <button onClick={openModal}>
          <h1
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <FaPlus />
          </h1>
        </button>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="modal-title">
          <h2 ref={(_subtitle) => (subtitle = _subtitle)}>
            Add new food to list
          </h2>
          <button onClick={closeModal}>close</button>
        </div>
        <br></br>
        <div style={{}}>
          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              textAlign: "left",
              gap: "10px",
            }}
          >
            {/* <img src="images/breakfast.svg" alt="Logo" style={{ width: }} /> */}
            <label htmlFor="name">Food name</label>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                textAlign: "left",
                gap: "10px",
              }}
            >
              <input
                style={{ padding: "0.5rem" }}
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <label>Serving size</label>
              <input
                style={{ padding: "0.5rem" }}
                type="number"
                id="serving"
                value={serving}
                onChange={(e) => setServing(e.target.value)}
              />

              <label>Protein amount</label>
              <input
                style={{ padding: "0.5rem" }}
                type="number"
                id="protein"
                value={protein}
                onChange={(e) => setProtein(e.target.value)}
              />

              <label>Calories</label>
              <input
                style={{ padding: "0.5rem" }}
                type="number"
                id="calories"
                value={calories}
                onChange={(e) => setCalories(e.target.value)}
              />

              <label>Sugar</label>
              <input
                style={{ padding: "0.5rem" }}
                type="number"
                id="sugar"
                value={sugar}
                onChange={(e) => setSugar(e.target.value)}
              />
            </div>
          </form>
          <br></br>
          <button
            style={{ padding: "0.5rem" }}
            type="submit"
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200"
          >
            Add Food
          </button>
        </div>
      </Modal>
    </div>
  );
}

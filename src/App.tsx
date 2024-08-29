import React, { useState } from "react";
import "./App.css";
import UserForm from "./components/UserForm";
import Modal from "./components/Modal";
import UserList from "./components/UserList";

function App() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const refreshUserList = () => {
    setRefreshTrigger((prevTrigger) => prevTrigger + 1);
  };

  return (
    <>
      <UserList refreshTrigger={refreshTrigger}>
        <button className="add-btn" onClick={openModal}>
          Add New User
        </button>
      </UserList>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <UserForm
          onSuccess={() => {
            closeModal();
            refreshUserList();
          }}
        />
      </Modal>
    </>
  );
}

export default App;

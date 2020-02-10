import React from "react";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";

function App() {
  const openToast = () => {
    toast("Iniciando projecto de e-commerce");
  };
  return (
    <div className="App">
      <button onClick={openToast}>click</button>

      <ToastContainer />
    </div>
  );
}

export default App;

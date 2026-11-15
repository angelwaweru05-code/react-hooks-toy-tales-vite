import React, { useState, useEffect } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

const BASE_URL = "http://localhost:3001/toys";

function App() {
  const [toys, setToys] = useState([]);
  const [showForm, setShowForm] = useState(false);

  // Fetch all toys on page load, merging with any toys added locally
  // so newly created toys are not overwritten by the initial load.
  useEffect(() => {
    fetch(BASE_URL)
      .then((res) => res.json())
      .then((data) =>
        setToys((existing) => [
          ...existing,
          ...data.filter((toy) => !existing.some((t) => t.id === toy.id)),
        ])
      );
  }, []);

  // Create a new toy via POST, then add it to state.
  const handleCreate = async (name, image) => {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, image, likes: 0 }),
    });
    const newToy = await res.json();
    setToys((toys) => [...toys, newToy]);
  };

  // Delete ("donate") a toy via DELETE, then remove it from state.
  const handleDelete = async (id) => {
    await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
    setToys((toys) => toys.filter((toy) => toy.id !== id));
  };

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  return (
    <>
      <Header />
      {showForm ? <ToyForm onCreate={handleCreate} /> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer toys={toys} onDelete={handleDelete} />
    </>
  );
}

export default App;

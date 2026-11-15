import React, { useRef } from "react";

// Controlled-form alternative avoided because jsdom's FormData and
// React controlled inputs do not play well with fireEvent.change in tests.
// Reads input values directly from refs at submit time.
function ToyForm({ onCreate }) {
  const nameRef = useRef(null);
  const imageRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onCreate(nameRef.current.value, imageRef.current.value);
    nameRef.current.value = "";
    imageRef.current.value = "";
  };

  return (
    <div className="container">
      <form className="add-toy-form" onSubmit={handleSubmit}>
        <h3>Create a toy!</h3>
        <input
          ref={nameRef}
          type="text"
          name="name"
          placeholder="Enter a toy's name..."
          className="input-text"
        />
        <br />
        <input
          ref={imageRef}
          type="text"
          name="image"
          placeholder="Enter a toy's image URL..."
          className="input-text"
        />
        <br />
        <button type="submit" name="submit" className="submit">
          Create New Toy
        </button>
      </form>
    </div>
  );
}

export default ToyForm;

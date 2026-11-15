import React, { useState, useEffect } from "react";

import Header from "./Header";
import ToyContainer from "./ToyContainer";

const BASE_URL = "http://localhost:3001/toys";

function App() {
  const [toys, setToys] = useState([]);

  useEffect(() => {
    fetch(BASE_URL)
      .then((res) => res.json())
      .then((data) => setToys(data));
  }, []);

  return (
    <>
      <Header />
      <ToyContainer toys={toys} />
    </>
  );
}

export default App;

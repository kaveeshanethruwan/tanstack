import { useState } from "react";
import "./App.css";
import Demo from "./Demo.jsx";

function App() {
  const [showDemo, setShowDemo] = useState(true);

  return (
    <>
      <button onClick={() => setShowDemo(!showDemo)}>Toggle Demo</button>
      {showDemo && <Demo />}
    </>
  );
}

export default App;

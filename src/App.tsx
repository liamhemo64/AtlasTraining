import { useState } from "react";
import "./App.css";
import Navbar from "./components/navbar/navbar";
import MainPage from "./components/mainPage";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Navbar />

      <MainPage />
    </>
  );
}

export default App;

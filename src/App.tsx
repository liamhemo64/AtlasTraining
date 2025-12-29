import { useState } from "react";
import "./App.css";
import MainPage from "./components/MainPage";
import AtlasAppBar from "./components/appBar/AtlasAppBar";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <AtlasAppBar />
      <MainPage />
    </>
  );
}

export default App;

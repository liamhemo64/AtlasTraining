import { useState } from "react";
import "./App.css";
import MainPage from "./components/MainPage";
import AtlasAppBar from "./components/appBar/AtlasAppBar";

function App() {
  return (
    <>
      <AtlasAppBar />
      <MainPage />
    </>
  );
}

export default App;

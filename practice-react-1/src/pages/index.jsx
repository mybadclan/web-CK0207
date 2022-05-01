import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Header } from "../components";

import { Register } from "./Register";
import { Game } from "./Game";

export function Pages() {
  // Single source of truth
  const [data, setData] = useState({
    teamOne: {
      playerOne: "",
      playerTwo: "",
      lastServe: "",
      currentlyServe: "playerTwo",
    },
    teamTwo: {
      playerOne: "",
      playerTwo: "",
      lastServe: "",
      currentlyServe: "",
    },
    gameInfo: {
      title: "",
      points: [
        // to do: clean this array
        {
          teamOne: 1,
          teamTwo: 1,
          isRunning: true,
        },
        {
          teamOne: 7,
          teamTwo: 6,
          isRunning: false,
        },
      ],
      teamServe: "",
    },
  });

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route index element={<Register data={data} setData={setData} />} />
        <Route path="game" element={<Game data={data} setData={setData} />} />
      </Routes>
    </BrowserRouter>
  );
}

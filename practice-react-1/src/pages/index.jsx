import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Header } from "../components";

import { Register } from "./Register";
import { Game } from "./Game";
import { REGULAR_MODE } from "../constants/game-modes";

export function Pages() {
  // Single source of truth
  const [data, setData] = useState({
    currentSet: 0,
    teamOne: {
      playerOne: "",
      playerTwo: "",
      lastServe: "",
      currentlyServe: "",
    },
    teamTwo: {
      playerOne: "",
      playerTwo: "",
      lastServe: "",
      currentlyServe: "",
    },
    gameInfo: {
      title: "",
      gameMode: REGULAR_MODE,
      bestOfThreeSets: true,
      lastSetIsSupertiebrake: false,
      sets: [
        // to do: clean this array
        {
          teamOne: 1,
          teamTwo: 1,
        },
        {
          teamOne: 7,
          teamTwo: 6,
        },
      ],
      score: {
        teamOne: 0,
        teamTwo: 0,
      },
      teamServe: "",
    },
  });

  useEffect(() => {
    setData({
      currentSet: 0,
      teamOne: {
        playerOne: "",
        playerTwo: "",
        lastServe: "",
        currentlyServe: "",
      },
      teamTwo: {
        playerOne: "",
        playerTwo: "",
        lastServe: "",
        currentlyServe: "",
      },
      gameInfo: {
        gameMode: REGULAR_MODE,
        title: "",
        bestOfThreeSets: true,
        lastSetIsSupertiebrake: false,
        sets: [
          // to do: clean this array
          {
            teamOne: 0,
            teamTwo: 0,
          },
        ],
        score: {
          teamOne: 0,
          teamTwo: 0,
        },
        teamServe: "",
      },
    });
  }, []);

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

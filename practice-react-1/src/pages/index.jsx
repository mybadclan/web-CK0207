import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Header } from "../components";

import { Register } from "./Register";
import { Game } from "./Game";
import { REGULAR_MODE } from "../constants/game-modes";

export function Pages() {
  // in case we need to restart the game, just reuse the first state the game was when it started
  const [initialGameState, setInitialGameState] = useState({})
  
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
      isOver: false,
      title: "",
      gameMode: REGULAR_MODE,
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

  useEffect(() => {
    setData({
      currentSet: 0,
      teamOne: {
        playerOne: "",
        playerTwo: "",
        lastServe: "",
        currentlyServe: "playerOne",
      },
      teamTwo: {
        playerOne: "",
        playerTwo: "",
        lastServe: "playerOne",
        currentlyServe: "",
      },
      gameInfo: {
        gameMode: REGULAR_MODE,
        isOver: false,
        title: "",
        bestOfThreeSets: true,
        lastSetIsSupertiebrake: true,
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
        <Route index element={<Register data={data} setData={setData} setInitialGameState={setInitialGameState} />} />
        <Route path="game" element={<Game data={data} setData={setData} initialGameState={initialGameState} />} />
      </Routes>
    </BrowserRouter>
  );
}

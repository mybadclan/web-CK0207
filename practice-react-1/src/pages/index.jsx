import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Header } from '../components';

import { Register } from './Register';
import { Game } from './Game';

export function Pages() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route index element={<Register />} />
        <Route path="game" element={<Game />} />
      </Routes>
    </BrowserRouter>
  )
}
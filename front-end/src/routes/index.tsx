import React from "react";
import { Route, Routes } from "react-router-dom"

import { SignIn } from '../pages/SignIn';
import { SignUp } from '../pages/SignUp';

export const Routers: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
};
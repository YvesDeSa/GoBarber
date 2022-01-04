import React from "react";
import { Routes, Route } from "react-router-dom"

import { PrivateRoute } from "./Route";

import { SignIn } from '../pages/SignIn';
import { SignUp } from '../pages/SignUp';
import { Dashboard } from '../pages/Dashboard';

export const Routers: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={
        <PrivateRoute redirectTo="dashboard">
          <SignIn />
        </PrivateRoute>} />

      <Route path="/signup" element={
        <PrivateRoute redirectTo="/">
          <SignUp />
        </PrivateRoute>} />

      <Route path="/dashboard" element={
        <PrivateRoute isPrivate={true} redirectTo="/">
          <Dashboard />
        </PrivateRoute>} />
    </Routes>
  );
};
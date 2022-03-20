import React from "react";
import { Routes, Route } from "react-router-dom"

import { PrivateRoute } from "./Route";

import { SignIn } from '../pages/SignIn';
import { SignUp } from '../pages/SignUp';
import { Dashboard } from '../pages/Dashboard';
import { ForgotPassword } from '../pages/ForgotPassword';

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

      <Route path="/forgot-password" element={
        <PrivateRoute redirectTo="/">
          <ForgotPassword />
        </PrivateRoute>} />

      <Route path="/dashboard" element={
        <PrivateRoute isPrivate={true} redirectTo="/">
          <Dashboard />
        </PrivateRoute>} />
    </Routes>
  );
};
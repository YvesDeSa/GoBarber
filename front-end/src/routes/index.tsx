import React from "react";
import { Routes, Route } from "react-router-dom"

import { PrivateRoute } from "./Route";

import { SignIn } from '../pages/SignIn';
import { SignUp } from '../pages/SignUp';
import { Dashboard } from '../pages/Dashboard';
import { ForgotPassword } from '../pages/ForgotPassword';
import { ResetPassword } from '../pages/ResetPassword';
import { Profile } from "../pages/Profile";

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

      <Route path="/reset-password" element={
        <PrivateRoute redirectTo="/">
          <ResetPassword />
        </PrivateRoute>} />

      <Route path="/dashboard" element={
        <PrivateRoute isPrivate={true} redirectTo="/">
          <Dashboard />
        </PrivateRoute>} />

      <Route path="/profile" element={
        <PrivateRoute isPrivate={true} redirectTo="/">
          <Profile />
        </PrivateRoute>} />
    </Routes>
  );
};
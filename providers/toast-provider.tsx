"use client";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

export const ToastProvider = () => {
  return (
    <ToastContainer
      autoClose={3000}
      icon={({ type }) =>
        type === "success" ? "🚀" : type === "error" ? "👾" : "📋"
      }
    />
  );
};

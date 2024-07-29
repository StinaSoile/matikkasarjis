export const apiBaseUrl =
  import.meta.env.VITE_BACKEND === "production"
    ? "https://matikkasarjis-backend.onrender.com/api"
    : "http://localhost:3000/api";

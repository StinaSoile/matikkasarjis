export const apiBaseUrl =
  process.env.NODE_ENV === "production"
    ? "https://matikkasarjis-backend.onrender.com/api"
    : "http://localhost:3000/api";

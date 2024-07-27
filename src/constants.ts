// export const apiBaseUrl = "http://localhost:3000/api";
// export const apiBaseUrl = "https://matikkasarjis-backend.onrender.com/api";
// export const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
export const apiBaseUrl =
  process.env.NODE_ENV === "production"
    ? "https://matikkasarjis-backend.onrender.com/api"
    : "http://localhost:3000/api";

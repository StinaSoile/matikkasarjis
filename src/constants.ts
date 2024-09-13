export const apiBaseUrl =
  import.meta.env.VITE_BACKEND === "production"
    ? "https://matikkasarjis-backend-production.up.railway.app/api"
    : "http://localhost:3000/api";

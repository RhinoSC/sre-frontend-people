// src/axios.ts
import axios from 'axios';

export const apiClient = axios.create({
  baseURL: `${import.meta.env.VITE_BE_URL}`, // Cambia esto a la URL de tu backend
  headers: {
    'Content-Type': 'application/json'
  },
});